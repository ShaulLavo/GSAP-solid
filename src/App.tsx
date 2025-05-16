import { Bounce, Quad } from 'gsap'
import { Bouncer } from './examples/Bouncer'
import { HoverButton } from './examples/HoverButton'
import { Split } from './examples/Split'
import { Typing } from './examples/Typing'
// import O3 from './examples-ref/InsaneO3'
import O4 from './examples-ref/InsaneO4'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
gsap.registerPlugin(ScrollTrigger)
function App() {
	ScrollTrigger.create({
		onUpdate: self =>
			gsap.to('body', {
				background: `hsl(${self.scroll() / 5},50%,15%)`,
				duration: 0.3
			})
	})
	return (
		<>
			<div class="flex flex-row">
				<div class="flex-1 flex items-center flex-col gap-6 bg-zinc-900 h-screen">
					<Bouncer />
					<Typing placeholder="GSAP x Solid — try me" />
					<Split text="Solid + GSAP" />
					<div class="flex flex-row gap-4">
						<HoverButton
							label="EASE‑IN"
							hoverLabel="EASE‑OUT"
							spanProps={{
								ease: Quad.easeInOut
							}}
						/>
						<HoverButton
							label="STAGGER"
							hoverLabel="BOUNCE"
							spanProps={{
								ease: Bounce.easeOut
							}}
						/>
					</div>
					<div class="flex-1"></div>
					<O4 />
				</div>
				{/* <O3 /> */}
			</div>
		</>
	)
}

export default App
