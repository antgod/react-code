// ReactElementÊÇReactClassµÄÊµÀý
// path: src/isomorphic/classic/element/ReactElement.js

require('jsdom-global')()
const React = require('../build/packages/react/react')
const { Component } = React
const ReactDOM = require('../build/packages/react-dom/ReactDOM')

document.body.innerHTML = '<div id="react-wrapper"></div>'

ReactDOM.render(
  React.createElement('div', {}, 'Hello', 'world!'),
  document.getElementById('react-wrapper'))

console.log(document.body.innerHTML)