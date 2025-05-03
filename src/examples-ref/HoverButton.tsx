import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { createSignal, JSX, onMount, splitProps } from 'solid-js'
import { GSAP } from '../GSAP'
import { cn } from '../lib/utils'
gsap.registerPlugin(SplitText)

interface HoverButtonProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
	label: string
	hoverLabel?: string
}
const BASE = 48 / 2
export default function HoverButton(props: HoverButtonProps) {
	const [local, anchorAttrs] = splitProps(props, [
		'label',
		'hoverLabel',
		'class'
	])
	const [y, setY] = createSignal(0)
	const [y2, setY2] = createSignal(BASE)
	let btn!: HTMLAnchorElement

	onMount(() => {
		btn.addEventListener('mouseenter', () => {
			setY(-BASE)
			setY2(-BASE)
		})

		btn.addEventListener('mouseleave', () => {
			setY(BASE)
			setY2(BASE)
		})
	})

	return (
		<div class="h-8 overflow-hidden">
			<a
				{...anchorAttrs}
				ref={btn}
				class={cn(
					[
						'relative z-10 px-12 bg-neutral-900 text-amber-50 text-xl font-bold uppercase',
						'cursor-pointer tracking-wider no-underline '
					].join(' ')
				)}
			>
				<GSAP.span
					class="absolute inset-0  pointer-events-none"
					split={{ type: 'chars,words' }}
					behavior="to"
					y={y()}
					stagger={() => Math.random() * 0.1}
					duration={0.5}
				>
					{local.label}
				</GSAP.span>
				<GSAP.span
					class="absolute inset-0 pointer-events-none text-neutral-600 z-10"
					split={{ type: 'chars,words' }}
					behavior="to"
					y={y2()}
					stagger={() => Math.random() * 0.1}
					duration={0.5}
				>
					{local.hoverLabel ?? local.label}
				</GSAP.span>
			</a>
		</div>
	)
}
