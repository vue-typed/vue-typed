import { Component, Prop } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('props decorator', () => {
	
	
	it ('it should be able to do simple binding', () => {
				
			
		@Component({
			template: '<div><div id="text">{{foo}}</div></div>'
		})
		class Foo {			
			
			@Prop()
			foo: string = 'meh'

		}

		const vm = new Vue({
      template: '<div><bar id="meh" foo="foo props is here"></bar></div>',
      components: {
        'bar': Foo
      }
    }).$mount()
		
		
		expect(vm['$el'].querySelector('#meh').textContent).to.contain('foo props is here');
		
	})
	
	
})