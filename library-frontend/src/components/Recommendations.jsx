import { useQuery } from '@apollo/client/react'

const Recommendations = (props) => {
  if (!props.show) {
    return null
  }

  const currentUserGenre = props.currentUser.data?.me?.favoriteGenre

  const { loading, data } = useQuery(props.ALL_BOOKS, {
    variables: currentUserGenre ? { genre: currentUserGenre } : {},
    skip: !currentUserGenre,
  })

  if (loading) return <div>loading...</div>

  const books = data?.allBooks || []

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <b>{currentUserGenre}</b>
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

export default Recommendations