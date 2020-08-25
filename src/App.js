import React, { useState, useEffect } from 'react';
import './App.scss';
// import Button from 'react-bulma-components/lib/components/button';
// import Columns from 'react-bulma-components/lib/components/columns';
// // import Column from 'react-bulma-components/lib/components/';
// import Container from 'react-bulma-components/lib/components/container'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ExternalButton() {
  return (
    <Button className="is-primary">Go</Button>
  )
}

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
      <Row>
        {displayContents(hasQuote, quote)}
      </Row>
      <Row>
        <Button>Tweet</Button>
        <Button>Tumblr</Button>
        <Button onClick={getQuote} >New Quote</Button>
      </Row>
    </Container>
  );
}

const removeHtmlFromString = (string) => {
  return string.replace(/(<([^>]+)>)/ig, '')
}

const displayContents = (hasQuote, quote) => {
  if (hasQuote) {
    return (
      <div>
        {quote.contents}
        {quote.title}
      </div>
    )
  } else {
    return (
      <div>
        Please generate a new quote
      </div>
    )
  }
}

export default App;
