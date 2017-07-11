# Virtual

`Virtual` is a special function to extends your `Component` or `Options` class without having actually inherit from the actual parent class (fake inheritance).
This will usefull to have an access of global `Vue` object member that is not declared in `Vue` it self yet.

For example you have class `Utils` that you want to define it as a `Vue` prototype so you can access it anywhere:

```typescript
// create Utils class
class Utils {
	sum(a: number, b: number): number {
		return a+b
	}
}

// define Vue.$utils property
const $utils = new Utils()
Object.defineProperties(Vue.prototype, {
	$utils: { get() { return $utils } }
})

// create an interface to extends Vue to be have $utils property
export interface IApp extends Vue {
	$utils: Utils
}
```

Now you can use `Virtual<IApp>()` to extends your `Component`/`Options` class to have `$utils` member here.

```typescript
@Component({ template: require('./container.html') })
export class Container extends Virtual<IApp>() {
	mounted() {
		// this.$utils is here now
		console.log('1 + 1 =', this.$utils.sum(1, 1));
	}
}
```

Of course instead of doing this, you can also get dirty with `d.ts` file to achive the goal above. The above example is just illustration to show how `Virtual` works.

Since [Options](options.html) doesn't support inheritance you'll use this `Virtual` function to have fake inheritance. For example:

```typescript
@Options({ template: require('./container.html') })
export class Container extends Virtual<Vue>() {
	doSomething() {
		// this.$el that part of Vue is here now
		console.log('Element -> ', this.$el);
	}
}
```