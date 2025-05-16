import { gsap } from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { Physics2DPlugin } from 'gsap/Physics2DPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Index, onMount } from 'solid-js'
import { GSAP } from '../GSAP'

gsap.registerPlugin(
	ScrollTrigger,
	DrawSVGPlugin,
	MorphSVGPlugin,
	Physics2DPlugin
)

const InsaneAnimation = () => {
	let containerRef: HTMLDivElement | undefined
	let svgRef: SVGSVGElement | undefined
	const balls = () =>
		Array.from({ length: 50 }, () => `hsl(${GSAP.random(0, 360, 1)},80%,60%)`)

	onMount(() => {
		if (!containerRef || !svgRef) return
		const { width, height } = containerRef.getBoundingClientRect()

		gsap.set('.ball', {
			transformOrigin: '50% 50%',
			x: width / 2,
			y: height / 2
		})

		const tl = gsap.timeline({ repeat: -1, yoyo: true })
		tl.to('.ball', {
			physics2D: { velocity: 200, angle: 'random(0,360)', gravity: 300 },
			duration: 3,
			stagger: { each: 0.04, ease: 'power2.in' }
		})
			.to('.ball', {
				x: `random(0,${width})`,
				y: 'random(0,400)',
				rotation: 'random(0,360)',
				duration: 1,
				stagger: 0.02,
				ease: 'elastic.out(1,0.5)'
			})
			.to('.ball', {
				morphSVG: { shape: 'M0,0 h20 v20 h-20 Z' },
				duration: 1.5,
				stagger: { grid: [10, 5], from: 'edges', amount: 1 }
			})
	})

	const circlePath = 'M10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0'

	return (
		<div ref={containerRef} class="relative w-full h-100 overflow-hidden">
			<svg ref={svgRef} class="absolute inset-0 w-full h-full">
				<Index each={balls()}>
					{color => (
						<path class="ball" d={circlePath} stroke-width="4" fill={color()} />
					)}
				</Index>
			</svg>
		</div>
	)
}

export default InsaneAnimation
