import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const loggedAuthorJSON = window.localStorage.getItem('loggedMerchant')
  const result = JSON.parse(loggedAuthorJSON)
  return {
    headers: {      
      ...headers,      
      Authorization: result ? `Bearer ${result.token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'https://api.aicpass.com/v1/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);