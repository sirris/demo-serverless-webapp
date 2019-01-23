/* eslint-disable import/prefer-default-export */
import uuid from 'uuid';
import * as DynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

// eslint-disable-next-line no-unused-vars
export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    },
  };

  try {
    await DynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
