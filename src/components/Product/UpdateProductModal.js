import { useState, useEffect } from 'react';

export const UpdateProductModal = ({ isOpen, onClose, onUpdate, data }) => {
  const [form, setForm] = useState({
    id: data?.id,
    name: data?.name,
    price: data?.price,
    description: data?.description,
    product: data?.product,
    color: data?.color,
    image: data?.image,
  });

  useEffect(() => {
    setForm({
      ...data
    });
  }, [data]);

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
    onUpdate({
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
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <input type="number" name="id" placeholder="ID" value={data?.id} onChange={handleChange} readOnly={true}/>
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} defaultValue={data?.name} />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} defaultValue={data?.price} />
          <input type="text" name="description" placeholder="Description" value={form.description} onChange={handleChange} defaultValue={data?.description} />
          <input type="text" name="product" placeholder="Product type" value={form.product} onChange={handleChange} defaultValue={data?.product} />
          <input type="text" name="color" placeholder="Color" value={form.color} onChange={handleChange} defaultValue={data?.color} />
          <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} defaultValue={data?.image} />
          <div className="modal-actions">
            <button className='btn' type="submit">Update</button>
            <button className='btn' type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};
