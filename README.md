# Sga

Project generator with one command.

This tool will not only generate skeletons, but also **install packages**.

It can add Eslint, Babel, Mocha and Chai, Jest seperatly, or a complete webpack project, or a vue-webpack project.

When you run `sga -g`, it will run `git init`, add a `.gitignore` and `README.md` for you.

## Install

```shell
npm install -g sga
//或者
yarn global add sga
```

## 使用

There is only one command: sga, task is specified by options.

### Examples

`sga -e`

If the current directory is not initialized, it will initialize it first, then add `eslint`, since there is no package lock and `-n` (use npm) or `-y` (use yarn), it will use `yarn`
It will also add `lint` scripts to package.json.

`sga -b`

Since there is a `yarn.lock`, it will use `yarn` to add `babel`.

`sga -nm`

`-n` (use npm) will be omitted, since there is `yarn.lock`, it will add `mock` and `chai`, and a `test` scripts.

#### Generate a webpack with vue project

**This will add all stuff, so don't run this if `eslint` or other packages are installed already.**

`sga -v`

Now `yarn start` and `yarn dev` are available. Or `npm run start` and `npm run dev`

#### Generate a webpack project

**This will add all stuff, so don't run this if `eslint` or other packages are installed already.**
And you can not add `vue` later, cuz that option will add all stuff.

`sga -w`

Now `yarn start` and `yarn dev` are available. Or `npm run start` and `npm run dev`

### All options

```shell
    -V, --version  output the version number
    -n, --npm      Use npm this time.
    -y, --yarn     Use yarn this time.
    -i, --init     npm/yarn init.
    -g, --git      Git init.
    -e, --eslint   Add eslint
    -b, --babel    Add babel (module is false).
    -m, --mocha    Add mocha and chai.
    -v, --vue      Add a vue and webpack project.
    -w, --webpack  Add a webpack project.
    -j, --jest     Add jest.
    -h, --help     output usage information
```

### npm or yarn

The tool will first try to locate the package lock file under the current directory, if there isn't,
it would check `-n` and `-y`, if both of them are not specified, it would use `yarn`.

## License

MIT
