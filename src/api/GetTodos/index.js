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

module.exports = async (context) => {
  const { db, connection } = await createConnection()
  const Todos = db.collection("todo")
  const res = await Todos.find({})
  const body = await res.toArray()
  connection.close()

  context.res = {
    status: 200,
    body,
  }
}
