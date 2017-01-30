
/**
 * Make a function to be a watch observer.
 */

export function Watch(property: string, deep?:boolean): MethodDecorator {

	return function (target: Object, key: string) {
		
		if (typeof target['watch'] !== 'object') {
			target['watch'] = {};
		}
		
		if (!target['watch'][property]) {

			var watcher : any
			if (deep !== undefined) {
				watcher = {
					handler: target[key],
					deep: deep
				}
			} else {
				watcher = target[key]
			}

			target['watch'][property] = watcher;
		}

	}
}