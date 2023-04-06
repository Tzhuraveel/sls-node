const {dbConnection} = require("../mongo.client");


const createTodo = async (event) => {
    try {
        const {todo} = JSON.parse(event.body)

        const date = new Date().toISOString()

        const newTodo = {
            todo,
            createdAt: date,
            updatedAt: date,
            completed: false,
        }

        await dbConnection.collection("todos").insertOne(newTodo);

        return {
            statusCode: 201,
            body: JSON.stringify("Created")
        };

    } catch (e) {
        console.log(e)
    }
};

module.exports = {
    handler: createTodo
}