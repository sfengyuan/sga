const expect = require('chai').expect
const {mergeObject} = require('../lib.js')

describe('lib.js', () => {
  describe('mergePackageJson', () => {
    const local = {
      a: {
        aa: 'aa'
      },
      b: 'b',
      c: {
        c: 'c',
        e: 'e'
      }
    }

    it('should merge other to local (different type keys should not touch)', () => {
      const other = {
        a: 'a',
        aa: {
          aaa: 'aaaa'
        },
        c: {
          c: 'c',
          d: 'd'
        }
      }
      const result = {
        a: {
          aa: 'aa'
        },
        aa: {
          aaa: 'aaaa'
        },
        b: 'b',
        c: {
          c: 'c',
          d: 'd',
          e: 'e'
        }
      }
      expect(mergeObject(local, other)).to.deep.equal(result)
    })
  })
})

describe('Greeting!', () => {
  describe('Hi', () => {
    it('should be removed to pass', () => {
      expect(false, 'Please fix me??').to.equal(true)
    })
  })
})
