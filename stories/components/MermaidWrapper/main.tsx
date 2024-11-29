async function main() {
  const mermaid = (await import('mermaid')).default

  Object.assign(window, {$mermaid: mermaid})

  // mermaid.contentLoaded = () => {
  //   console.log('contentLoaded')
  // }
  setTimeout(async () => {
    await mermaid.run()
    const html = document.getElementById('loading')
    if (html) html.setAttribute('id', '')
    // 保证动画顺利过渡
  }, 200)
}
main()

