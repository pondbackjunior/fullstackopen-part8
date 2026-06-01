import { useState } from 'react'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'

import { gql } from '@apollo/client'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { EDIT_AUTHOR } from './queries'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      published
      author {
        name
      }
      id
      genres
    }  
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('user-token'))

  const allAuthors = useQuery(ALL_AUTHORS)
  const client = useApolloClient()
  const currentUser = useQuery(ME)

  if (allAuthors.loading || currentUser.loading) {
    return <div>loading...</div>
  }

  const onLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={onLogout}>logout</button>}
      </div>

      <Authors allAuthors={allAuthors} ALL_AUTHORS={ALL_AUTHORS} EDIT_AUTHOR={EDIT_AUTHOR} show={page === 'authors'} token={token} notify={notify}/>

      <Books ALL_BOOKS={ALL_BOOKS} show={page === 'books'} />

      <NewBook CREATE_BOOK={CREATE_BOOK} ALL_BOOKS={ALL_BOOKS} show={page === 'add'} notify={notify}/>

      <Recommendations currentUser={currentUser} ALL_BOOKS={ALL_BOOKS} show={page === 'recommendations'} />

      <Login setToken={setToken} setError={notify} show={page === 'login'} setPage={setPage} client={client} ME={ME}/>
    </div>
  )
}

export default App
