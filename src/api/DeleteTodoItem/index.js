const { ObjectID } = require("mongodb")
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
  const { _id } = req.params

  if (!_id) {
    context.res = {
      status: 400,
      body: "The fields are required!",
    }
    return
  }

  const { db, connection } = await createConnection()
  const Todos = db.collection("todo")

  try {
    await Todos.findOneAndDelete({ _id: ObjectID(_id) })
    connection.close()
    context.res = {
      status: 204,
      body: "Todo Item deleted successfully!",
    }
  } catch (error) {
    context.res = {
      status: 500,
      body: "Error Deleting Todo Item" + _id,
    }
  }
}
