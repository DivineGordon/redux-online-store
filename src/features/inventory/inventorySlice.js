import { inventoryData } from '../../../data.js';
import { createSlice } from '@reduxjs/toolkit';

export const loadData = (data) => {
  return {
    type: 'inventory/loadData',
    payload: inventoryData,
  };
};

const initialInventory = {initialInventory:[],
searchInventory:null
};
/*
export const inventoryReducer = (inventory = initialInventory, action) => {
  switch (action.type) {
    case 'inventory/loadData': {
      return action.payload
    }
    default: {
      return inventory;
    }
  }
};
*/
const inventorySlice=createSlice({
  name:"inventory",
  initialState: initialInventory,
  reducers:{
    loadData(state,action){
      state.initialInventory=action.payload;
    }
  },
  extraReducers:{
    'searchTerm/setSearchTerm':(state,action)=>{
      const test=new RegExp(action.payload,'i');
      const data=state.initialInventory.filter((v)=>test.test(v.name))
   state.searchInventory=data.length?data:null;
    },
    'searchTerm/clearSearchTerm':(state)=>{
      state.searchInventory=null;

    }
  }

});



export const inventoryReducer=inventorySlice.reducer;