/**
 * Make normal class property to be data attribute.
 */


export function Data(): PropertyDecorator {

	return function (target: Object, key: string) {
		if (target['data'] && target['data'] instanceof Function) {
			throw "vue-typed error: [" + target.constructor.name + "]: You can't use @data attribute while you have already data() function in your class.";
		}

		var id = '$_vt_data';
		
		if (!target[id]) {
			target[id] = {}
		}

		if (!target[id][key]) {
			target[id][key] = key
		}
	}

}