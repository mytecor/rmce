
import { ReactElement, HTMLAttributes } from 'react'
import Prism from 'prismjs'

class Props extends HTMLAttributes {
  children: string = ''

  /**
   * Current value of the editor i.e. the code to display
   */
  value: string = ''


  /**
   * Callback which is called when the value of the editor changes
   */
  onChange(): void

  /**
   * Specifies the syntax language for prismjs
   */
  language: string | undefined

  /**
   * Specifies the ability to edit
   */
  readOnly: boolean = false

  /**
   * Callback which will receive code to highlight
   */
	highlight(code: string): string {
    return language? Prism.highlight(code, Prism.languages[language]) : code
  }
}

export default function CodeEditor(props: Props): ReactElement
