# Options

Is a decorator that converts your `class` into **Vue** simple options object. `Options` does not support inheritance nor mixins. To force inheritance in `Options` please refer to [Virtual](virtual.html).

```typescript
@Options({
  props: {
    'prop-in-options': 'Foo'
  }
})
class Container {

  data1 = 'the data'

  @Prop()
  prop1 = 'the prop'

  created() {
    // do something...
  }

  method1() {
    // do something...
  }

  @Watch('data1')
  watcher(val) {
    // do something...
  }
  
  get identity() {
    return this.data1;
  }

  set identity(val) {
    this.data1 = val
  }
}
```

is equivalent to

```javascript
var Container = {
  name: 'Container',
  data: function() {
    return {
      data1: 'the data'
    }
  },
  props: { 
    'prop-in-options': 'Foo',
    prop1: { default: 'the prop' } 
  },  
  created: function(){
    // do something...
  },
  methods: { 
    method1: function() {
      // do something...
    }
  },
  computed: { 
    identity: { 
      get: function(){
        return this.data1
      }, 
      set: function(val) {
        this.data1 = val
      }
    } 
  },
  watch: { 
    data1: function(val){
      // do something...
    }
  }
}
```