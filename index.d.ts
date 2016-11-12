import { Vue } from 'vue/types/vue';
import { ComponentOptions, PropOptions } from 'vue/types/options';

export function Component(options?: ComponentOptions<Vue>): ClassDecorator
export function Prop(options?: PropOptions): PropertyDecorator
export function Watch(property: string, deep?:boolean): MethodDecorator 