const { MongoClient } = require("mongodb")
const { ObjectID } = require("mongodb")
const config = {
  url: process.env.MONGODB,
  dbName: "ReactTodo",
}

async function createConnection() {
  const connection = await MongoClient.connect(config.url, {
    useNewUrlParser: true,
  })
  const db = connection.db(config.dbName)
  return {
    connection,
    db,
  }
}

module.exports = async function (context, req) {
  const { _id } = req.params
  const todo = req.body || {}

  if (!_id || !todo) {
    context.res = {
      status: 400,
      body: "Fields are required",
    }
    return
  }

  const { db, connection } = await createConnection()
  const Todos = db.collection("todo")

  try {
    const todos = await Todos.findOneAndUpdate({ _id: ObjectID(_id) }, { $set: todo })

    connection.close()

    context.res = {
      status: 200,
      body: todo,
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error updating a todo item",
    }
  }
}
