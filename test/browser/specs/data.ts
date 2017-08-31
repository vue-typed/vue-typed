import { Component } from '../../../dist/index'
import { expect } from 'chai'


describe('data decorator', () => {


	it('it should be able to do simple binding', () => {


		@Component({
			template: '<div id="foo"><div class="text">{{text}}</div></div>'
		})
		class Foo {

			text: string

			constructor() {
				this.text = 'foo'
			}
		}


		var vm = (new Foo())['$mount']();
		let node = vm['$el'].querySelector('.text')

		expect(node && node.textContent).to.contain('foo');


	})


})