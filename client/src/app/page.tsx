"use client"
import React, { useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, gql,useQuery } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  cache: new InMemoryCache(),
});

export default function page() {
  async function runQuery(){
    const {data,loading}=await client.query({query:gql`
    query QueryForQuotes {
      getQuotes {
        quotes {
          quote
          author
        }
      }
    }
    `})
    if (loading) {
      return <h1>loading...</h1>
    }else{
      console.log(data)
    }
  }
  useEffect(() => {
    runQuery()
   }, [])
  return (
    <div className=' flex w-screen h-screen justify-center items-center'>
    <h1 className=' text-[50px] font-bold'>Check out the console baby</h1>
    </div>
  )
}
