import { createSignal, onMount } from 'solid-js'
import { gsap } from 'gsap'
import { GSAP } from '../GSAP'

export function Bouncer() {
	const [x, setX] = createSignal(0)
	const [y, setY] = createSignal(0)

	const size = 300
	onMount(() => {
		const maxX = size - 40
		const maxY = size - 40
		let vx = 3
		let vy = 2
		gsap.ticker.add(() => {
			setX(x => x + vx)
			setY(y => y + vy)

			if (x() <= 0 || x() >= maxX) {
				vx *= -1
				setX(x => Math.max(0, Math.min(maxX, x)))
			}
			if (y() <= 0 || y() >= maxY) {
				vy *= -1
				setY(y => Math.max(0, Math.min(maxY, y)))
			}
			setX(x)
			setY(y)
		})
	})

	return (
		<GSAP.div
			style={{
				width: size + 'px',
				height: size + 'px',
				background: '#111',
				'border-radius': 12 + 'px',
				position: 'relative'
			}}
		>
			<GSAP.div
				style={{
					width: 40 + 'px',
					height: 40 + 'px',
					'border-radius': '50%',
					background: '#00e0ff',
					position: 'absolute'
				}}
				x={x() + 'px'}
				y={y() + 'px'}
			></GSAP.div>
		</GSAP.div>
	)
}
