
/**
 * Make normal class property to be props attribute.
 */

import { PropOption } from '../index.d.ts';

export function Prop(options?: PropOption): PropertyDecorator {

	return function (target: Object, key: string) {
		if (target['props'] && target['props'] instanceof Function) {
			throw "vue-typed error: [" + target.constructor.name + "]: You can't use @props attribute while you have already props() function in your class.";
		}

		if (!target['props']) {
			target['props'] = {}
		}

		if (!target['props'][key]) {			
			if (options) {
				target['props'][key] = options
			} else {
				target['props'][key] = true
			}
		}
	}

}