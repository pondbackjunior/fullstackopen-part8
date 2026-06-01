import { useState } from 'react'
import { useMutation } from '@apollo/client/react'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(props.CREATE_BOOK, {
    refetchQueries: [{query: props.ALL_BOOKS}],
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({variables: {title, author, published: parseInt(published), genres}})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
        <br/>
        <label>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
        <br/>
        <label>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </label>
        <br/>
        <label>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </label>
        <br/>
        <label>genres: {genres.join(' ')}</label>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
