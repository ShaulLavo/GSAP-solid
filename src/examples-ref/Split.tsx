import { onMount } from 'solid-js'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

function Split() {
	let wrapperRef: HTMLParagraphElement

	onMount(() => {
		const split = new SplitText(wrapperRef, { type: 'chars' })

		const paint = () =>
			split.chars.forEach(
				el =>
					((el as HTMLElement).style.color = `hsl(${gsap.utils.random(
						0,
						360,
						1
					)},80%,60%)`)
			)

		gsap.from(split.chars, {
			x: () => gsap.utils.random(-200, 200),
			y: () => gsap.utils.random(-150, 150),
			rotation: () => gsap.utils.random(-720, 720),
			scale: 0,
			autoAlpha: 0,
			stagger: { each: 0.05, from: 'random' },
			duration: 1.2,
			ease: 'elastic.out(1,0.6)',
			repeat: -1,
			repeatDelay: 1,
			repeatRefresh: true,
			onStart: paint,
			onRepeat: paint
		})
	})

	return (
		<div class="inset-0 flex items-center justify-center bg-zinc-900">
			<p
				ref={el => (wrapperRef = el)}
				class="text-7xl font-bold tracking-wide uppercase drop-shadow-xl"
			>
				Hello World :)
			</p>
		</div>
	)
}

export default Split
