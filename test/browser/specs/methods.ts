import { Component, Data } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('methods', () => {
	
	
	it ('should be able to binding primitive method', (done) => {
		
				
		@Component({
			template: '<div><div id="text">{{text}}</div><button id="btn" v-on:click="greet">Greet</button></div>'
		})
		class Foo {
			
			@Data()
			text: string
			
			constructor() {
				this.text = 'foo'
			}

			greet() {
				this.text = 'hello foo!'
			}
		}
		
		
		var vm = (new Foo())['$mount']();
		
		
		// first state
		expect(vm['$el'].querySelector('#text').textContent).to.contain('foo');

		// click
		vm['$el'].querySelector('#btn').click();

		// after click
		Vue.nextTick(() => {									
			expect(vm['$el'].querySelector('#text').textContent).to.contain('hello foo!');
			done();
		});
		
	})
	
	
})