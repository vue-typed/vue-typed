# Single Mixin

For single mixin you can use `Mixin` function to extends your component:

```typescript
class MainClass extends Mixin(ComponentOrOptionsYouWantToMixIn)
```

`ComponentOrOptionsYouWantToMixIn` is a class that you have to decorate it either with [`@Component`](../component.md) or [`@Options`](../options.md) decorator.

### Example:

```typescript
import { Component, Options, Mixin } from 'vue-typed'

@Options()
class MyMixin  {
  mymix() {
    console.log('my mix method called');		
  }
}

@Component({
  template: require('./container.html'),
})
export class Container extends Mixin(MyMixin) {
  created() {
    this.mymix()
  }
}
```

is equivalent to

```javascript
var MyMixin = Vue.extend({
  mixins: [{
    methods: {
      mymix: function () {
        console.log('my mix method called');
      }
    }
  }]
})

export var Container = MyMixin.extend({
  template: require('./container.html'),
  created: function () {
    this.mymix()
  }
})

```
