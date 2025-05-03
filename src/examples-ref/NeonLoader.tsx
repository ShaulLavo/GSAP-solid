import { onMount } from 'solid-js'
import { gsap } from 'gsap'

function NeonLoader() {
	onMount(() => {
		const bars = document.querySelectorAll('.bar')
		gsap.set(bars, { transformOrigin: '50% 100%' })
		gsap.timeline({ repeat: -1 }).to(bars, {
			scaleY: 0.2,
			stagger: { each: 0.06, yoyo: true, repeat: 1 },
			ease: 'sine.inOut',
			duration: 0.4
		})
	})

	return (
		<div class="loader">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>
	)
}

export default NeonLoader
