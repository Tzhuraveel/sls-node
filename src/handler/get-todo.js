const {dbConnection} = require("../mongo.client");
const {ObjectId} = require("mongodb");


const getTodo = async (event) => {
    try {
        const { todoId } = event.pathParameters

        const todo = await dbConnection.collection("todos").findOne({_id: new ObjectId(todoId)})

        return {
            statusCode: 200,
            body: JSON.stringify(todo)
        };

    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    handler: getTodo
}