import { expect } from 'chai'
import Vue from 'vue'
import { Component, Prop, Watch } from '../../../dist/index'
import { getDataOptionsValue } from '../utils'

describe('deprecating data extending test', () => {
  it('simple data', () => {
    @Component()
    class Base extends Vue {
      msg: string = 'hello'
    }

    @Component()
    class App extends Base {}

    const app = new App()
    expect(getDataOptionsValue(app))
      .to.have.property('msg')
      .that.equals('hello')
  })

  it('should not conflit with methods', () => {
    @Component()
    class Base extends Vue {
      data1: string = 'hi'

      msg() {
        // tslint:disable-next-line:no-console
        console.log('bar')
      }
    }

    @Component()
    class App extends Base {}

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
  })

  it('should not conflit with props', () => {
    @Component()
    class Base extends Vue {
      @Prop() msg: string = 'hello'

      @Prop() emptyProp: any

      data1: string = 'hi'
    }

    @Component()
    class App extends Base {}
    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
    expect(getDataOptionsValue(app)).to.not.have.property('emptyProp')
  })

  it('should not conflit with watch', () => {
    @Component()
    class Base extends Vue {
      @Prop() msg: string = 'hello'

      data1: string = 'hi'

      @Watch('data1')
      data_wacther() {
        // tslint:disable-next-line:no-console
        console.log('bar')
      }
    }

    @Component()
    class App extends Base {}

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
    expect(getDataOptionsValue(app)).to.not.have.property('data_wacther')
  })

  it('should not conflit with getter setter property', () => {
    @Component()
    class Base extends Vue {
      get msg() {
        return this.data1
      }

      set msg(val) {
        this.data1 = val
      }

      data1: string = 'hi'
    }

    @Component()
    class App extends Base {}

    const app = new App()

    expect(getDataOptionsValue(app))
      .to.have.property('data1')
      .that.equals('hi')
    expect(getDataOptionsValue(app)).to.not.have.property('msg')
  })
})
