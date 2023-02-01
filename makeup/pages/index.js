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
          Best Selling Products !</h2>
        <p>
          choose your collection now and enjoy with our uniq products</p>
        
        </div>
        <div className="products-container">
          {/* {['product1', 'product2'].map(
            (product)=> product)} */}
             {products?.map((product) => <Products key={product._id} product={product} />)}
        </div>
        <FooterBanner  footerBanner={bannerData && bannerData[0]} />
    
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