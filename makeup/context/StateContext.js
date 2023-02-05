// import { create } from "domain";
import React, { createContext, useContext, useState,
useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();






export const StateContext = ({children}) => {

    const [showcart, setshowcart] =useState (false);

    const [cartitems, setcartitems] =useState ([]);


    const [totalprice, settotalprice] =useState (0);

    const [totalquantities, settotalquantities] =useState (0);
    const [qty, setqty] = useState (1);

    let foundProduct ;
    let index;

    
    const onAdd = (product, quantity) => {
        const checkProductInCart = cartitems.find((item) => item._id === product._id);

        if(checkProductInCart){
            settotalprice((prevtotalprice) => prevtotalprice + product.price * quantity);
            settotalquantities((prevtotalquantities) => prevtotalquantities + quantity);

           const updateCartItems = cartitems.map((cartProduct) => {
            if(cartProduct._id === product._id) return {
                ...cartProduct,
                quantity: cartProduct.quantity + quantity
            }
           })
           setcartitems(updateCartItems);
           toast.success(`${qty} ${product.name} added to the cart successfuly`);

        }
        else{
            settotalprice((prevtotalprice) => prevtotalprice + product.price * quantity);
            settotalquantities((prevtotalquantities) => prevtotalquantities + quantity);

            product.quantity = quantity;
            setcartitems([...cartitems, {...product}]);

            toast.success(`${qty} ${product.name} added to the cart successfuly`);



        }

    }

    const toggelCartItemQuanity =(id, value) => {
        foundProduct = cartitems.find((item) => item._id === id)
        index = cartitems.findIndex((product) => product._id === id);




    }









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
        setshowcart,
        cartitems,
        totalprice,
        totalquantities,
        qty,
        inQty,
        decQty,
        onAdd
        }}
       >
        {children}
        
     </Context.Provider> 

    )
}
 
export const useStateContext = () => useContext(Context);