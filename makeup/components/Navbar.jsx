import React from 'react';

import Link from 'next/link';
import { AiOutlineShopping, AiOutlineExclamationCircle, AiOutlinePhone } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
  const {showcart, setshowcart, totalquantities} = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Rawan Beauty Shop</Link>
      </p>
{/*       
      <button type='button' className='pro-icon' onClick=''>
      
       <AiOutlinePhone />

      </button> */}

{/*     
      <button type='button' className='ifo-icon' onClick=''>
      <AiOutlineExclamationCircle />
      
      </button> */}
      <button type='button' className='cart-icon' 
      onClick={() => setshowcart(true)} >

        <AiOutlineShopping />
       
        <span className='cart-item-qty'>{totalquantities}</span>



      </button>
       {showcart &&  <Cart />}
   
     </div>
  )
}

export default Navbar