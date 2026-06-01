import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { LOGIN } from '../queries'

const Login = ({ show, setError, setToken, setPage, client, ME }) => {
  if (!show) {
    return null
  }
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN, {
    onCompleted: (data) => {
      const token = data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
      if (client && ME) {
        client.refetchQueries({ include: [ME] })
      }
      setError('login successful')
    },
    onError: (error) => {
      setError(error.message)
    }
  })

  const submit = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setPage('authors')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <label>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
        <br/>
        <label>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login