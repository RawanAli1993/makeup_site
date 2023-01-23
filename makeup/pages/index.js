import React from 'react';


import { Client }  from '../lib/client';
import { Products, FooterBanner, Herobanner } from '../components';
// import {Product, Footbanner, HeroBanner} from '../components';




const Home = ({products, bannerData }) => (

  
  
    <div>
    <Herobanner heroBanner = {bannerData.length && bannerData[0]} />
     {/* {console.log(bannerData)} */}
  
    
      <div className="products-heading">
        <h2>
          Best selling Products</h2>
        <p>
          Speakers of many variations</p>
        
        </div>
        <div className="products-container">
          {/* {['product1', 'product2'].map(
            (product)=> product)} */}
             {products?.map(
            (product)=> product.name)}
        </div>
        <FooterBanner />
    
    </div>
  
  );
  export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await Client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await Client.fetch(bannerQuery);
 
  return {
    props: {products, bannerData }
  }
}




export default Home;