import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient } from "@apollo/client";
//import { InMemoryCache } from "apollo-cache-inmemory";
import { InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client/link/http";
import { ApolloProvider } from "@apollo/react-hooks";
import { AuthProvider } from "./context/auth";
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href =
  "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = localStorage.getItem("jwtToken");

  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
