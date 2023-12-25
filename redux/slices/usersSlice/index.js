import { createSlice,createAsyncThunk,isRejectedWithValue} from '@reduxjs/toolkit';
import axios from 'axios';
import { getError } from '../../../utils/error';

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ()=>{
        try {
            const {data} = await axios.get("/api/admin/users");
            return data; 
        } catch (error) {
            return rejectWithValue(getError(error));
        }
          
    }
)
export const promoteAdmin = createAsyncThunk (
    "users/promoteAdmin",
    async (user) => {
        try {
             const {data} = await axios.post("/api/admin/users/adminify",user);
            if(data.message ===  "success"){
                const {data} = await axios.get("/api/admin/users");
                return data;
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
       
    }
)
export const demoteAdmin = createAsyncThunk (
    "users/demoteAdmin",
    async (user) => {
        try {
             const {data} = await axios.patch("/api/admin/users/adminify",user);
            if(data.message ===  "success"){
                const {data} = await axios.get("/api/admin/users");
                return data;
            }
        } catch (error) {
            return rejectWithValue(getError(error));
        }
       
    }
)

export const deleteUser = createAsyncThunk (
    "users/deleteUser",
    async (id,thunkApi) => {
        try {
            const {data} = await axios.delete(`/api/admin/users/delete?id=${id}`);
            if(data.message === "success");
            const {data:data2} = await axios.get("/api/admin/users");
            return data2;
        } catch (error) {
            return thunkApi.rejectWithValue(error);
        }
    }
)

const initialState = {
  users: [], 
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError : (state,action)=> {state.error = action.payload} 
  },
  extraReducers : (builder) => {
    builder.addCase(fetchUsers.pending,(state) =>  {state.loading = true})
    .addCase(fetchUsers.fulfilled, (state,action) => {
        state.users = action.payload ;
        state.loading = false
    })
    .addCase(fetchUsers.rejected, (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(promoteAdmin.pending, state => {state.loading = true})
    .addCase(promoteAdmin.fulfilled, (state,action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(promoteAdmin.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(demoteAdmin.pending, state => {state.loading = true})
    .addCase(demoteAdmin.fulfilled, (state,action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(demoteAdmin.rejected, (state,action)=>{
        state.loading = false;
        state.error = action.payload
    })
    .addCase(deleteUser.pending, state => {state.loading = true})
    .addCase(deleteUser.fulfilled, (state,action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(deleteUser.rejected, (state,action)=>{
        state.loading = false;
        state.error = getError(action.payload);
    })
  }
});

export const {clearError} = usersSlice.actions; 
export default usersSlice.reducer;
