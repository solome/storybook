import React from 'react'
import ReactDOM from 'react-dom/client'
import { CalendarHeatmap, CalendarHeatmapProps } from '.'

function main() {
  const obj: any = Object.assign({}, window)
  const props = obj.$__data__ as CalendarHeatmapProps
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <CalendarHeatmap {...props} />
  )
}

console.log('__debug__')

main()
