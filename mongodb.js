// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id)
// console.log(id.toHexString().length)
// console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    return console.log(err, 'Unable to connect to database!')
  }

  const db = client.db(databaseName)

  // db.collection('users').updateOne({
  //   _id: new ObjectID('5e168782093d393090e67920')
  // }, {
  //   $inc: {
  //     age: 1
  //   }
  // }).then((result) => {
  //   console.log(result)
  // }).catch((error) => {
  //   console.log(error)
  // })

  db.collection('tasks').updateMany({}, {
    $set: {
      complete: true
    }
  }).then((result) => {
    console.log(result)
  }).catch((error) => {
    console.log(error)
  })
  // db.collection('users').findOne({ _id: ObjectID('5e168ff597e3bb4db017b37b') }, (error, user) => {
  //   if (error) return console.log('Unable to fetcnew h')

  //   console.log(user)
  // })

  // db.collection('users').findOne({ name: 'Auguste' }, (error, user) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(user)
  // })

  // db.collection('users').find({ age: 40 }).toArray((error, users) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(users)
  // })

  // db.collection('users').find({ age: 40 }).count((error, count) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(count)
  // })

  // db.collection('tasks').findOne({ _id: ObjectID('5e1692162e07a35f682673e7') }, (error, task) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(task)
  // })

  // db.collection('tasks').find({ complete: true }).toArray((error, tasks) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(tasks)
  // })

  // db.collection('tasks').find({ complete: true }).count((error, count) => {
  //   if (error) return console.log('Unable to fetch document')

  //   console.log(count)
  // })
})
