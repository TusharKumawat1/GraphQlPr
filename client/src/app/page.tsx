"use client";
import React, { useState } from "react";
import Typewriter from "typewriter-effect";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
  cache: new InMemoryCache(),
});

export default function page() {
  const [userId, setuserId] = useState<number>(0);
  interface resData {
    quote: string;
    author: number;
  }
  const [response, setResponse] = useState<resData>();
  async function generateQuote() {
    const { data, loading } = await client.query({
      query: gql`
        query QueryForRandomQuote {
          getRandomQuote {
            quote
            author
          }
        }
      `,
    });
    setResponse((p) => data.getRandomQuote);
  }
  return (
    <div className=" flex w-screen h-screen justify-center items-center font-sans flex-col gap-10">
      {response && (
        <div className=" text-[50px] font-bold">
          <Typewriter
            options={{
              strings: [`${response.quote} - ${response.author}`],
              autoStart: true,
              loop: false,
              deleteSpeed: 2,
              delay: 40,
            }}
          />
        </div>
      )}
      <h1 className=" text-[50px] font-bold">Generate a Quote 🐥</h1>
      <button
        type="button"
        className="p-5  border-gray-400 font-sans font-bold text-white bg-green-500 border-none rounded-md focus:outline-none  text-[20px] hover:bg-red-400 transition-all duration-500 ease-in-out"
        onClick={generateQuote}
      >
        generate
      </button>
    </div>
  );
}
