import { Vue } from 'vue/types/vue';
import { ComponentOptions, PropOptions } from 'vue/types/options';

export function Component(options?: ComponentOptions<Vue>): ClassDecorator
export function Getter(getter: Function): PropertyDecorator
export function Action(action: Function): MethodDecorator
export function Prop(options?: PropOptions): PropertyDecorator
export function Watch(property: string, deep?:boolean): MethodDecorator 