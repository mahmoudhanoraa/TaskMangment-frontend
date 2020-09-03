import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    modal: {
        show: false,
        title: '',
        description: '',
        id: -1
    }
}

const ModalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        modalChange(state, action){
            state.show = action.payload.show
            state.title = action.payload.title
            state.description = action.payload.description
            state.id = action.payload.id
        }
    }
})


export const { modalChange} = ModalSlice.actions
export default ModalSlice.reducer