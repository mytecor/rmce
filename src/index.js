
import React from 'react'

let selection = document.getSelection()

export default React.forwardRef(function CodeEditor({value, onChange, highlight, ...props}, ref) {
	let pos = React.useRef(0)
	ref = ref || React.useRef()

	props.onInput = e => {
		let code = e.target.textContent

		if(!selection.anchorNode) return 0

		let range = new Range
		range.setStart(ref.current, 0)
		range.setEnd(selection.anchorNode, selection.anchorOffset)

		pos.current = range.toString().length

		if(onChange) onChange(code)
	}

	props.onKeyDown = e => {
		let ch = e.key

		if(ch == 'Tab' || ch == 'Enter') {
			e.preventDefault()
			if(ch == 'Tab') ch = '\t'
			if(ch == 'Enter') ch = '\n'
			let range = selection.getRangeAt(0)
			range.deleteContents()
			range.insertNode(new Text(ch))
			range.collapse()
		}
	}

	React.useEffect(() => {
		let p = pos.current
		let child = ref.current.firstChild
		while(p > 0) {
			let length = child.textContent.length
			if(p > length) {
				p -= length
				child = child.nextSibling
			}
			else {
				if(child.nodeType == 3) return selection.collapse(child, p)
				child = child.firstChild
			}
		}
	}, [value])

	return <code {...props}
		ref={ref}
		contentEditable
		spellCheck='false'
		dangerouslySetInnerHTML={{__html: highlight(value)}}
		/>
})
