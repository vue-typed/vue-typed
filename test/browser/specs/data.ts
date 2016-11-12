import { Component } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('data decorator', () => {
	
	
	it ('it should be able to do simple binding', () => {
		
				
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
		
		
		expect(vm['$el'].querySelector('.text').textContent).to.contain('foo');
		
		
	})
	
	
})