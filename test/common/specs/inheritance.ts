import { Component, Data, Prop } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'

import { AbstractClass, AbstractComponent } from './abstract';


describe('inheritance', () => {


	it('Should be OK to inherit from other component', () => {


		@Component()
		class Base {

			@Data()
			baseData: string = 'hello'

			@Prop({
				default: 'hi'
			})
			baseProp

			method1() {

			}
		}

		@Component()
		class App extends Base {

			@Data()
			msg: string = undefined
		}

		var app = new App();
				
		expect(app['$options']['data']()).to.have.property('msg').that.equals(undefined)
		expect(app['$options']['data']()).to.have.property('baseData').that.equals('hello')
		expect(app['$options']['props']).to.have.property('baseProp').that.has.property('default').that.equals('hi')
		expect(app['$options']['methods']).to.have.property('method1').that.is.a('function')

	})

	it('Should be OK to inherit from other abstract class', () => {

		@Component()
		class App extends AbstractClass {

			@Data()
			msg: string = undefined
		}

		var app = new App();
		expect(app['$options']['data']()).to.have.property('msg').that.equals(undefined)
		expect(app['$options']['data']()).to.have.property('baseData').that.equals('hello')
		expect(app['$options']['props']).to.have.property('baseProp').that.has.property('default').that.equals('hi')

	})

	it('Should be OK to inherit from other abstract component', () => {

		@Component()
		class App extends AbstractComponent {

			@Data()
			msg: string = undefined
		}

		var app = new App();
		expect(app['$options']['data']()).to.have.property('msg').that.equals(undefined)
		expect(app['$options']['data']()).to.have.property('baseData').that.equals('hello')
		expect(app['$options']['props']).to.have.property('baseProp').that.has.property('default').that.equals('hi')

	})


});