### react源码调试仓库

#### 引言

这是一个调试react的仓库。react源码使用gulp编译，模块引用类似于webpack alias（项目内js文件独立成包引用），源码不能直接运行。
这种调试方式不太友好，但是是笔者学习react源码的唯一调试方式。如果你们发现了更好的调试方式，请在issue中留下宝贵意见，谢谢。

#### 准备工作
- 编译src源码
```
npm run build
```

- 移动react-dom代码至build/packages目录下

编译的代码中只有react源码而没有react-dom源码（请仔细阅读两个react-dom，一个是个当前文件的引用。一个是空对象）。
```
cp ./node_modules/react-dom/lib ./build/packages/
```

#### 调试
- 在debug目录下编写调试文件：instantiateReactComponent.js

```
// 当使用 React 创建组件时，首先会调用 instantiateReactComponent。
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
devtool ./debug/instantiateReactComponent.js
```

#### Q&A
  - 为什么要使用es5+js而不是es6+jsx？

    后者的jsx在node运行中不识别，会报错
  - 为什么要引用jsdom？

    因为node中无法获得document等window上的对象
