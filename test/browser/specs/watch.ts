import { Component, Data, Prop, Watch } from '../../../index';
import { expect } from 'chai';
import * as Vue from 'vue';


describe('watch decorator', () => {


	it('it should be able to observe data changes', (done) => {


		@Component({
			template: `
				<div>
					<div>{{data1}}</div>
					<div>{{data2}}</div>
					<div id="result">{{info}}</div>
					
					<button id="btn1" v-on:click='changeData1'>Change Data</button>
					<button id="btn2" v-on:click='changeData2'>Change Prop</button>
				</div>
				`
		})
		class Watcher {
			@Data()
			data1: string = 'Hello!';

			@Data()
			data2: number = 1;

			@Data()
			info: string;

			changeData1() {
				this.data1 = 'Hola!';
			}

			changeData2() {
				this.data2 += 1;
			}

			@Watch('data1')
			spyData(newValue: string, oldValue: string) {
				this.info = oldValue + ' -> ' + newValue;
			}

			@Watch('data2')
			spyProp(newValue: number, oldValue: number) {
				this.info = oldValue + ' -> ' + newValue;
			}
		}
		
		var vm = (new Watcher())['$mount']();
		
		
		vm['$el'].querySelector('#btn1').click();
		Vue.nextTick(()=>{
			expect(vm['$el'].querySelector('#result').textContent, 'observe data 1').to.contain('Hello! -> Hola!');

			vm['$el'].querySelector('#btn2').click();
			Vue.nextTick(() => {
				expect(vm['$el'].querySelector('#result').textContent, 'observe data 2').to.contain('1 -> 2');

				done();
			});


		});

	});


});