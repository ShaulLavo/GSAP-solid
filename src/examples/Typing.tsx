import { createSignal, onMount } from 'solid-js'
import { GSAP } from '../GSAP'

interface TypingProps {
	placeholder?: string
}

export function Typing(props: TypingProps) {
	let inputRef: HTMLInputElement = null!

	const [text, setText] = createSignal(props.placeholder ?? 'Hello :)')

	const syncToEnd = () => {
		const el = inputRef
		const len = el.value.length
		el.selectionStart = el.selectionEnd = len
	}

	const handleInput = (e: InputEvent & { currentTarget: HTMLInputElement }) => {
		setText(e.currentTarget.value)
		syncToEnd()
	}

	const blockNav = (e: KeyboardEvent) => {
		if (
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight' ||
			e.key === 'ArrowUp' ||
			e.key === 'ArrowDown'
		) {
			e.preventDefault()
			syncToEnd()
		}
	}

	onMount(() => {
		inputRef.focus()
	})

	return (
		<div class="inset-0 flex items-center justify-center text-amber-50">
			<input
				ref={inputRef}
				type="text"
				class="absolute inset-0 opacity-0 "
				value={text()}
				onInput={handleInput}
				onKeyDown={blockNav}
			/>
			<p class="text-6xl leading-[80px] font-roboto text-center select-none">
				{text()}
				<GSAP.span
					behavior="to"
					timeline={{ repeat: -1 }}
					opacity={0}
					duration={0.5}
					yoyo
					repeat={1}
					ease="none"
					class="inline-block w-2 h-[60px] bg-amber-50 -translate-y-2 align-middle ml-2"
				/>
			</p>
		</div>
	)
}
