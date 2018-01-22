const path = require('path')
const shell = require('shelljs')
const fs = require('fs')
const chalk = require('chalk')
const packageJson = () => path.join(process.cwd(), 'package.json')
const packageLock = () => path.join(process.cwd(), 'package-lock.json')
const yarnLock = () => path.join(process.cwd(), 'yarn.lock')
const templatesDir = () => path.join(__dirname, 'templates')

const logPrimary = (str) => console.log(chalk.cyan.bold(str))
const logInfo = (str) => console.log(chalk.green.bold(str))
const logWarn = (str) => console.log(chalk.red.bold(str))

const installPackage = (detectTool) => (pkgs, possibleTool, production = false) => {
  let tool = detectTool(possibleTool)
  tool = tool === 'npm' ? `npm install ${production ? '' : '--save-dev'}` : `yarn add ${production ? '' : '--dev'}`

  logInfo(`Run: ${tool} ${pkgs}`)
  if (shell.exec(`${tool} ${pkgs}`).code !== 0) {
    logWarn(`First, I know, sorry, but this is our everyday...`)
    logWarn(`The failed command is: `)
    logWarn(`${tool} ${pkgs}`)
    logWarn(`I dunno why, what can we do is check network and...`)
    logWarn(`try again`)
    logWarn(`try again two`)
    logWarn(`try to manually install`)
    logWarn(`try to digg into souce, and fix it yourself, only kick-ass choose this`)
    logWarn(`try 'npm cache clean --force'`)
    logWarn(`try google, especially the 2nd page`)
    logWarn(`try to feed cats`)
    logWarn(`try to restart terminal and/or machine`)
    logWarn(`try to turn off security tools`)
    logWarn(`try yarn if you are using npm`)
    logWarn(`try npm if you are using yarn`)
    logWarn(`try to upgrade npm to latest`)
    logWarn(`try to downgrade npm to 5.3`)
    logWarn(`try to downgrade npm to 5.0`)
    logWarn(`try to downgrade npm to 4.6`)
    logWarn(`try other OS`)
    logWarn(`...`)
    logWarn(`try /r/ProgrammerHumor, and do it late`)
    logWarn(`If you have tried all of the above, try from First.`)
    quit(1)
  }
  logInfo(`Package installed.`)
  logInfo(`If there are 'requires a peer of ...' warns, please ignore it first. If things not work later, install it manually.`)
}

const readTemplatesJson = path => fs.readFileSync(`${templatesDir()}/${path}/scripts.json`)

const readTemplatesFile = file => fs.readFileSync(`${templatesDir()}/${file}`)

const templatesFile = file => path.join(templatesDir(), file)

const copyFile = from => to => shell.cp(from, to)
const copyFolder = (from, to) => shell.cp('-Rf', from, to)
const updatePackageJson = other => {
  const packageFileUrl = packageJson()
  const local = fs.readFileSync(packageFileUrl)
  fs.writeFileSync(packageFileUrl, mergePackageJson(local, other))
}

const mergePackageJson = (local, other) => {
  return JSON.stringify(mergeObject(JSON.parse(local), JSON.parse(other)),undefined,2)
}

function mergeObject (local, other) {
  Object.keys(other).forEach(k => {
    if (typeof local[k] === 'undefined') {
      local[k] = other[k]
      return
    }
    if (typeof local[k] !== typeof other[k]) return
    if (typeof other[k] === 'object') return mergeObject(local[k], other[k])
    if (other[k].constructor === Array) {
      other[k].forEach(ele => {
        if (local[k].indexOf(ele) === -1) local[k].push(ele)
      })
    }
    local[k] = other[k]
  })
  return local
}

const createPath = direc => {
  if (!fs.existsSync(direc)) {
    fs.mkdirSync(direc)
  }
}

const quit = (n) => {
  shell.exit(n)
  process.exit(n)
}

const detectTool = (tool) => {
  if (fs.existsSync(packageLock())) return 'npm'
  if (fs.existsSync(yarnLock())) return 'yarn'
  if (tool.npm) {
    logInfo(`There is nothing to see during installation with npm`)
    return 'npm'
  }
  if (tool.yarn) return 'yarn'
  return 'yarn'
}

const copyConfig = (from, to) => {
  if (!fs.existsSync(to)) {
    shell.cp(from, path.dirname(to))
  }
}

const cpConfig = (from, to) => {
  if (!fs.existsSync(to)) {
    shell.cp(from, to)
  }
}

const filePath = file => path.join(process.cwd(), file)
module.exports = {
  installPackage,
  updatePackageJson,
  createPath,
  readTemplatesJson,
  detectTool,
  packageJson,
  readTemplatesFile,
  templatesFile,
  copyFile,
  copyFolder,
  quit,
  copyConfig,
  cpConfig,
  mergeObject,
  filePath,
  logPrimary,
  logInfo,
  logWarn
}
