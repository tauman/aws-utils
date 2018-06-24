'use strict'

const AWS = require('aws-sdk')
const buildConfig = require('./utils').buildConfig


/*
 * Variadic Function:
 * addPermission(options, topicArn, label, awsAccountIds, actionNames)
 * addPermission(options, params)
 */
async function addPermission(options, topicArn, label, awsAccountIds, actionNames) {
  const params = buildConfig('TopicArn', topicArn, 'Label', label, 'AWSAccountId', awsAccountIds, 'ActionName', actionNames)
  const sns = new AWS.SNS(options)
  await sns.addPermission(params).promise()
}

/*
 * Variadic Function:
 * removePermission(options, topicArn, label)
 * removePermission(options, params)
 */
async function removePermission(options, topicArn, label) {
  const params = buildConfig('TopicArn', topicArn, 'Label', label)
  const sns = new AWS.SNS(options)
  await sns.removePermission(params).promise()
}

/*
 * Variadic Function:
 * createTopic(options, name)
 * createTopic(options, params)
 */
async function createTopic(options, name) {
  const params = buildConfig('Name', name)
  const sns = new AWS.SNS(options)
  let response = await sns.createTopic(params).promise()

  return response.TopicArn
}

/*
 * Variadic Function:
 * deleteTopic(options, topicArn)
 * deleteTopic(options, params)
 */
async function deleteTopic(options, topicArn) {
  const params = buildConfig('TopicArn', topicArn)
  const sns = new AWS.SNS(options)
  await sns.deleteTopic(params).promise()
}

/*
 * Variadic Function:
 * listSubscriptions(options)
 * listSubscriptions(options, params)
 */
async function listSubscriptions(options, params) {
  const sns = new AWS.SNS(options)

  params = params || {}
  let accumulatedSubscriptions = []
  if (params.accumulatedSubscriptions) {
    accumulatedSubscriptions = params.accumulatedSubscriptions
    delete params.accumulatedSubscriptions
  }

  let response = await sns.listSubscriptions(params).promise()
  accumulatedSubscriptions = accumulatedSubscriptions.concat(response.Subscriptions)
  if (response.NextToken) {
    params.accumulatedSubscriptions = accumulatedSubscriptions
    params.NextToken = response.NextToken
    return await listSubscriptions(options, params)
  }

  return accumulatedSubscriptions
}

/*
 * Variadic Function:
 * listSubscriptionsByTopic(options, topicArn)
 * listSubscriptionsByTopic(options, params)
 */
async function listSubscriptionsByTopic(options, topicArn) {
  const sns = new AWS.SNS(options)

  let params = buildConfig('TopicArn', topicArn)
  let accumulatedSubscriptions = []
  if (params.accumulatedSubscriptions) {
    accumulatedSubscriptions = params.accumulatedSubscriptions
    delete params.accumulatedSubscriptions
  }

  let response = await sns.listSubscriptionsByTopic(params).promise()
  accumulatedSubscriptions = accumulatedSubscriptions.concat(response.Subscriptions)
  if (response.NextToken) {
    params.accumulatedSubscriptions = accumulatedSubscriptions
    params.NextToken = response.NextToken
    return await listSubscriptionsByTopic(options, params)
  }

  return accumulatedSubscriptions
}

/*
 * Variadic Function:
 * listTopics(options)
 * listTopics(options, params)
 */
async function listTopics(options, params) {
  const sns = new AWS.SNS(options)

  params = params || {}
  let accumulatedTopics = []
  if (params.accumulatedTopics) {
    accumulatedTopics = params.accumulatedTopics
    delete params.accumulatedTopics
  }

  let response = await sns.listTopics(params).promise()
  accumulatedTopics = accumulatedTopics.concat(response.Topics)
  if (response.NextToken) {
    params.accumulatedTopics = accumulatedTopics
    params.NextToken = response.NextToken
    return await listTopics(options, params)
  }

  return accumulatedTopics
}

/*
 * Variadic Function:
 * deleteTopic(options, topicArn, message)
 * deleteTopic(options, params)
 */
async function publish(options, topicArn, message) {
  const params = buildConfig('TopicArn', topicArn, 'Message', message)
  const sns = new AWS.SNS(options)
  await sns.publish(params).promise()
}

/*
 * Variadic Function:
 * subscribe(options, topicArn)
 * subscribe(options, params)
 */
async function subscribe(options, topicArn) {
  const params = buildConfig('TopicArn', topicArn)
  const sns = new AWS.SNS(options)
  let response = await sns.subscribe(params).promise()

  return response.SubscriptionArn
}

/*
 * Variadic Function:
 * unsubscribe(options, subscriptionArn)
 * unsubscribe(options, params)
 */
async function unsubscribe(options, protocol, subscriptionArn) {
  const params = buildConfig('Protocol', protocol, 'SubscriptionArn', subscriptionArn)
  const sns = new AWS.SNS(options)
  await sns.unsubscribe(params).promise()
}



let options = {
  apiVersion: '2012-11-05',
  region: 'us-east-1',
  // credentials: new AWS.SharedIniFileCredentials({ profile: 'tauman' })
  credentials: new AWS.SharedIniFileCredentials({ profile: 'marozzo' })
}

const topicArn = 'arn:aws:sns:us-east-1:609275158738:TEST-TOPIC'
//
// createTopic(options, 'TEST-TOPIC').then(r => console.log(r)).catch(e => console.log(e))
// deleteTopic(options, topicArn).then(r => console.log(r)).catch(e => console.log(e))
publish(options, topicArn, 'TEST MESSAGE').then(r => console.log(r)).catch(e => console.log(e))
// subscribe(options, topicArn).then(r => console.log(r)).catch(e => console.log(e))
// unsubscribe(options, subscriptionArn).then(r => console.log(r)).catch(e => console.log(e))
// listTopics(options).then(r => console.log(r)).catch(e => console.log(e))
// listSubscriptions(options).then(r => console.log(r)).catch(e => console.log(e))
// listSubscriptionsByTopic(options, 'arn:aws:sns:us-east-1:609275158738:topic-3').then(r => console.log(r)).catch(e => console.log(e))

module.exports.addPermission = addPermission
module.exports.removePermission = removePermission
module.exports.createTopic = createTopic
module.exports.deleteTopic = deleteTopic
module.exports.listSubscriptions = listSubscriptions
module.exports.listSubscriptionsByTopic = listSubscriptionsByTopic
module.exports.listTopics = listTopics
module.exports.publish = publish
module.exports.subscribe = subscribe
module.exports.unsubscribe = unsubscribe
