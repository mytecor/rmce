# rmce
###### React mini code editor

[In action](https://mytecor.github.io/rmce)

#### Usage example (with prismjs)
```jsx
import React from 'react'
import CodeEditor from 'rmce'

// add jsx language support
import 'prismjs/components/prism-jsx'

// editor theme
import 'rmce/index.css'

function MyFancyEditor() {
	let [code, setCode] = React.useState('<div>test</div>')
	return <CodeEditor
		className='rmce'
		language='jsx'
		onChange={setCode}
		value={code}
		/>
}
```

#### Props

```ts
class Props {
	// Current value of the editor i.e. the code to display
	children: string = ''
	value: string = this.children

	// Callback which is called when the value of the editor changes
	onChange(): void

	// Specifies the syntax language for prismjs
	language: string | null = ''

	// Specifies the ability to edit
	readOnly: boolean = false

	// Callback which will receive code to highlight
	highlight(code: string): string {
		return language? Prism.highlight(code, Prism.languages[language]) : code
	}
```