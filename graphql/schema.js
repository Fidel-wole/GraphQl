const {buildSchema} = require('graphql');

module.exports = buildSchema(
    `
    type Content {
        _id :ID
        userId:String
        content:String
        caption:String
        hashtags:[String]
        category:String
        thumbnailUrl:String
        contentUrl:String
        comments:[Comment]
        createdAt:String
        updatedAt:String
    }

    type Comment{
        comment:String
        userId:String
        timestamp:String
    }
    
    type postData{
        content:[Content!]
    }

    input ContentInput {
        userId:String
        content:String
        caption:String
        hashtags:[String]
        category:String
        thumbnailUrl:String
        contentUrl:String
        comments:[CommentInput]
    }
    input CommentInput{
        comment:String
        userId:String
        contentId:String
    }

type RootQuery{
    hello:String
    getAllContent:postData
    getUserContent(userId: String) : [Content]!
}
scalar Upload

type Mutation{
    createContent(userInput:ContentInput file:Upload): Content!
    postComment(userInput:CommentInput): Content!
}
schema{
    query:RootQuery
    mutation:Mutation
}

    `
);
