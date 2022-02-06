import React,{useState} from 'react';
import { Inventory } from '../features/inventory/Inventory.js';
import { CurrencyFilter } from '../features/currencyFilter/CurrencyFilter.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';
import {Cart} from '../features/cart/Cart.js';
import {useDispatch, useSelector} from "react-redux";
import { clearSearchTerm } from '../features/searchTerm/searchTermSlice.js';
const BackButton=(props)=>{
  const {cartButton,onClick,nO}=props;
if(cartButton){
  return  (<button style={{position:"sticky",top:"10%",right:"5%",float:"right"}} onClick={onClick}  
  className='w3-btn w3-xlarge w3-round-xxlarge w3-border'>
    <i className="fa fa-cart-plus" aria-hidden="true"></i><sup className="w3-border w3-red w3-round-xlarge">{nO}</sup></button>)
}
return <button style={{float:"right"}} onClick={props.onClick}  
className='w3-btn currency-button selected'>BACK</button>
};
export const App = (props) => {
const [checkout,setCheckout]=useState(false)
let inventory=useSelector(state=>state.inventory.initialInventory);
const searchResults=useSelector(state=>state.inventory.searchInventory);
const onCheckout=()=>setCheckout(true);
const dispatch=useDispatch();
const searchTerm=useSelector(state=>state.search.searchTerm);
const nO=useSelector(s=>s.cart.itemsCount)
if(checkout){
  return (
  <div className="w3-main" style={{marginLeft:250}}>
    <CurrencyFilter
    dispatch={dispatch}
  ><BackButton onClick={()=>{setCheckout(false)}} /></CurrencyFilter>
  
    <Cart 
    summary={false}
    />
    </div>
  )
}

if (searchTerm)inventory=searchResults;
  return (
    <div className='w3-container'>
      <div className='w3-container'>
      <CurrencyFilter
        dispatch={dispatch}
      > { searchTerm ?
        <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />:
        <BackButton nO={nO} onClick={()=>{setCheckout(true)}} cartButton={true}/>
        }
          
        </CurrencyFilter></div>
      
     
      <SearchTerm  dispatch={dispatch} />
      <Inventory
        dispatch={dispatch}
        inventory={inventory}
        searchTerm={searchTerm}
      />
      <Cart 
      summary={true}
      onCheckout={onCheckout}
      />

    </div>
  );
};
