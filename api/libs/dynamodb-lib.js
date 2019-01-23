import AWS from 'aws-sdk';

// eslint-disable-next-line import/prefer-default-export
export function call(action, params) {
  const dynamoDb = new AWS.DynamoDB.DocumentClient();

  return dynamoDb[action](params).promise();
}
