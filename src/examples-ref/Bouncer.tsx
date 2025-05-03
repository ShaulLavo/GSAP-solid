import { onMount } from 'solid-js'
import { gsap } from 'gsap'

function Bouncer() {
	let arena!: HTMLDivElement
	let mover!: HTMLDivElement

	onMount(() => {
		const size = 300
		gsap.set(arena, {
			position: 'relative',
			width: size,
			height: size,
			background: '#111',
			borderRadius: 12
		})

		gsap.set(mover, {
			width: 40,
			height: 40,
			borderRadius: '50%',
			background: '#00e0ff',
			position: 'absolute'
		})

		const maxX = size - 40
		const maxY = size - 40
		let vx = 3
		let vy = 2
		let x = 0
		let y = 0
		const setX = gsap.quickSetter(mover, 'x', 'px')
		const setY = gsap.quickSetter(mover, 'y', 'px')

		gsap.ticker.add(() => {
			x += vx
			y += vy
			if (x <= 0 || x >= maxX) {
				vx *= -1
				x = Math.max(0, Math.min(maxX, x))
			}
			if (y <= 0 || y >= maxY) {
				vy *= -1
				y = Math.max(0, Math.min(maxY, y))
			}
			setX(x)
			setY(y)
		})
	})

	return (
		<div ref={arena}>
			<div ref={mover}></div>
		</div>
	)
}

export default Bouncer
