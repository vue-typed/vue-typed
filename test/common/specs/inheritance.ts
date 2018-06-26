import { expect } from 'chai'
import { Component, Prop } from '../../../dist/index'

import { AbstractClass, AbstractComponent } from './abstract'

describe('inheritance', () => {
  it('Should be OK to inherit from other component', () => {
    @Component()
    class Base {
      baseData: string = 'hello'

      @Prop({
        default: 'hi'
      })
      baseProp: string

      // tslint:disable-next-line:no-empty
      method1() {}
    }

    @Component()
    class App extends Base {
      msg: any = undefined
    }

    const app = new App()

    expect(app['$options']['data']())
      .to.have.property('msg')
      .that.equals(undefined)
    expect(app['$options']['data']())
      .to.have.property('baseData')
      .that.equals('hello')
    expect(app['$options']['props'])
      .to.have.property('baseProp')
      .that.has.property('default')
      .that.equals('hi')
    expect(app['$options']['methods'])
      .to.have.property('method1')
      .that.is.a('function')
  })

  it('Should be OK to inherit from other abstract class', () => {
    @Component()
    class App extends AbstractClass {
      msg: any = undefined
    }

    const app = new App()
    expect(app['$options']['data']())
      .to.have.property('msg')
      .that.equals(undefined)
    expect(app['$options']['data']())
      .to.have.property('baseData')
      .that.equals('hello')
    expect(app['$options']['props'])
      .to.have.property('baseProp')
      .that.has.property('default')
      .that.equals('hi')
  })

  it('Should be OK to inherit from other abstract component', () => {
    @Component()
    class App extends AbstractComponent {
      msg: any = undefined
    }

    const app = new App()
    expect(app['$options']['data']())
      .to.have.property('msg')
      .that.equals(undefined)
    expect(app['$options']['data']())
      .to.have.property('baseData')
      .that.equals('hello')
    expect(app['$options']['props'])
      .to.have.property('baseProp')
      .that.has.property('default')
      .that.equals('hi')
  })
})
