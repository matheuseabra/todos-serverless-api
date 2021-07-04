require("dotenv").config();
const { DynamoDB } = require("aws-sdk");

const options = {
  region: "us-east-1",
  endpoint: "http://localhost:8000",
};

const isOffline = () => process.env.IS_OFFLINE;

export const dynamoDbClient = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();
