import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Button, Form, Alert, Modal } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const router = useRouter();
  const { signup } = useAuth();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSignup = async (e:any) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(data.email, data.password);
      setData({ email: '', password: '' });
      setLoading(false);
      setShowSuccessDialog(true);
      router.push('/login');
    } catch (err) {
      setError('Failed to sign up. Please check your details.');
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowSuccessDialog(false);
    // Optionally, you can redirect the user to another page here
  };

  return (
    <div style={{ width: '40%', margin: 'auto'}}>
      <h1 className="text-center my-3">Signup</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSignup}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </Form.Group>

        <Button variant="dark" type="submit" disabled={loading}>
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
      </Form>

      <Modal show={showSuccessDialog} onHide={handleCloseDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Signup Successful!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your account has been successfully created.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDialog}>
            Close
          </Button>
          {/* You can add more actions here if needed */}
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
