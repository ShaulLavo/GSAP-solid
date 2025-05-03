import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function resolveGetter<T>(value: () => T): T
export function resolveGetter<T>(value: T): T
export function resolveGetter<T>(value: T | (() => T)): T {
	return typeof value === 'function' ? (value as () => T)() : value
}
export function resolveObject<T extends Record<string, any>>(obj: {
	[K in keyof T]: T[K] | (() => T[K])
}): T {
	const out = {} as T
	for (const k in obj) out[k] = resolveGetter(obj[k] as any) as T[typeof k]
	return out
}

type Curried<F, A> = F extends (arg0: A, ...rest: infer R) => infer Ret
	? (...args: R) => Ret
	: never

export function wrapWith<A, F extends (arg0: A, ...args: any[]) => any>(
	fn: F,
	value: A
): Curried<F, A> {
	return ((...args: any[]) => fn(value, ...args)) as Curried<F, A>
}

type WrappedObject<O, A> = {
	[K in keyof O]: O[K] extends (...args: any[]) => any ? Curried<O[K], A> : O[K]
}

export function injectArg<O extends Record<string, any>, A>(
	obj: O,
	value: A
): WrappedObject<O, A> {
	const out: Partial<WrappedObject<O, A>> = {}
	for (const k in obj) {
		const v = obj[k]
		;(out as any)[k] = typeof v === 'function' ? wrapWith(v as any, value) : v
	}
	return out as WrappedObject<O, A>
}
