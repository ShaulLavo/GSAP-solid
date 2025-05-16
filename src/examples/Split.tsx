import { GSAP } from '../GSAP'

interface SplitProps {
	text: string
}

export function Split(props: SplitProps) {
	const paint = (chars: HTMLElement[]) => {
		chars.forEach(el => {
			el.style.color = `hsl(${GSAP.random(0, 360, 1)},80%,60%)`
		})
	}
	const x = () => GSAP.random(-200, 200)
	const y = () => GSAP.random(-150, 150)
	const rotation = () => GSAP.random(-720, 720)
	return (
		<div class="inset-0 flex items-center justify-center ">
			<GSAP.p
				split={{ type: 'chars' }}
				behavior="from"
				x={x}
				y={y}
				rotation={rotation}
				scale={0}
				autoAlpha={0}
				stagger={{ each: 0.05, from: 'random' }}
				duration={1.2}
				ease="elastic.out(1,0.6)"
				repeat={-1}
				repeatDelay={1}
				repeatRefresh
				callbacks={{
					onStart: paint,
					onRepeat: paint
				}}
				class="text-7xl font-bold tracking-wide uppercase drop-shadow-xl"
			>
				{props.text}
			</GSAP.p>
		</div>
	)
}
