import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import useFetchApi from "../../hooks/useFetchApi";
import React from "react";

export const ProductDetail = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const field = searchParams.get('field');

    const nav = useNavigate();

    const handleGoBack = () => {
        nav(-1);
    }

    const { data: product, loading, error } = useFetchApi(`http://localhost:5000/api/products/${id}?field=${field || ''}`, {
        method: 'GET'
    });

    return (
        <div>
            <button className="btn" style={{ borderRadius: '0' }} onClick={handleGoBack}>Go back</button>
            <div className="product mt-16">
                {loading ? (
                    <p>...Loading</p>
                )
                    :
                    (
                        <React.Fragment>
                            {product?.data?.id && <h1>Product id: {product?.data?.id}</h1>}
                            {product?.data?.image && <img src={product?.data?.image} alt={'This is product\'s image'} className="product-image" />}
                            <ul style={{ listStyle: 'none' }}>
                                {product?.data?.name && <li>name: {product?.data?.name}</li>}
                                {product?.data?.price && <li>price: ${product?.data?.price}</li>}
                                {product?.data?.description && <li>description: {product?.data?.description}</li>}
                                {product?.data?.product && <li>product: {product?.data?.product}</li>}
                                {product?.data?.color && <li>color: {product?.data?.color}</li>}
                                {product?.data?.createdAt && <li>createdAt: {product?.data?.createdAt}</li>}
                            </ul>
                        </React.Fragment>
                    )}
            </div>
        </div>
    );
}