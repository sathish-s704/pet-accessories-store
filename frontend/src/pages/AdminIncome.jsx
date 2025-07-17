import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Container } from 'react-bootstrap';

const AdminIncome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== 'admin') navigate('/');
  }, [user, navigate]);
  return (
    <Container className="py-4">
      <h2>Admin Income</h2>
      <p>Income analytics coming soon...</p>
    </Container>
  );
};
export default AdminIncome; 