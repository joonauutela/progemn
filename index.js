const { ApolloServer } = require('apollo-server')
const gql = require('graphql-tag')
const mongoose = require('mongoose');
const resolvers = require('./resolvers/index')
const typeDefs = require('./typeDefs')
require('dotenv').config()

const MONGODB_URI = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.6n5us.mongodb.net/<dbname>?retryWrites=true&w=majority`

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen({ port: 4000 })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })