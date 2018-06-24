'use strict'

/*
 * This function builds a params object from the parameters passed to it.
 * Either the parameters should be objects or pairs of parameter names
 * and values:
 *
 * buildConfig({ key: 'val' , num: 6 })
 *
 * buildConfig('QueueUrl', queueUrl, 'Num', 7)
 *
 * Note that if param[0] is not a string, everything will be treated as
 * an object, which will cause primitive values to be ignored
 */
function buildConfig(...params) {
  if (params.length === 0) {
    return {}
  }

  if (typeof params[1] !== 'string' && typeof params[1] !== 'number') {
    params = params.filter(item => typeof item === 'object')
    return Object.assign(...params)
  }

  let newParams = {}
  params.forEach((value, idx, array) => {
    if (idx % 2 === 0) {
      return
    }

    newParams[array[idx - 1]] = value
  })

  return newParams
}

module.exports.buildConfig = buildConfig
