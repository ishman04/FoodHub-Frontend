import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../helpers/axiosInstance';
import toast from 'react-hot-toast';

const initialState = {
  location: localStorage.getItem('selectedAddress') || null,            // { lat, lng, address }
  isDeliverable: localStorage.getItem('selectedAddress') ? true : null,       // true/false
  loading: false,
  addresses: [],
  loadingAddresses: false,
};

export const fetchUserAddresses = createAsyncThunk(
  'location/fetchUserAddresses',
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get('/delivery/user-addresses');
      console.log(res.data.data)
      return res.data.data;
      
    } catch (err) {
      toast.error("Failed to load saved addresses");
      return thunkAPI.rejectWithValue('Could not fetch addresses');
    }
  }
);

export const checkLocationDelivery = createAsyncThunk(
  'location/checkLocationDelivery',
  async (locationDetails, thunkAPI) => {
    try {
      const res = await axiosInstance.post('/delivery/check-radius', locationDetails);
      const data = res.data;

      if (!data?.isDeliverable) {
        toast.error('We do not deliver to this location');
        return {
          ...locationDetails,canDeliver: false
        }
      }

      toast.success('Delivery available in your area');
      return { ...locationDetails, canDeliver: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const createAddress = createAsyncThunk('/location/createAddress',async(addressDetails,thunkAPI) => {
  try {
    const res = await axiosInstance.post('/delivery/create-address', addressDetails);
    if(res.status === 200 || res.status===201){
      toast.success("Address saved successfully")
      return res.data.data;
    }
}
catch{
  toast.error("Something went wrong")
  return thunkAPI.rejectWithValue('Something went wrong');
}
})

const LocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    clearLocation: (state) => {
      state.location = null;
      state.isDeliverable = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLocationDelivery.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLocationDelivery.fulfilled, (state, action) => {
        console.log("action",action)
        state.isDeliverable = true;
        state.loading = false;
      })
      .addCase(checkLocationDelivery.rejected, (state) => {
        state.isDeliverable = false;
        state.loading = false;
      })
      .addCase(createAddress.fulfilled, (state,action)=>{
        state.location ={
          address: action.payload
        }
      })
      .addCase(fetchUserAddresses.pending, (state) => {
  state.loadingAddresses = true;
})
.addCase(fetchUserAddresses.fulfilled, (state, action) => {
  state.addresses = action.payload;
  state.loadingAddresses = false;
})
.addCase(fetchUserAddresses.rejected, (state) => {
  state.addresses = [];
  state.loadingAddresses = false;
})

  },
});

export const { clearLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
