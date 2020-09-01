const createMongoClient = require("../../shared/mongo")
module.exports = async (context) => {
  const { db, connection } = await createMongoClient()

  const Todos = db.collection("todo")
  const res = await Todos.find({})
  const body = await res.toArray()

  connection.close()

  context.res = {
    status: 200,
    body,
  }
}
