import React , { useRef}from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, 
AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import  toast  from 'react-hot-toast';
import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';
const Cart = () => {
  const cartRef = useRef();
  const {totalprice, totalquantities, cartitems, setshowcart, toggelCartItemQuanity,
  onRemove } 
  = useStateContext();

  const handelCheckout = async () => {

    const stripe = await getStripe();
   
    const response = await fetch('api/stripe', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartitems),
    });

    if(response.statusCode === 500) return;
    // else { console.log("notr");}
    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });

  }



  return (
    <div className='cart-wrapper' ref={cartRef} >
      <div className='cart-container'>
        <button type='button' className='cart-heading' 
        onClick={()=> setshowcart(false) }>
          <AiOutlineLeft />
          <span className='heading'>Your cart</span>
          <span className='cart-num-items'>(You have {totalquantities} Items)</span>
        </button>

        {cartitems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty! Continu Shopping and Fill it with our cool products ^__^</h3>
            <Link href='/' >
              <button type='button' onClick={() => setshowcart(false)} 
              className='btn'>Continu Shopping

              </button>
            </Link>
            </div>
        )}

        <div className='product-container'>
          {cartitems.length >= 1 && cartitems.map((item) =>
          (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])}
              className='cart-product-image' />
              <div className='item-desc'>

                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <div>
                    <p className='quantity-desc'> 
                    <span className='minus' onClick={() => toggelCartItemQuanity (item._id, 'dec')}>
                        <AiOutlineMinus />
                    </span>
                    <span className='num' onClick=''>{item. quantity}
                       
                    </span>
                    <span className='plus' onClick={() => toggelCartItemQuanity (item._id, 'inc')}>
                        <AiOutlinePlus />
                    </span>
                     </p>
                      </div>
                      <button type='button' className='remove-item'
                      onClick={() => onRemove(item)}>
                        <TiDeleteOutline />

                      </button>
                    </div>

                </div>
              </div>
          ))}
          </div>
      
          
          {cartitems.length >= 1 && (
            <div className='cart-bottom' >
              <div className='total'>
                <h3> Subtotal:</h3>
                <h3> ${totalprice}</h3>
                </div>
                <div className='btn-container'>
                  <button type='button' className='btn' onClick= {handelCheckout}>
                    Pay with Stripe
                  </button>
                  </div>
              </div>
          )}

        







      </div>
      </div>
  )
}

export default Cart