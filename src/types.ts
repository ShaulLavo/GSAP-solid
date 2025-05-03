type Callback = (...args: any[]) => void | null

import type { Accessor } from 'solid-js'
const accessorKeys = ['x', 'y', 'rotation', 'scale'] as const
const numberKeys = [
	'opacity',
	'duration',
	'repeat',
	'repeatDelay',
	'autoAlpha'
] as const
const staggerKeys = ['stagger'] as const

const stringKeys = [
	'bottom',
	'fontSize',
	'height',
	'left',
	'lineHeight',
	'margin',
	'padding',
	'perspective',
	'right',
	'rotationX',
	'rotationY',
	'skewX',
	'skewY',
	'top',
	'width',
	'z'
] as const

export type Stagger = gsap.NumberValue | gsap.StaggerVars

type ValueMap = {
	[K in (typeof accessorKeys)[number]]: string | number | Accessor<number>
} & {
	[K in (typeof numberKeys)[number]]: number
} & {
	[K in (typeof animationBooleanKeys)[number]]: boolean
} & {
	[K in (typeof staggerKeys)[number]]: Stagger
} & {
	[K in (typeof stringKeys)[number]]: string
} & {
	[K in (typeof tweenVarsKeys)[number]]: Tweenish
} & { ease?: gsap.EaseString | gsap.EaseFunction | string }

export type CallbackMap = Partial<{
	[K in (typeof callbackKeys)[number]]: Callback
}>
export type Units = Partial<ValueMap>

export const callbackScopeKey = ['callbackScope'] as const

export const callbackKeys = [
	'onComplete',
	'onRepeat',
	'onReverseComplete',
	'onStart',
	'onUpdate'
] as const

export const callbackParamKeys = [
	'onCompleteParams',
	'onRepeatParams',
	'onReverseCompleteParams',
	'onStartParams',
	'onUpdateParams'
] as const

export const callbackVarKeys = [
	...callbackScopeKey,
	...callbackKeys,
	...callbackParamKeys
] as const

export type CallbackVars = {
	[K in (typeof callbackScopeKey)[number]]?: object
} & { [K in (typeof callbackKeys)[number]]?: Callback } & {
	[K in (typeof callbackParamKeys)[number]]?: any[]
}

export const animationDataKey = ['data'] as const

export const animationIdKey = ['id'] as const

export const animationBooleanKeys = [
	'inherit',
	'paused',
	'repeatRefresh',
	'reversed',
	'yoyo'
] as const

export const animationNumberKeys = ['repeat', 'repeatDelay'] as const

export const animationVarKeys = [
	...animationDataKey,
	...animationIdKey,
	...animationBooleanKeys,
	...animationNumberKeys
] as const

export type AnimationVars = CallbackVars & {
	[K in (typeof animationDataKey)[number]]?: any
} & { [K in (typeof animationIdKey)[number]]?: string | number } & {
	[K in (typeof animationBooleanKeys)[number]]?: boolean
} & { [K in (typeof animationNumberKeys)[number]]?: number }

export const tweenGsapValueKeys = ['delay', 'duration'] as const
export const tweenEaseKey = ['ease'] as const
export const tweenArrayKey = ['endArray'] as const
export const tweenBooleanKeys = [
	'immediateRender',
	'lazy',
	'runBackwards'
] as const
export const tweenKeyframeKeys = ['keyframes', 'startAt'] as const
export const tweenInterruptKey = ['onInterrupt'] as const
export const tweenInterruptParamKey = ['onInterruptParams'] as const
export const tweenOverwriteKey = ['overwrite'] as const
export const tweenStaggerKey = ['stagger'] as const
export const tweenYoyoEaseKey = ['yoyoEase'] as const

export const tweenVarKeys = [
	...animationVarKeys,
	...tweenGsapValueKeys,
	...tweenEaseKey,
	...tweenArrayKey,
	...tweenBooleanKeys,
	...tweenKeyframeKeys,
	...tweenInterruptKey,
	...tweenInterruptParamKey,
	...tweenOverwriteKey,
	...tweenStaggerKey,
	...tweenYoyoEaseKey
] as const

export type TweenVars = AnimationVars & {
	[K in (typeof tweenGsapValueKeys)[number]]?: gsap.TweenValue
} & {
	[K in (typeof tweenEaseKey)[number]]?: gsap.EaseString | gsap.EaseFunction
} & { [K in (typeof tweenArrayKey)[number]]?: any[] } & {
	[K in (typeof tweenBooleanKeys)[number]]?: boolean
} & { [K in (typeof tweenKeyframeKeys)[number]]?: TweenVars[] | object } & {
	[K in (typeof tweenInterruptKey)[number]]?: Callback
} & { [K in (typeof tweenInterruptParamKey)[number]]?: any[] } & {
	[K in (typeof tweenOverwriteKey)[number]]?: 'auto' | boolean
} & {
	[K in (typeof tweenStaggerKey)[number]]?: gsap.NumberValue | gsap.StaggerVars
} & {
	[K in (typeof tweenYoyoEaseKey)[number]]?:
		| boolean
		| string
		| gsap.EaseFunction
}
export const tweenVarsKeys = ['from', 'to'] as const

export const tweenTimingKeys = ['at', 'duration'] as const

export const tweenishKeys = [...tweenVarsKeys, ...tweenTimingKeys] as const

export type TweenishKey = (typeof tweenishKeys)[number]
export type Tweenish = {
	from?: gsap.TweenVars
	to?: gsap.TweenVars
	at?: gsap.Position
	duration?: number
}

export const unitKeys = [
	...accessorKeys,
	...numberKeys,
	...animationBooleanKeys,
	...staggerKeys,
	...stringKeys,
	'ease'
] as const
