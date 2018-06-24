'use strict'

const { describe, it } = require('mocha')
const chai = require('chai')
const { expect } = chai
// chai.use(require('chai-as-promised'))
// const sinon = require('sinon')

const buildConfig = require('../../src/utils').buildConfig

describe('utils.js', function() {
  describe('buildConfig(...params)', function() {
    it('Tests that if params[0] === undefined, then it returns an empty object', function() {
      expect(buildConfig()).to.deep.equal({})
    })

    it('Tests that object as params[0] returns that object', function() {
      const val = { x: 'a', y: 'b' }
      expect(buildConfig(val)).to.deep.equal(val)
    })

    it('Tests that multiple object params returns those objects assigned', function() {
      const val1 = { x: 'a', y: 'b' }
      const val2 = { a: 'x', b: 'y' }
      expect(buildConfig(val1, val2)).to.deep.equal(Object.assign(val1, val2))
    })

    it('Tests that multiple object params returns those objects assigned', function() {
      const val1 = { x: 'a', y: 'b', z: 'c' }
      const val2 = { x: 'x', y: 'y' }
      expect(buildConfig(val1, val2, 3)).to.deep.equal(Object.assign(val1, val2))
    })

    it('Tests that primitives are ignored in the object array', function() {
      const val1 = { x: 'a', y: 'b', z: 'c' }
      const val2 = { x: 'x', y: 'y' }
      expect(buildConfig(5, val1, 'dummy', false, val2, 3)).to.deep.equal(Object.assign(val1, val2))
    })

    it('Tests that params[0] as a string creates object from strings', function() {
      expect(buildConfig('x', 'a', 'y', 'b')).to.deep.equal({ x: 'a', y: 'b' })
    })
  })
})
