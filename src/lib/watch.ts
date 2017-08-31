
/**
 * Treat a function as a Vue watcher.
 * 
 * @export
 * @param {string} property 
 * @param {boolean} [deep] 
 * @returns {MethodDecorator} 
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