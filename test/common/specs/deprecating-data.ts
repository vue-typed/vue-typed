import { expect } from 'chai'
import Vue from 'vue'
import { Component, Prop, Watch } from '../../../dist/index'
import { getDataOptionsValue } from '../utils'

describe('deprecating data test', () => {
  it('simple data', () => {
    @Component()
    class App extends Vue {
      msg: string = 'hello'
    }

    const app = new App()
    expect(getDataOptionsValue(app))
      .to.have.property('msg')
      .that.equals('hello')
  })

  it('should not conflit with methods', () => {
    @Component()
    class App extends Vue {
      data1: string = 'hi'

      msg() {
        // tslint:disable-next-line:no-console
        console.log('bar')
      }
    }

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
  })

  it('should not conflit with props', () => {
    @Component()
    class App extends Vue {
      @Prop() msg: string = 'hello'

      data1: string = 'hi'
    }

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
  })

  it('should not conflit with watch', () => {
    @Component()
    class App extends Vue {
      @Prop() msg: string = 'hello'

      data1: string = 'hi'

      @Watch('data1')
      data_wacther() {
        // tslint:disable-next-line:no-console
        console.log('bar')
      }
    }

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
    expect(getDataOptionsValue(app)).to.not.have.property('data_wacther')
  })
})
