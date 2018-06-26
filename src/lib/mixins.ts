import Vue, { ComponentOptions } from 'vue'
import { VirtualClass } from './common'

/**
 * Single mixin.
 *
 * @export
 * @template T
 * @param {{ new () : T; }} component
 * @returns {VirtualClass<T>}
 */
export function Mixin<T>(
  component: { new (): T } | ComponentOptions<Vue> | typeof Vue
): VirtualClass<T> {
  return Vue.extend({
    mixins: [component as ComponentOptions<Vue> | typeof Vue]
  }) as any
}

/**
 * Multiple mixins.
 *
 * @export
 * @template T
 * @param {...{ new () : any; }[]} components
 * @returns {VirtualClass<T>}
 */
export function Mixins<T>(
  ...components: Array<{ new (): any } | ComponentOptions<Vue> | typeof Vue>
): VirtualClass<T> {
  return Vue.extend({
    mixins: components as Array<ComponentOptions<Vue> | typeof Vue>
  }) as any
}
