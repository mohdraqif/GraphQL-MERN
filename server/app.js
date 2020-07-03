const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');

// allow cross-origin requests
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, 
  { useUnifiedTopology: true, useNewUrlParser: true })

mongoose.connection.once('open', () => {
  console.log('MongoDB Connected!')
})

// middleware to use Graphiql in between the requests
app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('Listening on port 4000')
})