# Methods and Computed Properties


All methods in `Component` class will become part of `methods` attributes except for the internal hook methods used by **Vue** (eg: `created, beforeDestroy, destroyed`, etc...).  You can also define `getter` and `setter` that will become part of `computed` attribute.

```typescript
@Component({
  template: 
  `<div>
      <div id="text">
        now: <span id="now">{{val}}</span>, 
        next: <span id="next">{{next}}</span>
      </div>
    <button id="btn" v-on:click="inc">Inc</button>
  </div>`
})
class Foo {

  // data
  val: number = 1

  // part of internal hooks
  created() {
    console.log('Foo created')
  }

  // method
  inc() {
    this.val += 1;
  }

  // property - get
  get next() : number {
    return this.val + 1;
  }

}
```

Code above is equivalent to:

```javascript
Vue.extend({
  template: 
  `<div>
      <div id="text">
        now: <span id="now">{{val}}</span>, 
        next: <span id="next">{{next}}</span>
      </div>
    <button id="btn" v-on:click="inc">Inc</button>
  </div>`

  created: function () {
    console.log('Foo created')
  },
  
  data: function () {
    return { val: 1 }
  },

  methods: {
    inc: function () {
      this.val += 1;
    }
  },

  computed: {
    next: {
      get: function() {
        return this.val + 1;
      }
    }
  }
})
```