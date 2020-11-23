import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Container, Alert, Button, Form } from 'react-bootstrap'
import { isEmptyString } from '../utils'
import { CALL_API } from '../apis/interface'
import { LOGIN_SUCCESS, LOCAL_STORAGE_KEY } from '../contexts/constants'

const Login = ({ dispatch }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleInputChange = (e, type) => {
    type === 'email' ? setEmail(e.target.value) : setPassword(e.target.value)
  }

  // Login by input account / password
  const handleLoginSubmit = () => {
    if (isEmptyString(email) || isEmptyString(password)) return

    CALL_API.LOGIN({ email, password })
      .then((data) => {
        dispatch({ type: LOGIN_SUCCESS, payload: data })
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      })
      .catch(() => setError(true))
  }

  // Login by default testing account
  const handleTestingLogin = (type) => {
    let email = ''
    let password = ''

    if (type === 'admin') {
      email = 'admin@test.com'
      password = '3#3r2fE'
    } else {
      email = 'user1@test.com'
      password = 'wefD1@3*'
    }

    CALL_API.LOGIN({ email, password })
      .then((data) => {
        dispatch({ type: LOGIN_SUCCESS, payload: data })
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      })
      .catch(() => setError(true))
  }

  return (
    <Container className="login_form">
      <Form>
        <Alert variant="warning">Please Login</Alert>
        {error && <Alert variant="danger">Please check email / password and your account is active</Alert>}
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => handleInputChange(e, 'email')} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => handleInputChange(e, 'password')} />
        </Form.Group>
        <Button block variant="primary" type="button" onClick={handleLoginSubmit}>
          Login
        </Button>
        <Form.Group>
          <br />
          <Form.Label>Demo Accounts</Form.Label>
          <br />
          <Button variant="outline-primary" type="button" onClick={() => handleTestingLogin('admin')}>
            admin@test.com
          </Button>
          &nbsp;
          <Button variant="outline-primary" type="button" onClick={() => handleTestingLogin('normal')}>
            user1@test.com
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default Login
