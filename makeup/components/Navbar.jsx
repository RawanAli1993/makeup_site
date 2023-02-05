import React from 'react';

import Link from 'next/link';
import { AiOutlineShopping, AiOutlineExclamationCircle, AiOutlinePhone } from 'react-icons/ai';

const Navbar = () => {
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Rawan Beauty Shop</Link>
      </p>
{/*       
      <button type='button' className='pro-icon' onClick=''>
      
       <AiOutlinePhone />

      </button> */}

    
      <button type='button' className='ifo-icon' onClick=''>
      <AiOutlineExclamationCircle />
      {/* <AiOutlinePhone /> */}
      </button>
      <button type='button' className='cart-icon' onClick=''>

        <AiOutlineShopping />
       
        <span className='cart-item-qty'>1</span>



      </button>
   
     </div>
  )
}

export default Navbar