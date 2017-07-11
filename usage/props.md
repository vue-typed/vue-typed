# Prop

You can use `Prop` decorator to have [props](http://vuejs.org/guide/components.html#Props) in your class. 

```typescript
@Component()
class MyComp {

  // simple prop
  @Prop()
  message: string

  // prop with options (you can put all official Vue props options here)
  @Prop({
    default: 'meh',
    type: String
  })
  message2: any

  // prop with default value assigned from constructor
  @Prop()
  message3: string

  // prop with default value assigned inline
  @Prop()
  message4: string = 'yeah'

  // prop with options and default value assigned inline
  @Prop({				
    type: String
  })
  message5: any = 'foo'

  // prop with default value assigned both inline/constructor and in options
  // you should avoid this way - however default value assigned in options will be use.
  // if you do this, then you'll see warning in the console.  
  @Prop({				
    type: String,
    default: "I'm win"
  })
  message6: any = 'kick'

  constructor() {
    this.message3 = 'what'
  }

}
```