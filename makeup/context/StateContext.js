// import { create } from "domain";
import React, { createContext, useContext, useState,
useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();






export const StateContext = ({children}) => {

    const [showcart, setshowcart] =useState (false);

    const [cartitems, setcartitems] =useState ();


    const [totalprice, settotalprice] =useState ();

    const [totalquantities, settotalquantities] =useState ();
    const [qty, setqty] = useState (1);

    const inQty = () => {setqty((preQty) => preQty +1 )}

    const decQty = () => {setqty((preQty) => {
        if(preQty - 1 < 1) return 1;
        return preQty -1;
    });
}
    return(

       <Context.Provider 
        value={{
        showcart,
        cartitems,
        totalprice,
        totalquantities,
        qty,
        inQty,
        decQty,
        }}
       >
        {children}
        
     </Context.Provider> 

    )
}
 
export const useStateContext = () => useContext(Context);