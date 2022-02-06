import React, { useEffect,useState } from 'react';

import {
  calculatePrice,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import { addItem } from '../cart/cartSlice.js';
import { loadData } from './inventorySlice';
import {useSelector} from 'react-redux';

const emptyArray=[];
export const Inventory = ({ searchTerm, inventory, dispatch }) => {
  const [itemsInCart,setItemsIncart]=useState(emptyArray); 
  const currencyFilter=useSelector(state=>state.currencyFilter);
  const onMount = () => {
    dispatch(loadData());
  };
  useEffect(onMount, [inventory]);

  const onClickHandler = (inventoryItem) => {
    dispatch(addItem(inventoryItem));
    setItemsIncart(state=>[...state,inventoryItem.id])
  };

  if(searchTerm && !inventory){
    return <p> Sorry, no products found... </p>;
  }
  if (inventory.length === 0) {
    return <p> Sorry, no products are currently available... </p>;
  }

  

  
      return   (<div className='w3-container'>
   <ul id="inventory-container">{
    inventory.map(p=>{
      return (<InventoryItem currencyFilter={currencyFilter} 
        addedToCart={itemsInCart.some(id=>id===p.id)}
        onClickHandler={onClickHandler} key={p.name}  inventoryItem={p} />)})}
        </ul></div>);

  
};
function InventoryItem(props) {
  const {inventoryItem,onClickHandler,currencyFilter}=props;
  const { price, name, img } = inventoryItem;
  const displayPrice = calculatePrice(price, currencyFilter);
  const addedToCart=useSelector(s=>(!!s.cart.cart[name]))
  return (
    <li className="item">
      <img src={img} alt={''} />
      <h3>{name}</h3>
      <h3 className="price">
        {getCurrencySymbol(currencyFilter)}
        {displayPrice.toFixed(2)} {currencyFilter}
      </h3>
      <button
        onClick={() => onClickHandler(inventoryItem)}
        className="add-to-cart-button"
      >
       {addedToCart?"Added":"Add to Cart"}
      </button>
    </li>
  );
}