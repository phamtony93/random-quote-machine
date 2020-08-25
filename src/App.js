import React, { useState, useEffect } from 'react';
import './App.scss';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {
  let [hasQuote, setHasQuote] = useState(false)
  let [quote, setQuote] = useState({
    contents: 'test',
    title: 'test',
    link: ''
  })
  let [randomIndex, setRandomIndex] = useState(null)

  const getNonRepeatingRandomIndex = (length) => {
    let newIndex = Math.floor(Math.random() * length)
    while (newIndex === randomIndex) {
      newIndex = Math.floor(Math.random() * length)
    }
    return newIndex
  }

  const getQuote = () => {
    const END_POINT = 'https://quotesondesign.com/wp-json/wp/v2/posts/'
    const request = new Request(END_POINT)
    fetch(request)
      .then(response => response.json())
      .then(data =>  {
        let random = getNonRepeatingRandomIndex(data.length)
        let quoteData = data[random]
        let newQuote = quote
        newQuote.contents = removeHtmlFromString(quoteData.content.rendered)
        newQuote.title = quoteData.title.rendered
        newQuote.link = quoteData.link
        setRandomIndex(random)
        setQuote(newQuote)
        setHasQuote(true)
      })    
  }

  return (
    <Container id="app">
      <div id="quote-machine">
        <Col className="align-self-center">
          <Row className="justify-content-center">
              {displayContents(hasQuote, quote)}   
          </Row>
          <Row className="justify-content-center">
            <Button className="btn-secondary" onClick={() => postTweet(quote.contents, quote.title)}>Tweet</Button>
            <Button className="btn-secondary" onClick={() => postTumblr(quote.contents, quote.title)}>Tumblr</Button>
            <Button onClick={getQuote} className="btn-secondary">New Quote</Button>
          </Row>
        </Col>
      </div>

    </Container>
  );  
}
const postTweet = (quote, author) => {
  window.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent('"' + quote + '" ' + author));
}

const postTumblr = (quote, author) => {
  window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption='+encodeURIComponent(author)+'&content=' 
    + encodeURIComponent(quote)+'&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button');
}

const removeHtmlFromString = (string) => {
  return string.replace(/(<([^>]+)>)/ig, '')
}

const displayContents = (hasQuote, quote) => {
  if (hasQuote) {
    return (
      <div className="contents">
        "{quote.contents}
        <div id="author">
          {quote.title}
        </div>
      </div>

    )
  } else {
    return (
      <div className="contents">
        Please generate a new quote
      </div>
    )
  }
}

export default App;
