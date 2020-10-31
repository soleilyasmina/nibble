import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { api } from '../services';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (props.user && props.user.id) {
      history.push("/dashboard");
    }
  }, [props.user, history]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post('/auth/login', { username, password });
      props.setUser(resp.data.user);
      localStorage.setItem('token', resp.data.token);
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }

  const register = async (e) => {
    e.preventDefault();
    try {
      const resp = await api.post('/auth/register', { username, password, email });
      props.setUser(resp.data.user);
      localStorage.setItem('token', resp.data.token);
      history.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Container className="mt-4">
      <Row>
        {
          isLogin ?
            (
              <Col>
                <Form onSubmit={login} >
                  <Form.Group controlId="username">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="name" placeholder="Enter username:" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter password:" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant="primary" type="submit">Login</Button>
                  <Button variant="secondary" className="ml-2" onClick={() => setIsLogin(false)}>Sign Up</Button>
                </Form>
              </Col>
            ) :
          (
            <Col>
              <Form onSubmit={register} >
                <Form.Group controlId="email">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" placeholder="Enter email:" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="name" placeholder="Enter username:" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" placeholder="Enter password:" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
                <Button variant="secondary" className="ml-2" onClick={() => setIsLogin(true)}>Sign In</Button>
              </Form>
            </Col>
          )
        }
      </Row>
    </Container>
  )
};

export default Login;
