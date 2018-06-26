import { expect } from 'chai'
import { Component } from '../../../dist/index'

describe('vue-class-component data test', () => {
  it('simple data decorator', () => {
    @Component()
    class App {
      msg: any = undefined
    }

    const app = new App()
    expect(app['$options']['data']())
      .to.have.property('msg')
      .that.equals(undefined)
  })

  it('data decorator with default value', () => {
    @Component()
    class App {
      msg: string = 'hello'
    }

    const app = new App()
    expect(app['$options']['data']())
      .to.have.property('msg')
      .that.equals('hello')
  })

  it('data decorator with complex object', () => {
    @Component()
    class App {
      msg: {
        say: string
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

    const app = new App()
    expect(app['$options']['data']())
      .to.have.property('msg')
      .to.have.property('say')
      .that.equals('hello')
    expect(app['$options']['data']())
      .to.have.property('msg')
      .to.have.property('in')
      .to.have.property('the')
      .that.equals('morning')
  })

  it('avoid shared data when using @Data decorator', () => {
    @Component()
    class AppA {
      msg: string = 'hello'
    }

    const appA1 = new AppA()
    const appA2 = new AppA()

    expect(appA1['$options']['data'](), 'local data').to.not.equal(
      appA2['$options']['data']()
    )

    const theData = {
      msg: 'hello'
    }
    @Component({
      data() {
        return theData
      }
    })
    class AppB {}

    const appB1 = new AppB()
    const appB2 = new AppB()

    expect(appB1['$options']['data'](), 'shared data').to.equal(
      appB2['$options']['data']()
    )
  })
})
