import { useState } from "react"
import { useMutation } from "@apollo/client/react"

const Authors = (props) => {
  if (!props.show) {
    return null
  }
  const authors = props.allAuthors.data.allAuthors

  const [authName, setAuthName] = useState('')
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(props.EDIT_AUTHOR, {
    onError: (error) => props.notify(error.message),
    refetchQueries: [{ query: props.ALL_AUTHORS }],
    awaitRefetchQueries: true
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({variables: {name: authName, setBornTo: parseInt(born)}})

    setAuthName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {props.token &&
      <>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label>
          name
          <select
            name="name"
            value={authName}
            onChange={({ target }) => setAuthName(target.value)}
          >
            <option value="">Select an author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <br/>
        <label>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </label>
        <br/>
        <button type="submit">update author</button>
      </form>
      </>
      }
    </div>
  )
}

export default Authors
