const fs = require('fs')

fs.readFile('./src/styles/tools/_color.scss', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    const content = data.toString('utf-8')
    const fragment = content.split('\n')
    
    let _content = `@use "./tools/color";\n@use "./tools/mixin";\n\n`

    for (const chunk of fragment) {
      if (chunk === '') {
        _content += '\n'
        continue
      }

      const match = chunk.match(/^\$(\w+(?:-\d+)?):/)
      if (match === null) continue

      const className = match[1]
      const variableName = match[0].slice(0, -1)

      _content += `@include mixin.color("${className}", color.${variableName});\n`
    }
    
    fs.writeFileSync('./src/styles/_color.scss', _content, err => {
      if (err) {
        console.log(err)
        return
      }
    })
  }
})

fs.readFile('./src/styles/tools/_elevation.scss', function (err, data) {
  if (err) {
    console.log(err)
  } else {
    const content = data.toString('utf-8')
    const fragment = content.split('\n')
    
    let _content = `@use "./tools/mixin";\n@use "./tools/elevation" as e;\n\n`
    let map = {}

    for (const chunk of fragment) {
      if (chunk === '') continue

      const match = chunk.match(/^\$\w+-(\d+):/)
      if (match === null) continue

      const num = match[1]
      const variableName = 'e.' + match[0].slice(0, -1)

      if (!map[num]) map[num] = []
      map[num].push(variableName)
    }

    for (const num in map) {
      const args = map[num].join(', ')
      _content += `@include mixin.elevation(${num}, ${args});\n`
    }    

    fs.writeFileSync('./src/styles/_elevation.scss', _content, err => {
      if (err) {
        console.log(err)
        return
      }
    })
  }
})