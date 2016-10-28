# Use Component With [VueRouter](http://router.vuejs.org/)

Since the class decorated with `Component` is equivalent to `Vue.extend({})` so you can just simply use it as `routes` component.

```typescript
@Component({ template: '<div>This is foo!</div>' }) 
class Foo { }

@Component({ template: '<div>This is bar!</div>' }) 
class Bar { }

var routes = [
  { path: '/foo', Foo },
  { path: '/bar', Bar },
]
```


See live demo [here](http://embed.plnkr.co/3fOrJl/) or [here](http://embed.plnkr.co/c4ohy0/).