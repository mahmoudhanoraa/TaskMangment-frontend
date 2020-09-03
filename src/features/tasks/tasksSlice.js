import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await client.get('http://localhost:3000/all_tasks')
    return response
})


export const addNewTask = createAsyncThunk(
    'tasks/addTask',
    // The payload creator receives the partial `{title, content, user}` object
    async initialTask => {
        // We send the initial data to the fake API server
        const response = await client.post('http://localhost:3000/add_new_task', { task: initialTask })
        return response
    }
)

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async initialTask => {
        const response = await client.post('http://localhost:3000/editTask', { task: initialTask })
        console.log(response)
        return response
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async initialTask => {
        const response = await client.post('http://localhost:3000/deleteTask', { task: initialTask })
        return response
    }
)

// const initialState = [
//     { id:1, key:1, title: 'Important Job', description: 'I need to finish my task', hidden: false},
//     { id:2, key:2, title: 'Important Job 2', description: 'I need to finish my task', hidden: false}
// ]

const initialState = {
    tasks: [],
    status: 'idle',
    error: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        taskAdded(state, action){

        },
        taskRemoved(state, action){
            const {id} = action.payload
            const removedTaskIndex = state.tasks.findIndex(task => task.id === id)
            state.tasks.splice(removedTaskIndex, 1)
        },
        taskEdited(state, action){
            const {id, title, description, hidden} = action.payload
            const editedTask = state.tasks.find(task => task.id === id)
            console.log(editedTask)
            editedTask.title = title
            editedTask.description = description
            editedTask.hidden = hidden
        }
    },
    extraReducers: {
        [fetchTasks.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            // Add any fetched posts to the array
            console.log(action.payload)
            state.tasks = state.tasks.concat(action.payload)
        },
        [addNewTask.fulfilled]: (state, action) => {
            state.tasks.unshift(action.payload)
        },
        [deleteTask.fulfilled]: (state, action) => {
            const {id} = action.payload
            const removedTaskIndex = state.tasks.findIndex(task => task.id === id)
            state.tasks.splice(removedTaskIndex, 1)
        },
        // [editTask.fulfilled]: (state, action) => {
        //     const {id, title, description, hidden} = action.payload
        //     const editedTask = state.tasks.find(task => task.id === id)
        //     console.log(editedTask)
        //     editedTask.title = title
        //     editedTask.description = description
        //     editedTask.hidden = hidden
        // },
    }
})

export const selectAllTasks = state => state.tasks.tasks

export const { taskAdded, taskEdited, taskRemoved } = tasksSlice.actions
export default tasksSlice.reducer