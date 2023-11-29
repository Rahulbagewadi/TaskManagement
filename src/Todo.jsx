import { useState } from "react"

const Todo=()=>{
    const [showForm,setShowForm]=useState(true)
    const[showNew, setShowNew]=useState(true)
    const[showList,setShowList]=useState(true)
    const [inputTitle,setInputTitle]=useState("")
    const [inputDesc, setInputDesc]=useState('')
    const[toggleSubmit,setToggleSubmit]=useState(true)
    const [isEditItem,setIsEditItem]=useState(null)
    const[showDelete,setShowDelete]=useState(true)
    const [editMessage,setEditMessage]=useState(false)
    const [deleteMessage,setDeleteMessage]=useState(false)
    const[deleteMessageSuccess,setDeleteMessageSuccess]=useState(false)
    const [items, setItems]=useState([
        {
            id:'001',
            name:'Default Task',
            desc:'Default Description',
            status:false
        },
    ])

    //Adding new task
    const handleAdd=()=>{
        setShowForm(true)
        setShowList(true)
        setShowNew(false)
    }
    const handleInput =(e)=>{
       setInputTitle(e.target.value)
    }
    const handleInputDesc =(e)=>{
        setInputDesc(e.target.value)
    }

    const handleSubmit=(e)=>{
        setShowList(true)
        setShowNew(true)

      e.preventDefault();
      if(!inputDesc||!inputTitle){
        alert('fill data')
        showList(false)
      }
      else if(inputTitle&& !toggleSubmit){
        setItems(
            items.map((elem)=>{
                if(elem.id===isEditItem){
                    return{...elem,name:inputTitle,desc:inputDesc}
                }
                return elem;
            })
        );

        setInputTitle('')
        setInputDesc('')
        setToggleSubmit(true)
        setShowForm(false)
        setShowDelete(true)
      }
      else{
        const allInputTitle={
            id:new Date().getTime().toString(),
            name:inputTitle,
            desc:inputDesc,
        };
        setItems([allInputTitle,...items]);
        setInputTitle('');
        setInputDesc('')
        setShowForm(false)
      }
    }

    const handleDelete=(index)=>{
        console.log(index);
        const updateItems=items.filter((elem)=>{
            return index!==elem.id
        });
        setDeleteMessage(true);

        setTimeout(()=>{
            setItems(updateItems);
            setDeleteMessage(false)
        },2000)
        setDeleteMessageSuccess(false)
    }

    const handleEdit=(id)=>{
          setShowList(false)
          setShowDelete(false)
          setShowNew(false)
          setShowForm(true);

          setToggleSubmit(false);
          let newEditItem=items.find((elem)=>{
            return elem.id===id;
          });
          setInputTitle(newEditItem.name)
          setInputDesc(newEditItem.desc)

          setIsEditItem(id)
          console.log(newEditItem);

    }


   
return(
   <>
   { showNew ?(
   <div className="container">
    <div>
        <button className="btn " onClick={handleAdd}>Add New Task</button>
    </div>
   </div>):(
    ''
   )}

   { showForm?(
    <>
   <div className="container ">
    <div >
        <div >
            <h2>{toggleSubmit ?"Add Task":"Edit Task"}</h2>
            <form className="form form-row form-input form-textarea" onSubmit={handleSubmit}>
                <label htmlFor="title" className="label">
                    Enter Title
                </label>
                <input
                 type="text"
                 name="title"
                 id="title"
                 placeholder="title"

                 onChange={handleInput}
                 value={inputTitle} />
                 <label className="label" htmlFor="description">
                    Enter
                 </label>
                 <input 
                 type="text" 
                 name="description"
                 id="description"
                 placeholder="Description"            
                onChange={handleInputDesc}
                 value={inputDesc}/>
                 {toggleSubmit ?(
                 <button className="btn btn-block">Save</button>
                 ):(<button className="btn ">Edit</button>)}
            </form>
        </div>
    </div>
   </div>
   </>):(
    ''
   )}
   {showList ?(
    <div>
        {
         deleteMessage ? (
            <p >Item deleted Successfully</p>
         ):(
            ""
         )   
        }
        {items.map((elem,index)=>{
            return(
                <div 
                key={elem.id}>
                    <div className="cont2">
                         <div>
                            <h4>{elem.name}</h4>
                            <p>{elem.desc}</p>
                         </div>
                         <button className="btn1 btn"
                        onClick={()=>handleEdit(elem.id)} >
                            Edit
                         </button>
                         {showDelete ?(
                            <button className="btn1 btn "
                            onClick={()=>{handleDelete(elem.id)}}>
                             Delete
                            </button>
                         ):(
                            ""
                         ) }
                    </div>
                </div>
            );
        })}
    </div>
   ):(
    ''
   )

   }
   </>

);
};
export default Todo