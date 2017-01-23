# Global Mixin

To have a global mixin just simply decorate your class with `@GlobalMixin` decorator.

### Example

```typescript
import { GlobalMixin } from 'vue-typed'

@GlobalMixin()
class Global {
  created() {
    console.log('created method called from global mixin');		
  }
  globalMethod() {
    console.log('global method called');		
  }
}
```

is equivalent to 

```javascript
Vue.mixin({
  created: function() {
    console.log('created method called from global mixin');		
  },
  methods: {
    globalMethod: function() {
      console.log('global method called');		
    }
  }
})
```


## Invoke global method

From the example above you should be able to do this:

```typescript
import { Component } from 'vue-typed'

@Component({
  template: require('./container.html')
})
export class Container {
  created() {
    // Raising error since globalMethod is not defined
    this.globalMethod()
  }
}
```

But unfortunatelly NOT, the `globalMethod()` will not recognized by `Container` class since it's not defined anywhere. Thus you have to extend this class from `Global` class. 
But again it's not make sense since the `globalMethod()` is actually already exists magically be the global mixin. Then here's come `Virtual<T>` function to help you:

```typescript
import { Component, Virtual } from 'vue-typed'

@Component({
  template: require('./container.html')
})
export class Container extends Virtual<Global>() {
  created() {
    // It's available now
    this.globalMethod()
  }
}
```

`Virtual<T>` function is just a helper to help us deal with typescript. It does not extend the class anywhere but an empty function.

You will do same way to invoke both the global methods and mixin(s) methods together:

```typescript
import { Component, Options, Mixin, Virtual } from 'vue-typed'

@Options()
class MyMixin extends Virtual<Global>() {
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
    this.globalMethod()
  }
}
```