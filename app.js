const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');
const multer = require('multer');
const app= express();
const graphqlSchema = require('./graphql/schema');
const graphqlresolver = require('./graphql/resolvers');

app.use('/graphql',
    graphqlHTTP({
        schema:graphqlSchema,
        rootValue:graphqlresolver,
        graphiql:true,
    })
)

mongoose.connect('mongodb+srv://Fidel_Wole:2ql24UoUi4uN5302@cluster0.cwzz5uc.mongodb.net/graphql').then(()=>{
    app.listen('4000', ()=>{
        console.log('GraphQl Server listening at port 4000')
    })
})
