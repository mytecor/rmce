
import { ReactElement, HTMLAttributes } from 'react'

interface CodeEditorProps extends HTMLAttributes<any> {
  /** Current value of the editor i.e. the code to display */
  children?: string

  /** Current value of the editor i.e. the code to display */
  value?: string

  /** Callback which is called when the value of the editor changes */
  onChange?(): void

  /** Specifies the syntax language for prismjs */
  language?: string

  /** Specifies the ability to edit */
  readOnly?: boolean

  /** Callback which will receive code to highlight */
	highlight?(code: string): string
}


export default function CodeEditor(props: CodeEditorProps): ReactElement
