const { dynamoDbClient } = require("../libs/dynamodb");
const { v4 } = require("uuid");

async function create(event, context, callback) {
  const { pathParameters, body } = event;

  const user_id = pathParameters["userId"];

  const { title, deadline } = await JSON.parse(body);

  const todo = {
    id: v4(),
    user_id,
    title,
    done: false,
    deadline: new Date(deadline),
  };

  await dynamoDbClient
    .put({
      TableName: "todos",
      Item: todo,
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Todo created successfully" }),
  };
}

export const handler = create;
