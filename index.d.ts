import { Vue } from 'vue/types/vue';
import { ComponentOptions, PropOptions } from 'vue/types/options';

declare class VueGeneric<T> extends Vue { }
export type VirtualClass<T> = { new (): T } & typeof VueGeneric

export function Component(options?: ComponentOptions<Vue>): ClassDecorator
export function Options(options?: ComponentOptions<Vue>): ClassDecorator
export function Prop(options?: PropOptions): PropertyDecorator
export function Watch(property: string, deep?:boolean): MethodDecorator 
export function Mixin<T>(component: { new () : T; }): VirtualClass<T>
export function Mixins<T>(...components: { new (); }[]): VirtualClass<T> 
export function GlobalMixin(options?: ComponentOptions<Vue>): ClassDecorator
export function Virtual<T>(): VirtualClass<T>