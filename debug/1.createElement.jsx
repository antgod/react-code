// ReactElementÊÇReactClassµÄÊµÀý
// path: src/isomorphic/classic/element/ReactElement.js

require('jsdom-global')()
const React = require('../packages/react/react')
const ReactDOM = require('react-dom')

document.body.innerHTML = '<div id="react-wrapper"></div>'

ReactDOM.render(
  React.createElement('div', {}, 'Hello', 'world!'),
  document.getElementById('react-wrapper'))

console.log(document.body.innerHTML)