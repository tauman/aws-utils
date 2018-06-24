'use strict'

const AWS = require('aws-sdk')
const buildConfig = require('./utils').buildConfig


/*
 * Variadic Function:
 * addPermission(options, queueUrl, label, awsAccountIds, actionNames)
 * addPermission(options, params)
 */
async function addPermission(options, queueUrl, label, awsAccountIds, actionNames) {
  const params = buildConfig('QueueUrl', queueUrl, 'Label', label, 'AWSAccountIds', awsAccountIds, 'Actions', actionNames)
  const sqs = new AWS.SQS(options)
  await sqs.addPermission(params).promise()
}

/*
 * Variadic Function:
 * removePermission(options, queueUrl, label)
 * removePermission(options, params)
 */
async function removePermission(options, queueUrl, label) {
  const params = buildConfig('QueueUrl', queueUrl, 'Label', label)
  const sqs = new AWS.SQS(options)
  await sqs.removePermission(params).promise()
}

/*
 * Variadic Function:
 * listQueues(options, queueNamePrefix)
 * listQueues(options, params)
 */
async function listQueues(options, queueNamePrefix) {
  const params = buildConfig('QueueNamePrefix', queueNamePrefix)
  const sqs = new AWS.SQS(options)
  const response = await sqs.listQueues(params).promise()

  return response.QueueUrls || []
}

/*
 * Variadic Function:
 * purgeQueue(options, queueUrl)
 * purgeQueue(options, params)
 */
async function purgeQueue(options, queueUrl) {
  const params = buildConfig('QueueUrl', queueUrl)
  const sqs = new AWS.SQS(options)
  await sqs.purgeQueue(params).promise()
}

/*
 * Variadic Function:
 * deleteMessage(options, queueUrl, receiptHandle)
 * deleteMessage(options, params)
 */
async function deleteMessage(options, queueUrl, receiptHandle) {
  const params = buildConfig('QueueUrl', queueUrl, 'ReceiptHandle', receiptHandle)
  const sqs = new AWS.SQS(options)
  await sqs.deleteMessage(params).promise()
}

/*
 * Variadic Function:
 * sendMessage(options, queueUrl, messageBody)
 * sendMessage(options, params)
 */
async function sendMessage(options, queueUrl, messageBody) {
  const params = buildConfig('QueueUrl', queueUrl, 'MessageBody', messageBody)
  const sqs = new AWS.SQS(options)
  await sqs.sendMessage(params).promise()
}

/*
 * Variadic Function:
 * receiveMessages(options, queueUrl, maxNumberOfMessages = 1)
 * receiveMessages(options, params)
 */
async function receiveMessages(options, queueUrl, maxNumberOfMessages = 1) {
  const params = buildConfig('QueueUrl', queueUrl, 'MaxNumberOfMessages', maxNumberOfMessages)
  const sqs = new AWS.SQS(options)
  const response = await sqs.receiveMessage(params).promise()

  return response.Messages || []
}

/*
 * Variadic Function:
 * createQueue(options, queueName)
 * createQueue(options, params)
 */
async function createQueue(options, queueName) {
  const params = buildConfig('QueueName', queueName)
  const sqs = new AWS.SQS(options)
  const response = await sqs.createQueue(params).promise()

  return response.QueueUrl
}

/*
 * Variadic Function:
 * createQueue(options, queueUrl)
 * createQueue(options, params)
 */
async function deleteQueue(options, queueUrl) {
  const params = buildConfig('QueueUrl', queueUrl)
  const sqs = new AWS.SQS(options)
  await sqs.deleteQueue(params).promise()
}


let options = {
  apiVersion: '2012-11-05',
  region: 'us-east-1',
  credentials: new AWS.SharedIniFileCredentials({ profile: 'tauman' })
}

const queueUrl = 'https://sqs.us-east-1.amazonaws.com/472056846437/queue-3'
// const receiptHandle = 'AQEB8m9fgmg+KLYdPRGIJAFPkZiU8s7Uu3etdnOCZDcYZsVM2cm2TzQi4AuwwvYlRr7VfjCKhjwGTp7C704gZMeP8ATIk4SKIvh3I6w19DPCnwvqOSdMiNla5P3Zh85gn2/aOgOPi/6/TvjW/PNlZb8SDnTSXMxVtpVcZ66K1JOINhPHxmrl1gjUw8gJ2Bt4JxzAdFEpk2tqRTKz9uChfpphFYoLlAsjHL32POFFW+B+AYXyXZijY0yl/uuJ3DrzmH1Zu2Z3L/4UnJ+RPzdYPLrTMkoGGCnYsAYV+SW0wpLyYEOB3BnDq1SfDvTvOAFeSLaLvmgTR+M4K/cCX2TbwbpS7VVzABKpVwlPV+ciDpk3SZARGQtFvQ0VCKTFzCAK6+Dx'

// sendMessage(options, queueUrl, 'TEST MESSAGE').then(r => console.log(r)).catch(e => console.log(e))
// deleteMessage(options, queueUrl, receiptHandle).then(r => console.log(r)).catch(e => console.log(e))
receiveMessages(options, queueUrl, 4).then(r => console.log(r)).catch(e => console.log(e))
// receiveMessages(options, { QueueUrl: queueUrl, MaxNumberOfMessages: 4 }).then(r => console.log(r)).catch(e => console.log(e))
// purgeQueue(options, queueUrl).then(r => console.log(r)).catch(e => console.log(e))
// createQueue(options, 'TEST-QUEUE').then(r => console.log(r)).catch(e => console.log(e))
// deleteQueue(options, 'https://sqs.us-east-1.amazonaws.com/472056846437/TEST-QUEUE').then(r => console.log(r)).catch(e => console.log(e))
// listQueues(options, queueNamePrefix)


module.exports.addPermission = addPermission
module.exports.removePermission = removePermission
module.exports.createQueue = createQueue
module.exports.deleteQueue = deleteQueue
module.exports.listQueues = listQueues
module.exports.purgeQueue = purgeQueue
module.exports.sendMessage = sendMessage
module.exports.deleteMessage = deleteMessage
module.exports.receiveMessages = receiveMessages
