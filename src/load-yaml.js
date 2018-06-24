'use strict'

const promisify = require('util').promisify
const fs = require('fs')
const yaml = require('js-yaml')


/*
 * Load the yaml file asynchronously, resolving when loading
 * is complete, or rejecting if the file fails to load.
 */
async function loadYaml(filename) {
  const readFile = promisify(fs.readFile)
  return yaml.load(await readFile(filename))
}


/*
 * Load the yaml file synchronously, returning the object when loading
 * is complete, or throwing an exception if the file fails to load.
 */
function loadYamlSync(filename) {
  return yaml.load(fs.readFileSync(filename, 'utf8'))
}


module.exports.loadYaml = loadYaml
module.exports.loadYamlSync = loadYamlSync
