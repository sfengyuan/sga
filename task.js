const shell = require('shelljs')
const fs = require('fs')
const {ESLINT, BABEL, MOCHA, JEST, POSTCSS, WEBPACK, VUE, VUEDEV} = require('./constant.js')
const {logInfo, logPrimary, logWarn, filePath, copyConfig, copyFolder, detectTool, packageJson, readTemplatesJson, updatePackageJson, templatesFile, installPackage, quit, createPath} = require('./lib.js')

const addPackage = installPackage(detectTool)

const task = fn => (title, tool) => {
  logPrimary(`Adding ${title}`)
  taskProjectInit('Project init', tool)
  fn(tool)
  logPrimary(`${title} is ready`)
}

const taskEslint = task((tool) => {
  addPackage(ESLINT, tool)
  updatePackageJson(readTemplatesJson('eslint'))
  copyConfig(templatesFile(`eslint/.eslintrc.js`), filePath('.eslintrc.js'))
  logInfo(`Now 'npm/yarn lint' available`)
})

const taskBabel = task((tool) => {
  addPackage(BABEL, tool)
  copyConfig(templatesFile(`babel/.babelrc`), filePath('.babelrc'))
})

const taskMocha = task((tool) => {
  addPackage(MOCHA, tool)
  updatePackageJson(readTemplatesJson('mocha'))
  copyFolder(templatesFile(`mocha/test`), filePath(''))
  logInfo(`Now 'npm/yarn test' available`)
})

const taskJest = task((tool) => {
  addPackage(JEST, tool)
  updatePackageJson(readTemplatesJson('jest'))
  copyFolder(templatesFile(`jest/test`), filePath(''))
  logInfo(`Now 'npm/yarn test' available`)
})

const taskPostcss = task((tool) => {
  addPackage(POSTCSS, tool)
  copyConfig(templatesFile(`postcss/postcss.config.js`), filePath('postcss.config.js'))
})

const taskWebpack = task((tool) => {
  addPackage(WEBPACK, tool)
  copyConfig(templatesFile(`webpack/webpack.config.js`), filePath('webpack.config.js'))
  copyConfig(templatesFile(`webpack/index.html`), filePath('index.html'))
  updatePackageJson(readTemplatesJson('webpack'))
  taskEslint('Eslint', tool)
  taskBabel('Babel', tool)
  taskMocha('Mocha and Chai', tool)
  taskPostcss('Postcss', tool)
  createPath(filePath('test'))
  createPath(filePath('src'))
  logInfo(`Now 'npm/yarn start' available`)
  logInfo(`'npm/yarn dev' available`)
})

const taskVue = task((tool) => {
  addPackage(WEBPACK, tool)
  copyConfig(templatesFile(`vue/webpack.config.js`), filePath('webpack.config.js'))
  copyConfig(templatesFile(`vue/index.html`), filePath('index.html'))
  updatePackageJson(readTemplatesJson('vue'))
  addPackage(VUE, tool, true)
  addPackage(VUEDEV, tool)
  taskEslint('Eslint', tool)
  taskBabel('Babel', tool)
  taskPostcss('Postcss', tool)
  taskJest('Jest', tool)
  createPath(filePath('test'))
  copyFolder(templatesFile(`vue/src`), filePath(''))
  shell.cp('-f', templatesFile(`vue/.eslintrc.js`), filePath('.eslintrc.js'))
  logInfo(`Now 'npm/yarn start' available`)
  logInfo(`'npm/yarn dev' available`)
})

const taskGitInit = task(() => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git')
    quit()
  }
  if (shell.exec('git init').code !== 0) {
    shell.echo('Error: Git init failed')
    quit()
  }
  copyConfig(templatesFile(`git/.gitignore`), filePath('.gitignore'))
  copyConfig(templatesFile(`git/README.md`), filePath('README.md'))
})

const taskProjectInit = (title, possibleTool) => {
  if (fs.existsSync(packageJson())) return
  logInfo(`${title}`)
  let tool = detectTool(possibleTool)
  if (shell.exec(`${tool} init -y`).code !== 0) {
    logWarn(`Run ${tool} init failed.`)
    quit(1)
  }
  updatePackageJson(readTemplatesJson('init'))
  createPath(filePath('src'))
  copyConfig(templatesFile(`main.js`), filePath('src/main.js'))
}

module.exports = {
  taskBabel,
  taskEslint,
  taskGitInit,
  taskJest,
  taskMocha,
  taskPostcss,
  taskProjectInit,
  taskVue,
  taskWebpack
}
