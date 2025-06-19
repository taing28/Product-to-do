import { useState } from 'react';

export const CreateProductModal = ({ isOpen, onClose, onCreate }) => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    product: '',
    color: '',
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Optional: validate fields here
    onCreate({
      ...form,
      id: Number(form.id),
      price: Number(form.price),
    });
    onClose();
    setForm({
      id: '',
      name: '',
      price: '',
      description: '',
      product: '',
      color: '',
      image: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          <input type="text" name="product" placeholder="Product type" value={form.product} onChange={handleChange} />
          <input type="text" name="color" placeholder="Color" value={form.color} onChange={handleChange} />
          <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
          <div className="modal-actions">
            <button className='btn' type="submit">Create</button>
            <button className='btn' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
