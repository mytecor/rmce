
import React from 'react'

let selection = document.getSelection()

function combineRefs(...args) {
	return node => args.map(arg => arg && (typeof arg == 'object'? arg.current = node : arg(node)))
}

export default React.forwardRef(({children = '', value = children, onChange = () => {}, highlight, readOnly = false, ...props}, forwardedRef) => {
	let pos = React.useRef(0)

	let ref = React.useRef()
	forwardedRef = combineRefs(ref, forwardedRef)

	props.onKeyDown = e => {
		let ch = e.key

		if(ch == 'Tab' || ch == 'Enter') {
			e.preventDefault()
			if(ch == 'Tab') ch = '\t'
			if(ch == 'Enter') ch = '\n'

			// Insert char
			let range = selection.getRangeAt(0)
			range.deleteContents()
			range.insertNode(new Text(ch))
			range.collapse()
		}
	}

	props.onInput = e => {
		let code = e.target.textContent

		// Get and save cursor position
		if(!selection.anchorNode) return 0

		let range = new Range
		range.setStart(ref.current, 0)
		range.setEnd(selection.anchorNode, selection.anchorOffset)

		pos.current = range.toString().length

		onChange(code)
	}

	React.useLayoutEffect(() => {
		// Set cursor position
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
		ref={forwardedRef}
		contentEditable={!readOnly}
		spellCheck='false'
		dangerouslySetInnerHTML={{__html: highlight(value)}}
		/>
})
