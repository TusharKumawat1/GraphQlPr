import express from "express";
import cors from "cors";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
async function connection(){
    const app=express();
    app.use(cors());
    app.use(express.json());
    const server=new ApolloServer({
        typeDefs: `
        type Test{  
            id:ID!
            title : String
        }
        type Query {
            callTest:[Test]
        }
        `,
        resolvers:{
            Query :{
                callTest: ()=>[{id:999,title:"hello graphQl"}]
            }
        },
    });
    await server.start();
    app.use("/graphql",expressMiddleware(server));
    app.listen(8000,()=>console.log("server started at port 8000"))
}
connection();