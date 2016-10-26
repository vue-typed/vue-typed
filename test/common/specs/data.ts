import { Component, Data } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('vue-class-component data test', () => {


	it('simple data decorator', () => {

		@Component()
		class App {

			@Data()
			msg: string = undefined
		}

		var app = new App();
		expect(app['$options']['data']()).to.have.property('msg').that.equals(undefined)

	})

	it('data decorator with default value', () => {

		@Component()
		class App {

			@Data()
			msg: string = 'hello'
		}

		var app = new App();
		expect(app['$options']['data']()).to.have.property('msg').that.equals('hello')

	})

	it('data decorator with complex object', () => {

		@Component()
		class App {

			@Data()
			msg: {
				say: string,
				in: {
					the: string
				}
			} = {
				say: 'hello',
				in: {
					the: 'morning'
				}
			}
		}

		var app = new App();
		expect(app['$options']['data']()).to.have.property('msg').to.have.property('say').that.equals('hello')
		expect(app['$options']['data']()).to.have.property('msg').to.have.property('in').to.have.property('the').that.equals('morning')

	})

	it('avoid shared data when using @Data decorator', () => {

		@Component()
		class AppA {

			@Data()
			msg: string = 'hello'
		}

		var appA1 = new AppA();
		var appA2 = new AppA();

		expect(appA1['$options']['data'](), 'local data').to.not.equal(appA2['$options']['data']())


		var theData = {
			msg: 'hello'
		}
		@Component({
			data: function() {
				return theData
			}
		})
		class AppB {
		}

		var appB1 = new AppB();
		var appB2 = new AppB();


		expect(appB1['$options']['data'](), 'shared data').to.equal(appB2['$options']['data']())

	})
  

});