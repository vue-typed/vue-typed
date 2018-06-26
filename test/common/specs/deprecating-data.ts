import { Component, Prop, Watch } from '../../../dist/index'
import { expect } from 'chai'
import Vue from 'vue'
import { getDataOptionsValue } from '../utils';

describe('deprecating data test', () => {


	it('simple data', () => {

		@Component()
		class App extends Vue {
			msg: string = 'hello'
		}

		var app = new App();
		expect(getDataOptionsValue(app)).to.have.property('msg').that.equals('hello')

	})

	it('should not conflit with methods', () => {

		@Component()
		class App extends Vue {

			msg() {
				console.log('bar');
			}

			data1: string = 'hi'
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')

	})

	it('should not conflit with props', () => {

		@Component()
		class App extends Vue {

			@Prop()
			msg: string = 'hello'

			data1: string = 'hi'
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')

	})

	it('should not conflit with watch', () => {

		@Component()
		class App extends Vue {

			@Prop()
			msg: string = 'hello'

			data1: string = 'hi'

			@Watch('data1')
			data_wacther() {
				console.log('bar');
			}
		}

		var app = new App();

		expect(getDataOptionsValue(app)).to.have.property('data1').that.equals('hi')
		expect(getDataOptionsValue(app)).to.not.have.property('msg')
		expect(getDataOptionsValue(app)).to.not.have.property('data_wacther')

	})

});