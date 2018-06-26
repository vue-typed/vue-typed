import { PropOptions } from 'vue'
import { PROP_KEY } from './utils'

/**
 * Treat a class member as a Vue prop.
 *
 * @export
 * @param {PropOptions} [options]
 * @returns {PropertyDecorator}
 */
export function Prop(options?: PropOptions): PropertyDecorator {
  return function(target: Object, key: string) {
    if (!target[PROP_KEY]) {
      target[PROP_KEY] = {}
    }

    if (!target[PROP_KEY][key]) {
      target[PROP_KEY][key] = options || true
    }
  }
}
