const {dbConnection} = require("../mongo.client");


const getTodos = async () => {
  try {
    const todos = await dbConnection.collection("todos").find({}).toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(todos)
    };

  } catch (e) {
    console.log(e)
  }
};

module.exports = {
  handler: getTodos
}