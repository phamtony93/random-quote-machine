import React, { useState } from 'react';
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
  return (
    <Container className="app">
      <Row>
        quote
        {quote.contents}
      </Row>
      <Row>
        <Button>Tweet</Button>
        <Button>Tumblr</Button>
        <Button onClick={changeQuote} >New Quote</Button>
      </Row>
    </Container>
  );
}

let changeQuote = () => {
  const END_POINT = 'https://quotesondesign.com/wp-json/wp/v2/posts/'
  const request = new Request(END_POINT)
  fetch(request)
    .then(response => response.json())
    .then(data =>  {
      console.log(data)
    })
}
// displayContents = () => {
//   if (hasQuote) {
//     return (
//       <div>

//       </div>
//     )
//   } else {
//     return (
      
//     )
//   }
// }

export default App;
