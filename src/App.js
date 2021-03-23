// import logo from './logo.svg';
import './App.css';
import List from './List'
import Alert from "./Alert";
import React, { useState,useEffect } from "react";

const getLocalStorage=()=>{
  let list=localStorage.getItem("list")
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}
function App() {
  const [name,setName]=useState('')
  const [list,setList]=useState(getLocalStorage)
  const [isEditing,setIsEditing]=useState(false)
  const [editID,setEditID]=useState(null)
  const [alert,setAlert]=useState({show:false,msg:'',type:''})
  
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!name){
      //display alert
      showAlert(true,"danger","Enter value")
      
    }
    else if (name&&isEditing){
      // console.log(name, isEditing)
      // //deal with edit
      setList(list.map((item)=>{
        if (item.id===editID) {
          return {...item,title:name}
        }
        return item
      }))
  
      setName('')
      setEditID(null)
      setIsEditing(false)
      setAlert(true,'success',"value changed")
    }
    else{
        //show alert
        showAlert(true,'success','item added to the list')
        const newItem={id:new Date().getTime().toString(),title:name}
        setList([...list,newItem])
        setName('')
    }
  }
  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  const clearList=()=>{
    showAlert(true,"success","Empty List")
    setList([])
  }
  const removeItem=(id)=>{
    showAlert(true,'success','Item Deleted')
    setList(list.filter((item)=>item.id!==id))
  }
  const editItem=(id)=>{
    const specificId=list.find((item)=>item.id===id)
    setIsEditing(true)
    setEditID(id)
    setName(specificId.title)
  }
  useEffect(()=>{
    localStorage.setItem("list",JSON.stringify(list))
  },[list])

  return (
    <section className="section-center">
      <form className="grocery-form" onClick={handleSubmit}>
        {alert.show && <Alert {...alert} 
        removeAlert={showAlert}
        list={list}
        />}

        <h3> grocery items </h3>

        <div className="form-control">
          <input type="text" className="grocery" placeholder="e.g. eggs" value={name} onChange={(e)=>setName(e.target.value)}/>
          <button type="submit" className="submit-btn">
            {isEditing?"edit":"submit"}
          </button>
        </div>
        
      </form>

      <div className="grocery-container">
        <List items={list} removeItem={removeItem} editItem={editItem}/>
        {list.length>0&&(
          <button className="clear-btn" onClick={clearList}>clear items</button>
        )}
      </div>

    </section>
  );
}

export default App;
