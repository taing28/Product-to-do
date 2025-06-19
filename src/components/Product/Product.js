import 'react-router-dom'
import { Link } from 'react-router-dom';
import useFetchApi from '../../hooks/useFetchApi';
import React, { useState } from 'react';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { CreateProductModal } from './CreateProductModal';

const ProductItem = ({ data, key, onDelete }) => {
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
    const [prodId, setProdId] = useState(null);
    const { data: products, loading, refetch } = useFetchApi('http://localhost:5000/api/products', {
        method: 'GET'
    });

    const handleOpenDeleteModal = (value) => {
        setProdId(value)
        setIsDeleteOpen(true)
    }

    const handleDeleteClose = () => {
        setIsDeleteOpen(false)
        setProdId(null);
    }

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json();
            await refetch();
            console.log('Delete result:', result);
        } catch (e) {
            console.log('Error deleting product:', e);
        } finally {
            setIsDeleteOpen(false);
            setProdId(null);
        }
    }

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
            await refetch();
            console.log('Create result:', result);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="">
            <h1 style={{ textAlign: 'center', color: '#fff' }}>Product List</h1>
            <button className='btn' style={{ borderRadius: '0' }} onClick={handleCreateOpen}>Create Product</button>
            <div className="product-list mt-16">
                {
                    loading ? (
                        <p>Loading...</p>
                    )
                        :
                        (
                            <React.Fragment>
                                {products?.data.map((p, i) => {
                                    return <ProductItem data={p} key={i} onDelete={handleOpenDeleteModal} />
                                })}
                                <ConfirmModal isOpen={isDeleteOpen} onClose={handleDeleteClose} onConfirm={handleDelete} message="Confirm delete product?" dataId={prodId} />
                                <CreateProductModal isOpen={isCreateOpen} onClose={handleCreateClose} onCreate={handleCreate} />
                            </React.Fragment>
                        )
                }
            </div>
        </div>
    );
}