import { onMount } from 'solid-js'
import { gsap } from 'gsap'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

function BlobMorph() {
	onMount(() => {
		gsap.registerPlugin(MorphSVGPlugin)
		const tl = gsap.timeline({
			repeat: -1,
			defaults: { duration: 3, ease: 'power1.inOut' }
		})
		const blobs = ['#blob2', '#blob3', '#blob4', '#blob5', '#blob6']
		blobs.forEach(id => tl.to('#blob1', { morphSVG: id }))
		gsap.to('#blob1', { rotate: 360, repeat: -1, ease: 'none', duration: 30 })
		gsap.to('#gradientStop1', {
			attr: { stopColor: '#ff3cac' },
			yoyo: true,
			repeat: -1,
			duration: 6,
			ease: 'sine.inOut'
		})
		gsap.to('#gradientStop2', {
			attr: { stopColor: '#784ba0' },
			yoyo: true,
			repeat: -1,
			duration: 6,
			ease: 'sine.inOut',
			delay: 3
		})
	})
	return (
		<svg
			width="320"
			height="320"
			viewBox="0 0 300 300"
			style="display:block;margin:60px auto;overflow:visible"
		>
			<defs>
				<linearGradient id="blobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop id="gradientStop1" offset="0%" stop-color="#ff9f1c"></stop>
					<stop id="gradientStop2" offset="100%" stop-color="#ffbf69"></stop>
				</linearGradient>
				<filter id="blur">
					<feGaussianBlur stdDeviation="7" result="blur"></feGaussianBlur>
					<feComponentTransfer>
						<feFuncA type="linear" slope="1.2"></feFuncA>
					</feComponentTransfer>
					<feBlend in="SourceGraphic" mode="normal"></feBlend>
				</filter>
			</defs>
			<path
				id="blob1"
				fill="url(#blobGrad)"
				filter="url(#blur)"
				d="M150 20Q225 45 240 120Q255 195 180 225Q105 255 60 190Q15 125 70 70Q125 15 150 20Z"
			/>
			<path
				id="blob2"
				fill="none"
				d="M150 50Q220 70 235 150Q250 230 160 250Q70 270 50 170Q30 70 110 60Q190 50 150 50Z"
			/>
			<path
				id="blob3"
				fill="none"
				d="M150 30Q210 60 230 130Q250 200 170 230Q90 260 60 180Q30 100 100 50Q170 0 150 30Z"
			/>
			<path
				id="blob4"
				fill="none"
				d="M150 40Q240 80 250 150Q260 220 180 250Q100 280 60 200Q20 120 80 60Q140 0 150 40Z"
			/>
			<path
				id="blob5"
				fill="none"
				d="M150 35Q225 65 245 140Q265 215 185 240Q105 265 65 185Q25 105 90 55Q155 5 150 35Z"
			/>
			<path
				id="blob6"
				fill="none"
				d="M150 25Q230 55 245 130Q260 205 180 230Q100 255 55 175Q10 95 85 60Q160 25 150 25Z"
			/>
		</svg>
	)
}

export default BlobMorph
