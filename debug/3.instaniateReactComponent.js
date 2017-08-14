// ��ʹ�� React �������ʱ�����Ȼ���� instantiateReactComponent�����ǳ�ʼ���������ں�������ͨ���ж� node ���������ֲ�ͬ�������ڡ�
// �� node Ϊ��ʱ��˵�� node �����ڣ����ʼ������� ReactEmptyComponent.create(instantiateReactComponent)��
// �� node ����Ϊ����ʱ������ DOM ��ǩ������Զ����������ô��� element ����Ϊ�ַ���ʱ�����ʼ�� DOM ��ǩ��� ReactNativeComponent.createInternalComponent(element)�������ʼ���Զ������ ReactCompositeComponentWrapper()��
// �� node ����Ϊ�ַ���������ʱ�����ʼ���ı���� ReactNativeComponent.createInstanceForText(node)��
// ����������������������
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