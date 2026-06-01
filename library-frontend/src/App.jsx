import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
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
  query {
    allBooks {
      title
      author
      published
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
      author
      id
      genres
    }  
  }
`

const App = () => {
  const [page, setPage] = useState('authors')

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  if (allAuthors.loading || allBooks.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors allAuthors={allAuthors} ALL_AUTHORS={ALL_AUTHORS} EDIT_AUTHOR={EDIT_AUTHOR} show={page === 'authors'} />

      <Books allBooks={allBooks} show={page === 'books'} />

      <NewBook CREATE_BOOK={CREATE_BOOK} ALL_BOOKS={ALL_BOOKS} show={page === 'add'} />
    </div>
  )
}

export default App
