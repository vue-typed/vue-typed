# Multiple Mixin

You need `Mixins` function to extends your component with several mixins:

```typescript
class MainClass extends Mixins<AllMixinsInterface>(Mixin1, Mixin2, OtherMixins, ...)
```

`AllMixinsInterface` is an interface that holds the class members of `Mixin1`, `Mixin2` and all other mixins you want. To be clear see example bellow:

### Example

```typescript
import { Component, Options, Mixins } from 'vue-typed'

@Options()
class MyMixin1 {
  mymix1() {
    console.log('my mix 1 method called');
  }
}

@Options()
class MyMixin2 {
  mymix2() {
    console.log('my mix 2 method called');
  }
}

interface AllMyMixins extends MyMixin1, MyMixin2 { }

@Component()
class Container extends Mixins<AllMyMixins>(MyMixin1, MyMixin2) {
  created() {
    this.mymix1()
    this.mymix2()
  }
}
```

That is equivalent to:

```javascript
var AllMyMixins = Vue.extend({
  mixins: [  
    { // MyMixin1
      methods: {
        mymix1: function() {
          console.log('my mix 1 method called');
        }
      }
    },    
    { // MyMixin2
      methods: {
        mymix2: function() {
          console.log('my mix 2 method called');
        }
      }
    }
  ]
})


var Container = AllMyMixins.extend({
  created: function() {
    this.mymix1()
    this.mymix2()
  }
})

```