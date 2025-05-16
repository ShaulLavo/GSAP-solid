import { Component, For, onMount } from 'solid-js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, SplitText, Flip)

const circlePath = (r: number, steps = 8) =>
	[...Array(steps + 1)].map((_, i) => {
		const a = (i / steps) * Math.PI * 2
		return { x: Math.cos(a) * r, y: Math.sin(a) * r }
	})

const InsaneAnimation: Component = () => {
	let heroRef: HTMLHeadingElement
	const shapeRefs: HTMLDivElement[] = []
	const panelRefs: HTMLDivElement[] = []

	onMount(() => {
		const heroText = new SplitText(heroRef, { type: 'chars' })
		gsap.from(heroText.chars, {
			duration: 2,
			yPercent: -200,
			rotate: 720,
			opacity: 0,
			ease: 'expo.inOut',
			stagger: { each: 0.02, from: 'random' }
		})

		heroText.chars.forEach(c =>
			gsap.to(c, {
				scrollTrigger: { trigger: c, start: 'top bottom', scrub: true },
				duration: 4,
				motionPath: {
					path: [
						{
							x: gsap.utils.random(-400, 400),
							y: gsap.utils.random(-400, 400)
						},
						{ x: gsap.utils.random(-800, 800), y: gsap.utils.random(-800, 800) }
					],
					curviness: 2
				},
				scale: gsap.utils.random(0.5, 3),
				rotation: gsap.utils.random(-1440, 1440),
				ease: 'none'
			})
		)

		shapeRefs.forEach(s => {
			const r = gsap.utils.random(200, 600)
			const t = gsap.utils.random(4, 12)
			gsap.to(s, { duration: t, rotate: 360, ease: 'none', repeat: -1 })
			gsap.to(s, {
				duration: t * 2,
				motionPath: { path: circlePath(r), autoRotate: false },
				repeat: -1,
				ease: 'none'
			})
			gsap.fromTo(
				s,
				{ scale: 0, opacity: 0 },
				{
					scale: gsap.utils.random(0.5, 2),
					opacity: 1,
					duration: 3,
					yoyo: true,
					repeat: -1,
					ease: 'sine.inOut',
					delay: gsap.utils.random(0, 3)
				}
			)
		})

		panelRefs.forEach(p =>
			ScrollTrigger.create({
				trigger: p,
				start: 'top center',
				end: 'bottom center',
				onEnter: () =>
					gsap.to(p, { rotateY: 180, duration: 1.2, ease: 'power4.inOut' }),
				onLeaveBack: () =>
					gsap.to(p, { rotateY: 0, duration: 1.2, ease: 'power4.inOut' })
			})
		)

		const pool = [...Array(60)].map(() => {
			const s = document.createElement('span')
			s.className =
				'fixed w-2 h-2 rounded-full pointer-events-none mix-blend-lighten bg-cyan-400'
			document.body.appendChild(s)
			return s
		})
		let i = 0
		window.addEventListener('pointermove', e => {
			const p = pool[i]
			gsap.set(p, {
				x: e.clientX,
				y: e.clientY,
				scale: gsap.utils.random(0.2, 1)
			})
			gsap.fromTo(
				p,
				{ opacity: 1 },
				{ opacity: 0, scale: 0, duration: 1.4, ease: 'expo.out' }
			)
			i = (i + 1) % pool.length
		})
	})

	return (
		<div class="relative w-full h-full overflow-hidden bg-black text-white">
			<div class="flex items-center justify-center h-screen">
				<h1
					ref={el => (heroRef = el)}
					class="text-[8vw] font-extrabold uppercase"
				>
					INSANITY
				</h1>
			</div>

			<div
				ref={el => (panelRefs[0] = el)}
				class="panel flex items-center justify-center h-screen text-[6vw] will-change-transform"
			>
				Scroll
			</div>
			<div
				ref={el => (panelRefs[1] = el)}
				class="panel flex items-center justify-center h-screen text-[6vw] will-change-transform"
			>
				Deeper
			</div>
			<div
				ref={el => (panelRefs[2] = el)}
				class="panel flex items-center justify-center h-screen text-[6vw] will-change-transform"
			>
				Madness
			</div>

			<For each={Array(5).fill(null)}>
				{(_, i) => (
					<div
						ref={el => (shapeRefs[i()] = el)}
						class="fixed top-1/2 left-1/2 w-[20vmin] h-[20vmin] rounded-full mix-blend-screen pointer-events-none"
						style={{
							background: 'radial-gradient(circle,#ff008c,#ffed00)',
							transform: 'translate(-50%,-50%)'
						}}
					/>
				)}
			</For>
		</div>
	)
}

export default InsaneAnimation
