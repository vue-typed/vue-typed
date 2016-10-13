import { Component, Data } from '../../../index'
import { expect } from 'chai'
import * as Vue from 'vue'


describe('v-on', () => {


	it('should be able using v-on on custom events', (done) => {


		@Component({
			template: '<button v-on:click="increment">{{ counter }}</button>'
		})
		class ButtonCounter extends Vue {

			@Data()
			counter: number = 0

			increment() {
				this.counter += 1
				this.$emit('increment')
			}

		}


		@Component({
			template: `
			<div id="counter-event-example">
				<p id="total">{{ total }}</p>
				<button-counter id="btn-1" v-on:increment="incrementTotal"></button-counter>
				<button-counter id="btn-2" v-on:increment="incrementTotal"></button-counter>
			</div>
			`,
      components: {
        'button-counter': ButtonCounter
      }
		})
		class App {

			@Data()
			total: number = 0

			incrementTotal() {
				this.total += 1
			}
		}

		const vm = new App()['$mount']();

		expect(vm['$el'].querySelector('#total').textContent, "1st state #total").to.contain('0');
		expect(vm['$el'].querySelector('#btn-1').textContent, "1st state #btn-1").to.contain('0');
		expect(vm['$el'].querySelector('#btn-2').textContent, "1st state #btn-2").to.contain('0');

		vm['$el'].querySelector('#btn-1').click();

		Vue.nextTick(() => {
			expect(vm['$el'].querySelector('#total').textContent, "2nd state #total").to.contain('1');
			expect(vm['$el'].querySelector('#btn-1').textContent, "2nd state #btn-1").to.contain('1');
			expect(vm['$el'].querySelector('#btn-2').textContent, "2nd state #btn-2").to.contain('0');

			vm['$el'].querySelector('#btn-2').click();

			Vue.nextTick(() => {
				expect(vm['$el'].querySelector('#total').textContent, "3rd state #total").to.contain('2');
				expect(vm['$el'].querySelector('#btn-1').textContent, "3rd state #btn-1").to.contain('1');
				expect(vm['$el'].querySelector('#btn-2').textContent, "3rd state #btn-2").to.contain('1');

				done();
			});

		});




	})


})