import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { useHistory } from 'react-router-dom';

import { Link } from 'react-router-dom';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  const history=useHistory();
  const routeChange = () =>{ 
    let path = `/search/name`; 
    history.push(path);
  }
  
  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);
  return (
    
    <div>

<div class="banner" style={{backgroundImage:"url(../images/3476842.jpg)",backgroundSize:"cover",height:"500px"}}>
  <div style={{  width:"100%",
  padding:"100px 0",
  textAlign: "center",
  color: "white"}}>
    <h1 style={{fontFamily:"Arial, Helvetica, sans-serif",fontSize: "2.8em",padding: "10px 0",fontWeight: "800"}}>Bienvenue sur MUSTRACHEM</h1>
    <button className="primary block" onClick={routeChange} style={{width:"15%"}}>Découvrez nos produits</button>
  </div>  
</div>
    

      <h2>Nouveau Produits</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>Aucun produit trouvé</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
