const { MongoClient } = require("mongodb")
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
  const todo = req.body || {}

  if (todo) {
    context.res = {
      status: 400,
      body: "todo item data is required! ",
    }
  }

  const { db, connection } = await createConnection()

  const Todos = db.collection("todo")

  try {
    const todos = await Todos.insert(todo)
    connection.close()

    context.res = {
      status: 201,
      body: todos.ops[0],
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error creating a new todo item",
    }
  }
}
