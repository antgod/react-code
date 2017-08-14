react源码调试库

- 引言
这是一个调试react的仓库。react源码使用gulp编译，模块引用类似于webpack alias（项目内js文件独立成包引用），源码不能直接运行。
这种调试方式不太友好，但是是笔者学习react源码的唯一调试方式。如果你们发现了更好的调试方式，请在issue中留下宝贵意见，谢谢。

- 编译src源码
```
npm run build
```

- 移动react-dom代码至build/packages目录下
```
cp ./node_modules/react-dom/lib ./build/packages/
```

- 在debug下编写代码调试

```
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
```

- 调试
```
npm i devtool -g
devtool ./debug/xxx.js
```

- Q&A
  - 为什么要使用es5+js而不是es6+jsx？
    后者的jsx在node运行中不识别，会报错
  - 为什么要引用jsdom？
    因为node中无法获得document等window上的对象
