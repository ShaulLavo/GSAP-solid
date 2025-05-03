import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { createEffect, createSignal, JSX, onMount, splitProps } from 'solid-js'
import { GSAP, GSAPProps } from '../GSAP'
import { cn } from '../lib/utils'
gsap.registerPlugin(SplitText)

interface HoverButtonProps {
	label: string
	hoverLabel?: string
	spanProps?: JSX.IntrinsicElements['span'] & GSAPProps<any>
	onHover?: () => void
	onLeave?: () => void
}

const BASE = 24

export function HoverButton(props: HoverButtonProps) {
	const [local] = splitProps(props, [
		'label',
		'hoverLabel',
		'spanProps',
		'onHover',
		'onLeave'
	])
	const [isMounted, setIsMounted] = createSignal(false)
	const [y, setY] = createSignal(0)
	const [y2, setY2] = createSignal(BASE)
	const [w, setW] = createSignal<number>(0)

	let btn!: HTMLAnchorElement
	let measure!: HTMLSpanElement

	createEffect(() => {
		queueMicrotask(
			() => measure && setW(measure.getBoundingClientRect().width + 48)
		)
	})

	onMount(() => {
		btn.addEventListener('mouseenter', () => {
			setY(-BASE)
			setY2(-BASE)
			local.onHover?.()
		})
		btn.addEventListener('mouseleave', () => {
			setY(BASE)
			setY2(BASE)
			local.onLeave?.()
		})
		setIsMounted(true)
	})

	return (
		<div class="h-8 overflow-hidden w-fit">
			<a
				ref={btn}
				style={{ width: `${w()}px` }}
				class={cn(
					[
						'relative inline-block px-12  text-amber-50 text-xl font-bold uppercase',
						'cursor-pointer tracking-wider no-underline whitespace-nowrap'
					].join(' ')
				)}
			>
				<span ref={measure} class="invisible pointer-events-none">
					{local.hoverLabel ?? local.label}
				</span>

				<GSAP.span
					class="absolute inset-0 pointer-events-none"
					split={{ type: 'chars,words' }}
					behavior="to"
					y={y()}
					stagger={() => Math.random() * 0.1}
					duration={0.5}
					paused={!isMounted()}
					{...local.spanProps}
				>
					{local.label}
				</GSAP.span>

				<GSAP.span
					class="absolute inset-0 pointer-events-none text-neutral-600"
					split={{ type: 'chars,words' }}
					behavior="to"
					y={y2()}
					stagger={() => Math.random() * 0.1}
					duration={0.5}
					paused={!isMounted()}
					{...local.spanProps}
				>
					{local.hoverLabel ?? local.label}
				</GSAP.span>
			</a>
		</div>
	)
}
