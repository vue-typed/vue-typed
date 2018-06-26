import { expect } from 'chai'
import { Component, Prop } from '../../../dist/index'

describe('props extending tests', () => {
  it('should be able to declare props in options while using @Prop()', () => {
    @Component({
      props: {
        message: {
          type: String
        }
      }
    })
    class App {
      @Prop({ type: Number })
      age: number
    }

    const app = new App()

    expect(app['$options']['props'], 'declared prop in options should be there')
      .to.have.property('message')
      .to.have.property('type')
      .that.equals(String)
    expect(app['$options']['props'], 'declared prop by @Prop() should be there')
      .to.have.property('age')
      .to.have.property('type')
      .that.equals(Number)
  })
})
