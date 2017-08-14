// 当使用 React 创建组件时，首先会调用 instantiateReactComponent，这是初始化组件的入口函数，它通过判断 node 类型来区分不同组件的入口。
// 当 node 为空时，说明 node 不存在，则初始化空组件 ReactEmptyComponent.create(instantiateReactComponent)。
// 当 node 类型为对象时，即是 DOM 标签组件或自定义组件，那么如果 element 类型为字符串时，则初始化 DOM 标签组件 ReactNativeComponent.createInternalComponent(element)，否则初始化自定义组件 ReactCompositeComponentWrapper()。
// 当 node 类型为字符串或数字时，则初始化文本组件 ReactNativeComponent.createInstanceForText(node)。
// 如果是其他情况，则不作处理。
// path: src/renderers/shared/reconciler/instantiateReactComponent.js


require('jsdom-global')()
const React = require('../build/packages/react/react')
const ReactDOM = require('../build/packages/react-dom/ReactDOM')

document.body.innerHTML = '<div id="react-wrapper"></div>'

const ReactClass = React.createClass({
  render(){
    return React.createElement('div',  {}, this.props.children)
  }
})

ReactDOM.render(
  React.createElement(ReactClass,  {}, 'hello', 'world !'),
  document.getElementById('react-wrapper'))
console.log(document.body.innerHTML)