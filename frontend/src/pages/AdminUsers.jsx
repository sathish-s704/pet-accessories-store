import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/');
  }, [user, navigate]);
  return (
    <Container className="py-4">
      <h2>Admin Users</h2>
      <p>User management coming soon...</p>
    </Container>
  );
};
export default AdminUsers; 