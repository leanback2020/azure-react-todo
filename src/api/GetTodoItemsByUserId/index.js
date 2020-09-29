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

module.exports = async (context, req) => {
  const { db, connection } = await createConnection()

  const { id } = req.params

  if (!id) {
    context.res = {
      status: 400,
      body: "Please enter the correct user id!",
    }

    return
  }
  const Todos = db.collection("todo")
  //  const body = await Todos.fin findOne({ _id: ObjectID(id) })
  const res = await Todos.find({ userid: id })
  const body = await res.toArray()
  connection.close()

  context.res = {
    status: 200,
    body,
  }
}
