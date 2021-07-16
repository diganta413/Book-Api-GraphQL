import './App.css';
import {ApolloClient,ApolloProvider, InMemoryCache,gql} from "@apollo/client";
import BookList from './BookList';

function App() {
  const client = new ApolloClient({
    uri: 'http://127.0.0.1:5000/graphql',
    cache: new InMemoryCache()
  })

  

  return (
    <ApolloProvider client={client}>
        <div className="App">
          <BookList/>
        </div>
    </ApolloProvider>
   
  );
}

export default App;
