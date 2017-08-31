import { PropOptions } from 'vue/types/options';
import { PROP_KEY } from "./utils";

/**
 * Treat a class member as a Vue prop.
 * 
 * @export
 * @param {PropOptions} [options] 
 * @returns {PropertyDecorator} 
 */
export function Prop(options?: PropOptions): PropertyDecorator {

	return function (target: Object, key: string) {

		if (!target[PROP_KEY]) {
			target[PROP_KEY] = {}
		}

		if (!target[PROP_KEY][key]) {			
			if (options) {
				target[PROP_KEY][key] = options
			} else {
				target[PROP_KEY][key] = true
			}
		}
	}

}