import { createSlice } from "@reduxjs/toolkit";


export const todos = createSlice({
    name:"todos",
    initialState:{
        todos:[
            {
                id:1,
                title:"idibek",
                complete:false,
                status:false,
                data:new Date()

            },
            {
                id:2,
                title:"scbshj",
                complete:false,
                status:false,
                data:new Date()
            }
        ],
        title:"",
        idx:null,
        titleEdit:"",
        searchTitle:"",
        filterTodo:"All",
        AddModal:false,
        EditModal:false
    },
    reducers:{
        ModalAdd:(state,action)=>{
            state.AddModal=action.payload
        },
        ModalEdit:(state,action)=>{
            state.EditModal=action.payload
        },
        filterData:(state, action)=>{
            state.filterTodo = action.payload
        },
        searchData:(state, action) => {
            state.searchTitle=action.payload
        },
        title:(state, action)=>{
            state.title = action.payload
        },
        titleEditt:(state, action)=>{
            state.titleEdit = action.payload
        },
        idx:(state, action)=>{
            state.idx = action.payload
        },
        deleteData:(state, action)=>{
            state.todos = state.todos.filter((e)=> e.id !==action.payload)
        },
        addData:(state)=>{
            let obj = {
                id:new Date().getTime(),
                title:state.title,
                complete:false,
                status:false,
                data:new Date()
            }
            state.title=""
            state.todos.push(obj)
        },
        editData:(state) => {
            state.todos=state.todos.map((e)=>{
                if(e.id==state.idx){
                    if(e.title!==state.titleEdit){
                        e.title=state.titleEdit
                        e.status=!e.status
                    }else{
                        return e
                    }
                }
                return e
            })
        },
        completeData:(state,action) => {
            state.todos=state.todos.map((e)=>{
                if(e.id==action.payload){
                    e.complete  = !e.complete
                }
                return e
            })
        }
    }
})
export const {deleteData,title,addData,completeData,idx,editData,searchData, titleEditt,filterData,ModalAdd, ModalEdit} = todos.actions
export default todos.reducer