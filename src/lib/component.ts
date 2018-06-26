import Vue, { ComponentOptions } from 'vue'
import { BuildOptions } from './utils';

/**
 * Build Vue component.
 * 
 * @export
 * @param {ComponentOptions<Vue>} [options] 
 * @returns {ClassDecorator} 
 */
export function Component(options?: ComponentOptions<Vue>): ClassDecorator {

  var factory = function (Component: Function, options?: any): <Function>(target: any) => Function | void {
    // Build vue component
    var superProto = Object.getPrototypeOf(Component.prototype)
    var Super = superProto instanceof Vue
      ? superProto.constructor
      : Vue
    return Super['extend'](BuildOptions(Component, options))

  }

  if (options instanceof Function) {
    return factory(<Function>options)
  }

  return function (Component) {
    return factory(Component, options) as any
  }

}