import { useEffect, useState } from "react";
import "./App.css";
import { Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { message } from 'antd';
import { Select, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ModalAdd, ModalEdit, addData, completeData, deleteData, editData, filterData, idx, searchData, title, titleEditt } from "./reducers/todos";

function App() {

  const todos = useSelector((store)=> store.todos.todos)
  const titleEl = useSelector((store)=> store.todos.title)
  const search = useSelector((store)=> store.todos.searchTitle)
  const titleEdit = useSelector((store)=> store.todos.titleEdit)
  const filter = useSelector(({todos})=> todos.filterTodo)
  const modal = useSelector(({todos})=> todos.AddModal)
  const modalEdit = useSelector(({todos})=> todos.EditModal)
     const dispatch = useDispatch()

     const editDataEL=()=>{
      dispatch(editData())
     }
     const filterDataEl =(value)=>{
      dispatch(filterData(value))
     }
  return (
    <>
      <div className="flex items-center justify-center py-[50px]">
        <div className="w-[800px]">
          <h1 className="text-center font-[900] text-[40px] text-[#545454] py-[20px]">
            TODO LIST
          </h1>
          <div className="flex items-stretch justify-between py-[10px]">
            <button onClick={()=>dispatch(ModalAdd(true))}
              className="btn px-[20px] py-[10px] bg-[#6e6e6e] text-[#FFF] font-[500] rounded-[10px]"
            >
              <span className="relative z-5">
              Add Task
              </span>
            </button>
            <input
              type="search"
              placeholder="search"
              value={search}
              onChange={(e)=>dispatch(searchData(e.target.value))}
              className="w-[50%] px-[15px] outline-none border rounded-[5px]"
            />
             <Space wrap>
    <Select
      defaultValue="All"
      value={filter}
      style={{
        width: 120,
      }}
      onChange={filterDataEl}
      options={[
        {
          value: 'All',
          label: 'All',
        },
        {
          value: 'Complete',
          label: 'Complete',
        },
        {
          value: 'Uncomplete',
          label: 'Uncomplete',
        }
      ]}
    />
     </Space>
          </div>
          <div className="bg-[#e4e4e4] w-full border rounded-[10px] flex flex-col gap-[20px] py-[20px]">
            {todos.length===0?
              <div className="py-[20px] flex items-center justify-center">
                <span className=" px-[10px] py-[5px] bg-[#e5e1e1] rounded-[10px] font-[600] text-[#474646]">
                  No Todo Found
                </span>
              </div>:todos.filter((e)=>e.title.toLowerCase().includes(search.trim().toLowerCase())).length==0?
              <div className="py-[20px] flex items-center justify-center">
              <span className=" px-[10px] py-[5px] bg-[#d3d3d3] rounded-[10px] font-[600] text-[#474646]">
                No Result
              </span>
            </div>:todos.filter((e)=>e.title.toLowerCase().includes(search.trim().toLowerCase())).filter((e)=>{
                if(filter=="Complete"){
                  return e.complete
                }else if(filter=="Uncomplete"){
                  return !e.complete
                }else {
                  return e
                }
              }).map((elem)=>{
                return (
                    <div key={elem.id}
                      className="w-[95%] py-[10px] px-[10px] mx-auto rounded-[5px] bg-[#FFF] flex items-center justify-between"
                    >
                      <div className="flex items-center gap-[10px]">
                        <input
                          type="checkbox"
                          className="input"
                          checked={elem.complete}
                          onChange={()=>dispatch(completeData(elem.id))}
                        />
                        <div className="flex flex-col leading-[20px]">
                         {elem.complete?
                         <h1 className="font-[600] text-[#313030]">
                         <s>{elem.title}</s>
                       </h1>:<h1 className="font-[600] text-[#313030]">
                              {elem.title}
                            </h1>
                        }
                        <span className="text-[#313030] text-[15px]">{`${elem.data.getHours()<10? "0"+ elem.data.getHours() :elem.data.getHours()}:${
                            elem.data.getMinutes() < 10
                              ? "0" + elem.data.getMinutes()
                              : elem.data.getMinutes()
                          }, ${
                            elem.data.getMonth() < 10
                              ? "0" + (elem.data.getMonth() + 1)
                              : elem.data.getMonth() + 1
                          }/${elem.data.getDate()}/${elem.data.getFullYear()}`}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-[10px]">
                        {elem.status?
                        <h1>
                            <h1 className="text-[12px]">Edited</h1>
                        </h1>:null
                        }
                        <IconButton
                          aria-label="delete"
                          onClick={()=>dispatch(deleteData(elem.id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton onClick={()=> {(dispatch(titleEditt(elem.title)))
                       dispatch(ModalEdit(true))
                      dispatch(idx(elem.id))}}
                          aria-label="delete"
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                    </div>)
                  })}
          </div>
        </div>
      </div>
      {modal && (
        <div className="w-full h-[100vh] fixed top-0 left-0 bg-[#000000ba] flex items-center justify-center">
          <div className="w-[500px] h-[40vh] bg-[#e4e4e4] p-[20px] rounded-[10px] relative">
            <h1 className="text-[22px] font-[600] text-[#313030]">Add Task</h1>
            <button
            onClick={()=>dispatch(ModalAdd(false))}
              className="w-[30px] h-[30px] bg-[#e4e4e4] rounded-[5px] text-[#313030] absolute top-[-35px] right-0 flex items-center justify-center"
            >
              <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/close_111152.png" alt="close" className="w-full" />
            </button>
            <form 
                onSubmit={(e)=>{
                  e.preventDefault()
                  dispatch(addData())
               dispatch(ModalAdd(false))}}
              className="py-[20px] flex flex-col justify-between"
            >
              <div>
                <label
                  htmlFor="inputTitle"
                  className="font-[600] text-[#313030]"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="inputTitle"
                  value={titleEl}
                  required
                  onChange={(e)=>dispatch(title(e.target.value))}
                  className="w-full py-[10px] px-[10px] outline-none mt-[5px] rounded-[5px]"
                  
                />
              </div>
              <div className="py-[50px] flex items-center gap-[20px]">
                <button
                  className="px-[20px] py-[10px] bg-[#8839ea] text-[#FFF] font-[500] rounded-[10px]"
                >
                  Add Task
                </button>
                <button
                onClick={()=>dispatch(ModalAdd(false))}
                  className="px-[20px] py-[10px] bg-[#6e6e6e] text-[#FFF] font-[500] rounded-[10px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>)}
        {modalEdit && (
        <div className="w-full h-[100vh] fixed top-0 left-0 bg-[#000000ba] flex items-center justify-center">
          <div className="w-[500px] h-[40vh] bg-[#e4e4e4] p-[20px] rounded-[10px] relative">
            <h1 className="text-[22px] font-[600] text-[#313030]">Add Task</h1>
            <button
            onClick={()=>dispatch(ModalEdit(false))}
              className="w-[30px] h-[30px] bg-[#e4e4e4] rounded-[5px] text-[#313030] absolute top-[-35px] right-0 flex items-center justify-center"
            >
              <img src="https://cdn.icon-icons.com/icons2/1674/PNG/512/close_111152.png" alt="close" className="w-full" />
            </button>
            <form onSubmit={(e)=>{
              e.preventDefault()
              editDataEL()
                 dispatch(ModalEdit(false))}}
              className="py-[20px] flex flex-col justify-between"
            >
              <div>
                <label
                  htmlFor="inputTitle"
                  className="font-[600] text-[#313030]"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="inputTitle"
                  value={titleEdit}
                  onChange={(e)=>dispatch(titleEditt(e.target.value))}
                  required
                  className="w-full py-[10px] px-[10px] outline-none mt-[5px] rounded-[5px]"
                />
              </div>
              <div className="py-[50px] flex items-center gap-[20px]">
                <button
                  className="px-[20px] py-[10px] bg-[#8839ea] text-[#FFF] font-[500] rounded-[10px]"
                >
                  Edit Task
                </button>
                <button
                onClick={()=>dispatch(ModalEdit(false))}
                  className="px-[20px] py-[10px] bg-[#6e6e6e] text-[#FFF] font-[500] rounded-[10px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div> )}
</>
  );
}

export default App;
