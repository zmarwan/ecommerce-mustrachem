import React from 'react';
import { Link } from 'react-router-dom';


export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="products-image" src={product.image} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2>{product.name}</h2>
        </Link>
        <div className="row">
          <div className="price">Prix :{product.price}DH</div>
        </div>
        <div>
                        {product.countInStock > 0 ? (
                          <span className="success">Disponible</span>
                        ) : (
                          <span className="danger">Rupture de stock</span>
                        )}
                      </div>
      </div>
    </div>
  );
}
