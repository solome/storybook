import React from 'react'
import ReactDOM from 'react-dom/client'
import { FileTree, FileTreeProps } from '.'

function main() {
  const obj: any = Object.assign({}, window)
  const props = obj.$__data__ as FileTreeProps
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <FileTree {...props} />
  )
}

main()
