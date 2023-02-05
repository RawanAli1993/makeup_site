import React, { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar,
     AiOutlineStar } from 'react-icons/ai';
import { Client, urlFor } from '../../lib/client';
import { Products } from '../../components';
import { useStateContext } from '../../context/StateContext';


const ProductDetails
 = ({products, product}) => {
    const {image, name, details, price} = product;
     const [Index, setIndex] = useState(0);
     const {decQty, inQty, qty} = useStateContext();
 



  return (
    <div>
    <div className='product-detail-container'>

        <div>
            <div className='image-container'>
                <img src= {urlFor(image && image[Index])} className='product-detail-image'/>
            </div>
            <div className='small-images-container'>
                {image?.map((item, i)=> (
                    <img src={urlFor(item)} className={i === Index ? 
                     'small-image selected-image' :
                     'small-image'}
                    onMouseEnter= {() => setIndex(i)} /> 
               ) )}

            </div>
        </div>

        <div className='product-detail-desc'>
            <h1>{name}</h1>
            <div className='reviews'>
                <div>
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiOutlineStar />
               
                {/* <p> */}
                    (20)
              </div>
            </div>
            <h4>Details: </h4>
            <p>{details}</p>
            <p className='price'>${price}</p>
            <div className='quantity'>
                <h3>Quantity: </h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}>
                        <AiOutlineMinus />
                    </span>
                    <span className='num' onClick='' >
                        {qty}
                    </span>
                    <span className='plus' onClick={inQty} >
                        <AiOutlinePlus />
                    </span>
                </p>
            </div>
            <div className='buttons'>
                <button type='button' className='add-to-cart' 
                onClick=''>Add to cart</button>
                 <button type='button' className='buy-now' 
                onClick=''>Buy Now</button>
            </div>
        </div>
    </div>
    <div className='maylike-products-wrapper'>
        <h2>You may also like to try </h2>
        <div className='marquee'>
            <div className='maylike-products-container track'>
                {products.map((item) => (
                 <Products key={item._id}  product={item} />
                ))}
            </div>
        </div>
    </div>
    </div>

  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {slug {current}}`;
     
    const products = await Client.fetch(query);
    const paths = products.map((product) => ({

        params: {
            slug: product.slug.current
        }
    }));
    return {
        paths,
        fallback: 'blocking'

    }



}
export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await Client.fetch(query);
    const products = await Client.fetch(productsQuery);
  
  
   
    return {
      props: {products, product }
    }
  }
  

export default ProductDetails
