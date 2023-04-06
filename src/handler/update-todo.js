const {dbConnection} = require("../mongo.client");

const {ObjectId} = require("mongodb");


const updateTodo = async (event) => {
    try {
        const { completed } = JSON.parse(event.body)
        const { todoId } = event.pathParameters

        const todo = await dbConnection.collection("todos").findOne({_id: new ObjectId(todoId)})

        if(!todo) return { statusCode: 422, body: "Entity not found" }


        await dbConnection.collection("todos").updateOne({_id: todo._id}, {$set: {completed, updatedAt: new Date().toISOString()}})

        return {
            statusCode: 200,
            body: JSON.stringify("Updated")
        };

    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    handler: updateTodo
}