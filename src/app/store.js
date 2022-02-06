// Import createStore and combineReducers here.
import {createStore,combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// Import the slice reducers here.
import {cartReducer} from '../features/cart/cartSlice.js';
import {inventoryReducer} from '../features/inventory/inventorySlice.js';
import {currencyFilterReducer} from '../features/currencyFilter/currencyFilterSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';

//const rootReducer=combineReducers()
export default configureStore({reducer:{
  cart:cartReducer,
  inventory:inventoryReducer,
  currencyFilter:currencyFilterReducer,
  search:searchTermReducer
}})
//export default createStore(rootReducer);
