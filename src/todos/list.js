const { dynamoDbClient } = require("../libs/dynamodb");

async function list(event, context, callback) {
  const { pathParameters } = event;

  const user_id = pathParameters["userId"];

  const dynamoResponse = await dynamoDbClient
    .query({
      TableName: "todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": user_id,
      },
    })
    .promise();

  const todos = dynamoResponse.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify({ todos }),
  };

  return callback(null, response);
}

export const handler = list;
