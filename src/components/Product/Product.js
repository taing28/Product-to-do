import 'react-router-dom'
import { Link, useSearchParams } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi';
import React, { useState } from 'react';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { CreateProductModal } from './CreateProductModal';
import { UpdateProductModal } from './UpdateProductModal';

const ProductItem = ({ data, key, onDelete, onUpdate }) => {
    return (
        <div className="product-item" key={key} style={{ position: 'relative' }}>
            <div className="product-content">
                <img src={data.image} alt={data.name} className="product-image" />
                <div className="product-details">
                    <h2>{data.name}</h2>
                    <p>{data.description}</p>
                    <span>Price: ${data.price}</span>
                    <Link to={`/${data.id}`}>
                        <button className="btn">View Detail</button>
                    </Link>
                    <button className="btn mt-2" onClick={() => onUpdate(data)}>Update</button>
                </div>
            </div>
            <button className="btn" style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ff0000', color: '#fff', borderRadius: '0' }} onClick={() => onDelete(data.id)}>
                X
            </button>
        </div>
    );
}

export const Product = () => {
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedProId, setSelectedProId] = useState(null);
    const [selectedPro, setSelectedPro] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    const { data: products, loading, setData: setProducts } = useFetchApi(`http://localhost:5000/api/products?limit=${limit || ''}&sort=${sort || ''}`, {
        method: 'GET'
    });

    // Delete
    const handleDeleteOpen = (value) => {
        setSelectedProId(value)
        setIsDeleteOpen(true)
    }

    const handleDeleteClose = () => {
        setIsDeleteOpen(false)
        setSelectedProId(null);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json();
            console.log('Delete data:', result);
            setProducts(prev => ({ ...prev, data: prev.data.filter(p => p.id !== id) }));
        } catch (e) {
            console.log('Error deleting product:', e);
        } finally {
            setIsDeleteOpen(false);
            setSelectedProId(null);
        }
    }

    // Create
    const handleCreateOpen = () => {
        setIsCreateOpen(true);
    }

    const handleCreateClose = () => {
        setIsCreateOpen(false);
    }

    const handleCreate = async (value) => {
        try {
            const response = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value)
            })
            const result = await response.json();
            console.log('Create result:', result);
            setProducts(prev => ({ ...prev, data: [...prev.data, result.data] }));
        } catch (e) {
            console.log(e);
        }
    }

    // Update
    const handleUpdateOpen = (value) => {
        setSelectedPro(value);
        setIsUpdateOpen(true);
    }

    const handleUpdateClose = () => {
        setSelectedPro(null);
        setIsUpdateOpen(false);
    }

    const handleUpdate = async (value) => {
        try {
            const { id, ...formData } = value;
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const result = await response.json();
            console.log('Update result:', result);
            setProducts(prev => ({ ...prev, data: prev.data.map(p => p.id === id ? result.data : p) }));
        } catch (e) {
            console.log(e);
        }
    }

    // Filter
    const handleChangeLim = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams); // giữ lại param cũ

        if (value <= 0) {
            newParams.delete('limit');
            e.target.value = '';
        } else {
            newParams.set('limit', value);
        }

        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams); // giữ lại param cũ
        if (value === '') {
            newParams.delete('sort');
        } else {
            newParams.set('sort', value);
        }

        setSearchParams(newParams);
    };

    return (
        <div className="">
            <h1 style={{ textAlign: 'center', color: '#fff' }}>Product List</h1>
            <button className='btn' style={{ borderRadius: '0' }} onClick={handleCreateOpen}>Create Product</button><br />
            <input type="number" id="lim" name="limit" placeholder="Limit records" style={{ margin: '8px 0', padding: '8px' }} onChange={handleChangeLim} />
            <select
                onChange={handleSortChange}
                style={{ marginLeft: '4px', padding: '8px' }}
                value={sort || ''}
            >
                <option value="">Sort: None</option>
                <option value="asc">Sort: Ascending</option>
                <option value="desc">Sort: Descending</option>
            </select>

            <div className="product-list mt-16">
                {
                    loading ? (
                        <p>Loading...</p>
                    )
                        :
                        (
                            <React.Fragment>
                                {products?.data.map((p, i) => {
                                    return <ProductItem data={p} key={i} onDelete={handleDeleteOpen} onUpdate={handleUpdateOpen} />
                                })}
                                <ConfirmModal isOpen={isDeleteOpen} onClose={handleDeleteClose} onConfirm={handleDelete} message="Confirm delete product?" dataId={selectedProId} />
                                <CreateProductModal isOpen={isCreateOpen} onClose={handleCreateClose} onCreate={handleCreate} />
                                <UpdateProductModal isOpen={isUpdateOpen} onClose={handleUpdateClose} onUpdate={handleUpdate} data={selectedPro} />
                            </React.Fragment>
                        )
                }
            </div>
        </div>
    );
}