import Vue, { ComponentOptions } from 'vue'
import { BuildOptions } from './utils'

/**
 * Build Vue simple raw options object.
 * Inheritance is not supported, unless virtual inheritance.
 *
 * @export
 * @param {ComponentOptions<Vue>} [options]
 * @returns {ClassDecorator}
 */
export function Options(options?: ComponentOptions<Vue>): ClassDecorator {
  return function(Component: any) {
    function chainUp(component: any) {
      const Super = Object.getPrototypeOf(component)

      if (Super instanceof Object && Super.prototype) {
        const keys = Object.getOwnPropertyNames(Super.prototype)
        for (const key of keys) {
          const descriptor = Object.getOwnPropertyDescriptor(
            Super.prototype,
            key
          ) as PropertyDecorator
          if (!Component.prototype.hasOwnProperty(key)) {
            Object.defineProperty(Component.prototype, key, descriptor)
          }
        }
        chainUp(Super)
      }
    }

    // normalize object
    chainUp(Component)

    return BuildOptions(Component, options) as any
  }
}
