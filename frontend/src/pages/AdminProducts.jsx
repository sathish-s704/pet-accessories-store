import { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '', price: '', category: '', description: '', image: null
  });
  const [editingProductId, setEditingProductId] = useState(null);

  const getAuthConfig = (isMultipart = false) => {
    const token = localStorage.getItem("token");
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        ...(isMultipart && { 'Content-Type': 'multipart/form-data' })
      }
    };
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products', getAuthConfig());
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setFormData({ name: '', price: '', category: '', description: '', image: null });
    setEditingProductId(null);
  };

  const handleAdd = () => {
    setEditingProductId(null);
    setFormData({ name: '', price: '', category: '', description: '', image: null });
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description || '',
      image: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`, getAuthConfig());
        fetchProducts();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('description', formData.description);
      if (formData.image) {
        data.append('image', formData.image);
      }

      if (editingProductId) {
        await axios.put(`/api/products/${editingProductId}`, data, getAuthConfig(true));
      } else {
        await axios.post('/api/products', data, getAuthConfig(true));
      }

      fetchProducts();
      handleClose();
    } catch (err) {
      console.error('Submit error:', err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Products</h2>
      <Button onClick={handleAdd} className="mb-3">Add Product</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod._id}>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>₹{prod.price}</td>
              <td>{prod.category}</td>
              <td>
                {prod.imageUrl && (
                  <img
                    src={`/${prod.imageUrl.replace(/\\/g, '/')}`}
                    alt={prod.name}
                    width="50"
                  />
                )}
              </td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleEdit(prod)}>Edit</Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleDelete(prod._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProductId ? 'Edit Product' : 'Add Product'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                accept="image/*"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
            <Button variant="primary" type="submit">{editingProductId ? 'Update' : 'Add'}</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default AdminProducts;
