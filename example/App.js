
import React from 'react'
import ReactDOM from 'react-dom'

import '../src/index.styl'
import './main.styl'
import CodeEditor from '../src'

import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'

function MainUsageExample() {
	let [code, setCode] = React.useState(`import React from 'react'
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
}`)

	return <>
		<h3>Usage example:</h3>
		<CodeEditor
			className='rmce'
			language='jsx'
			value={code}
			onChange={setCode}
			/>
	</>
}

function Code({lang, ...props}) {
	return <CodeEditor className='rmce wrap' readOnly language={lang} {...props}/>
}

ReactDOM.render(<>
	<header>
		<h1>rmce</h1>
		<p>React mini code editor</p>
		<a href='https://github.com/midnightcoder-pro/rmce'>github</a>
	</header>
	<h3>Install:</h3>
	<div id='install'>
		<Code lang='bash'>yarn add rmce</Code>
		<Code lang='bash'>npm add rmce</Code>
	</div>
	<MainUsageExample/>

	<h3>Props:</h3>
	<Code lang='ts'>{`class Props {
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
}`}</Code>
</>, document.getElementById('root'))
