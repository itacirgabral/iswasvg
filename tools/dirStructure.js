const fs = require('fs');

const recursivereaddir = (dir) => {
  const here = fs.readdirSync(dir).map(name => {
    const dirname = `${dir}${name}`
    return [fs.lstatSync(dirname).isDirectory(), dir, name]
  })
  const folder = here.reduce((acc, el) => {
    if (el[0]) {
      acc[el[2]] = recursivereaddir(`${el[1]}${el[2]}/`)
    } else {
      acc[el[2]] = null
    }
    return acc
  }, {})

  if(Object.values(folder).every(el => el === null)) {
    return Object.keys(folder)
  } else {
    return folder
  }
}

module.exports = recursivereaddir