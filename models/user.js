const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/users', (err, client) => {
  if (err) throw err

  const db = client.db('users')

  db.collection('user').find().toArray((err, result) => {
    if (err) throw err
    console.log(result)
  })
});

var Schema = mongoose.Schema;

var UserModelSchema = new Schema({
  email: String,
  name: String,
  phone: String,
  description: String,
});

// Compile model from schema
var SomeModel = mongoose.model('UserModel', UserModelSchema);
