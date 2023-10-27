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
        type Test {
            id: ID!
            title: String
            todos: [Todo]
          }
          
          type Todo {
            id: ID!
            todo: String
            completed: Boolean
            userId: ID
          }
          type Quotes{
            quotes:[quote]
          }
          type quote{
            id:ID
            quote:String
            author:String
          }
        type Query {
            callTest:Test
            getQuotes: Quotes
        }
        `,
        resolvers:{
            Query :{
                callTest: async()=>{
                    const data=await fetch('https://dummyjson.com/todos')
                    const res=await data.json()
                 return res
                },
                getQuotes:async()=>{
                    const data=await fetch('https://dummyjson.com/quotes/')
                    const res=await data.json()
                 return res
                }
            }
        },
    });
    await server.start();
    app.use("/graphql",expressMiddleware(server));
    app.listen(8000,()=>console.log("server started at port 8000"))
}
connection();