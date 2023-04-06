const {dbConnection} = require("../mongo.client");

const {ObjectId} = require("mongodb");


const deleteTodo = async (event) => {
    try {
        const { todoId } = event.pathParameters

        const todo = await dbConnection.collection("todos").findOne({_id: new ObjectId(todoId)})

        if(!todo) return { statusCode: 422, body: "Entity not found" }


        await dbConnection.collection("todos").deleteOne({_id: todo._id})

        return {
            statusCode: 204,
        };

    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    handler: deleteTodo
}