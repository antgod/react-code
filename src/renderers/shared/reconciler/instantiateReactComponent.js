/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule instantiateReactComponent
 */

'use strict';

var ReactCompositeComponent = require('ReactCompositeComponent');
var ReactEmptyComponent = require('ReactEmptyComponent');
var ReactNativeComponent = require('ReactNativeComponent');

var invariant = require('invariant');
var warning = require('warning');

// To avoid a cyclic dependency, we create the final class in this module
var ReactCompositeComponentWrapper = function(element) {
  this.construct(element);
};
Object.assign(
  ReactCompositeComponentWrapper.prototype,
  ReactCompositeComponent.Mixin,
  {
    _instantiateReactComponent: instantiateReactComponent,
  }
);

function getDeclarationErrorAddendum(owner) {
  if (owner) {
    var name = owner.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Check if the type reference is a known internal type. I.e. not a user
 * provided composite type.
 *
 * @param {function} type
 * @return {boolean} Returns true if this is a valid internal type.
 */
function isInternalComponentType(type) {
  return (
    typeof type === 'function' &&
    typeof type.prototype !== 'undefined' &&
    typeof type.prototype.mountComponent === 'function' &&
    typeof type.prototype.receiveComponent === 'function'
  );
}

/**
 * Given a ReactNode, create an instance that will actually be mounted.
 *
 * @param {ReactNode} node
 * @return {object} A new instance of the element's constructor.
 * @protected
 */
function instantiateReactComponent(node, parentCompositeType) {
  var instance;

  // �������ReactEmptyComponent��
  if (node === null || node === false) {
    instance = ReactEmptyComponent.create(instantiateReactComponent);
  }

  if (typeof node === 'object') {
    var element = node;
    if (typeof element.type === 'string') {
      // DOM��ǩ��ReactDOMComponent��
      instance = ReactNativeComponent.createInternalComponent(element);
    } else if (isInternalComponentType(element.type)) {
      // �����ַ�����ʾ���Զ���������޷�ʹ�ã��˴������������ʼ������
      instance = new element.type(element);
    } else {
      // �Զ��������ReactCompositeComponent��
      instance = new ReactCompositeComponentWrapper();
    }
  } else if (typeof node === 'string' || typeof node === 'number') {
    // �ַ��������֣�ReactTextComponent��
    instance = ReactNativeComponent.createInstanceForText(node);
  } else {
    // ��������
  }

  // ����ʵ��
  instance.construct(node);
  // ��ʼ������
  instance._mountIndex = 0;
  instance._mountImage = null;

  return instance;
}
module.exports = instantiateReactComponent;
