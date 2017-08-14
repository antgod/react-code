// ReactClass: react类，不用多解释了吧
// path: src/isomorphic/classic/element/ReactClass.js

require('jsdom-global')()
const React = require('../build/packages/react/react')
const { Component } = React
const ReactDOM = require('../build/packages/react-dom/ReactDOM')

document.body.innerHTML = '<div id="react-wrapper"></div>'

const ReactClass = React.createClass({
  render(){
    return React.createElement('div',  {}, this.props.children)
  }
})

ReactDOM.render(
  React.createElement(ReactClass,  {}, 'Hello', 'world'),
  document.getElementById('react-wrapper'))
console.log(document.body.innerHTML)