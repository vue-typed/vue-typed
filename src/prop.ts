
/**
 * Make normal class property to be props attribute.
 */

import { PropOptions } from 'vue/types/options';

export function Prop(options?: PropOptions): PropertyDecorator {

	return function (target: Object, key: string) {

		var id = '$_vt_props'

		if (!target[id]) {
			target[id] = {}
		}

		if (!target[id][key]) {			
			if (options) {
				target[id][key] = options
			} else {
				target[id][key] = true
			}
		}
	}

}