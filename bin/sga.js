#!/usr/bin/env node
const program = require('commander')
const { taskBabel, taskEslint, taskGitInit, taskJest, taskMocha, taskProjectInit, taskVue, taskWebpack } = require('../task.js')
program
  .version('1.0.0')
  .option('-n, --npm', 'Use npm this time.')
  .option('-y, --yarn', 'Use yarn this time.')
  .option('-i, --init', 'npm/yarn init.')
  .option('-g, --git', 'Git init.')
  .option('-e, --eslint', 'Add eslint')
  .option('-b, --babel', 'Add babel (module is false).')
  .option('-m, --mocha', 'Add mocha and chai.')
  .option('-v, --vue', 'Add a vue and webpack project.')
  .option('-w, --webpack', 'Add a webpack project.')
  .option('-j, --jest', 'Add jest.')
  .parse(process.argv)

const tool = {
  yarn: undefined,
  npm: undefined
}
if (program.npm) tool.npm = true
if (program.yarn) tool.yarn = true
if (program.init) taskProjectInit('Project init', tool)
if (program.git) taskGitInit('Git init')
if (program.webpack) taskWebpack('Webpack', tool)
if (program.vue) taskVue('Vue', tool)
if (program.eslint) taskEslint('Eslint', tool)
if (program.jest) taskJest('Jest', tool)
if (program.babel) taskBabel('Babel', tool)
if (program.mocha) taskMocha('Mocha and Chai', tool)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}
