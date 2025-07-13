import { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { username, password });
      alert(res.data.message || 'Admin login successful');
      // redirect to admin dashboard
    } catch (err) {
      alert(err.response?.data?.error || 'Admin login failed!');
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h3 className="mb-4">👨‍💼 Admin Login</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </Form.Group>
        <Button variant="dark" type="submit">Login</Button>
      </Form>
    </Container>
  );
}

export default AdminLogin;
