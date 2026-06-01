import { useState } from 'react'
import { useQuery } from '@apollo/client/react'

const Books = (props) => {
  const [genre, setGenre] = useState(null)

  const { loading, data } = useQuery(props.ALL_BOOKS, {
    variables: genre ? { genre } : {},
    skip: !props.show,
  })

  if (!props.show) {
    return null
  }

  if (loading) return <div>loading...</div>

  const books = data?.allBooks || []

  const allGenres = [...new Set(books.flatMap(book => book.genres || []))]

  return (
    <div>
      <h2>books</h2>

      <div>
        in genre
        <br/>
        <button onClick={() => setGenre(null)}>
          all genres
        </button>
        {allGenres.map(g => (
          <button 
            key={g}
            onClick={() => setGenre(g)}
            style={{ fontWeight: genre === g ? 'bold' : 'normal' }}
          >
            {g}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author?.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
