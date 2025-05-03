import { Bounce, Quad } from 'gsap'
import { Bouncer } from './examples/Bouncer'
import { HoverButton } from './examples/HoverButton'
import { Split } from './examples/Split'
import { Typing } from './examples/Typing'

function App() {
	return (
		<div class="bg-zinc-900 w-full h-screen flex flex-row">
			<div class="flex-1 flex items-center flex-col gap-6">
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
				<HoverButton label="LOOP" hoverLabel="YOYO" spanProps={{}} />
			</div>
		</div>
	)
}

export default App
