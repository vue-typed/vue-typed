import { Component, Data } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('vue-typed decorators (ts)', () => {
	
	
	it ('data', () => {
		
				
		@Component({
			template: '<div id="foo"><div class="text">{{text}}</div></div>'
		})
		class Foo {
			
			@Data()
			text: string
			
			constructor() {
				this.text = 'foo'
			}
		}
		
		
		var vm = (new Foo())['$mount']();
		
		
		expect(vm['$el'].querySelector('.text').textContent).to.contain('foo');
		
		
	})
	
	
})