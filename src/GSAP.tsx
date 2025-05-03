import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import {
	Component,
	createEffect,
	JSX,
	onCleanup,
	splitProps,
	ValidComponent
} from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { injectArg } from './lib/utils'
import { CallbackMap, unitKeys, Units } from './types'

gsap.registerPlugin(SplitText)

type WithoutRef<P> = Omit<P, 'ref'>
export type GSAPProps<P> = Units &
	WithoutRef<P> & {
		ref?: (el: Element) => void
		behavior?: 'set' | 'from' | 'to'
		timeline?: gsap.TimelineVars
		split?: {
			type: SplitText.Vars['type']
			splitBy?: 'chars' | 'elements' | 'lines' | 'masks' | 'words'
		}
		callbacks?: CallbackMap
	}

export type GSAPStatic = {
	<P extends Record<string, any>>(cmp: Component<P> | string): Component<
		GSAPProps<P>
	>
} & {
	[K in keyof JSX.IntrinsicElements]: Component<
		GSAPProps<JSX.IntrinsicElements[K]>
	>
} & typeof gsap.utils

interface AnimeProps {
	el: Element | Element[]
	units: Units
	callbacks?: CallbackMap
	behavior?: 'set' | 'from' | 'to'
	timelineVars?: gsap.TimelineVars
	split?: {
		type?: SplitText.Vars['type']
		splitBy?: 'chars' | 'elements' | 'lines' | 'masks' | 'words'
	}
}
// chars elements lines masks words
function anime({
	el,
	units,
	behavior = 'set',
	timelineVars,
	split,
	callbacks
}: AnimeProps) {
	const [rest] = splitProps(units, unitKeys)
	// let tweenline: gsap.core.Timeline | gsap.core.Tween = null!
	let tween: gsap.core.Tween = null!
	let tl: gsap.core.Timeline = null!
	createEffect(() => {
		if (split) {
			const splitText = new SplitText(el, { type: split.type ?? 'chars' })
			el = splitText[split.splitBy ?? 'chars']
		}
		if (callbacks) callbacks = injectArg(callbacks, el)
		if (timelineVars) {
			tween = gsap[behavior](el, { ...rest, ...callbacks })
			tl = gsap.timeline(timelineVars)
			tl.add(tween)
		} else {
			tween = gsap[behavior](el, { ...rest, ...callbacks })
		}
	})
	createEffect(() => {
		console.log('this is the effect')
		if (tl && timelineVars) {
			tl.repeat(timelineVars.repeat ?? 0)
			tl.yoyo(timelineVars.yoyo ?? false)
			tl.paused(timelineVars.paused ?? false)
			tl.reversed(timelineVars.reversed ?? false)
			tl.repeatDelay(timelineVars.repeatDelay ?? 0)
			tl.duration(timelineVars.duration ?? 0)
			tl.timeScale(timelineVars.timeScale ?? 1)
		} else if (tween) {
			tween.repeat(rest.repeat ?? 0)
			tween.yoyo(rest.yoyo ?? false)
			tween.paused(rest.paused ?? false)
			tween.reversed(rest.reversed ?? false)
			tween.repeatDelay(rest.repeatDelay ?? 0)
			tween.duration(rest.duration ?? 0)
		}
	})
}

const handler: ProxyHandler<any> = {
	apply(_, __, [component]: [ValidComponent | string]) {
		return (props: GSAPProps<any>) => {
			const [
				units,
				{ behavior = 'set', timeline: timelineVars, split, callbacks },
				rest
			] = splitProps(props, unitKeys, [
				'behavior',
				'timeline',
				'split',
				'callbacks',
				'ref'
			])

			const handleRef = (el: Element) => {
				props.ref?.(el)
				anime({ el, units, behavior, timelineVars, split, callbacks })
			}

			onCleanup(() => {})

			return <Dynamic component={component} ref={handleRef} {...rest} />
		}
	},
	get(_, prop: PropertyKey) {
		if (prop in gsap.utils) {
			return gsap.utils[prop as keyof typeof gsap.utils]
		}

		return (props: GSAPProps<any>) => {
			const [
				units,
				{ behavior = 'set', timeline: timelineVars, split, callbacks },
				rest
			] = splitProps(props, unitKeys, [
				'behavior',
				'timeline',
				'split',
				'callbacks',
				'ref'
			])
			const handleRef = (el: Element) => {
				props.ref?.(el)
				anime({ el, units, behavior, timelineVars, split, callbacks })
			}

			onCleanup(() => {})

			return (
				<Dynamic
					component={prop as keyof JSX.IntrinsicElements}
					ref={handleRef}
					{...rest}
				/>
			)
		}
	}
}

export const GSAP = new Proxy(() => {}, handler) as GSAPStatic
