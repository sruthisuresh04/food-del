// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const List = ({url}) => {
  
// const [list, setList] = useState([]);



// const  fetchList = async () => {
//   const response = await axios.get(`${url}/api/food/list`);
//   if(response.data.success) {
//     setList(response.data.data);
    
//   }
//   else {
//     toast.error("Error")
// }
// }

// const removeFood = async (foodId) => {
//    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
//    await fetchList();
//    if(response.data.success) {
//     toast.success("Food Removed Successfully");
//    }
//    else {
//     toast.error("Error Removing Food");
//    }
// }

// useEffect(()=>{
//   fetchList();
// },[])

//   return (
//     <div className='list add flex-col'>
//       <p>All Fodds List</p>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>

//         </div>
//        { list.map((item, index) => {
//         return (
//           <div className="list-table-format" key={index}>
//             <img src={`${url}/images/`+item.image} alt="" />
//             <p>{item.name}</p>
//             <p>{item.category}</p>
//             <p>{item.price}</p>
//             <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
//           </div>
//         )

//        })}
//       </div>
    
//     </div>
//   )
// }

// export default List



// 

// import React, { useEffect, useState } from 'react'
// import './List.css'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const List = ({url}) => {
//   const [list, setList] = useState([]);
//   const [editId, setEditId] = useState(null);
//   // const [editData, setEditData] = useState({ name: '', category: '', price: '' });
//   const [editData, setEditData] = useState({ name: '', category: '', price: '', description: '' });

//   const fetchList = async () => {
//     const response = await axios.get(`${url}/api/food/list`);
//     if(response.data.success) {
//       setList(response.data.data);
//     } else {
//       toast.error("Error")
//     }
//   }

//   const removeFood = async (foodId) => {
//     const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
//     await fetchList();
//     if(response.data.success) {
//       toast.success("Food Removed Successfully");
//     } else {
//       toast.error("Error Removing Food");
//     }
//   }

//   // const startEdit = (item) => {
//   //   setEditId(item._id);
//   //   setEditData({ name: item.name, category: item.category, price: item.price });
//   // };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditData(prev => ({ ...prev, [name]: value }));
//   };

  

// const startEdit = (item) => {
//   setEditId(item._id);
//   setEditData({
//     name: item.name,
//     category: item.category,
//     price: item.price,
//     description: item.description || ''
//   });
// };

//   const saveEdit = async () => {
//     const response = await axios.post(`${url}/api/food/update`, {
//       id: editId,
//       ...editData
//     });
//     if (response.data.success) {
//       toast.success("Food Updated Successfully");
//       setEditId(null);
//       fetchList(); // Only refresh your own list
//     } else {
//       toast.error("Error Updating Food");
//     }
//   };

//   const categories=[
//      "salad",
//   "pure veg",
//   "Sandwich",
//   "Pasta",
//   "Dessert",
//   "cake",
//   'noodles'
//   ]
   

//   useEffect(()=>{
//     fetchList();
//   },[])

//   return (
//     <div className='list add flex-col'>
//       <div className="list-table">
//         <div className="list-table-format title">
//           <b>Image</b>
//           <b>Name</b>
//           <b>Category</b>
//           <b>Price</b>
//           <b>Action</b>
//         </div>
//         {list.map((item) => (
//           <div className="list-table-format" key={item._id}>
//             <img src={`${url}/images/`+item.image} alt="" />
//            {editId === item._id ? (
//   <>
//     <input name="name" value={editData.name} onChange={handleEditChange} />
//     <input name="category" value={editData.category} onChange={handleEditChange} />
//     <input name="price" type="number" value={editData.price} onChange={handleEditChange} />
//     <input name="description" value={editData.description} onChange={handleEditChange} placeholder="Description" />
//     <button onClick={saveEdit} disabled={!editData.name || !editData.category || !editData.price}>Save</button>
//     <button onClick={() => setEditId(null)}>Cancel</button>
//   </>
// ) : (
//   <>
//     <p>{item.name}</p>
//     <p>{item.category}</p>
//     <p>{item.price}</p>
//     <button onClick={() => startEdit(item)}>Edit</button>
//   </>
// )}
//             <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default List


import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ name: '', category: '', price: '', description: '' });

  const categories = [
    "Salad",
    "Pure Veg",
    "Sandwich",
    "Pasta",
    "Deserts",
    "Cake",
    "Noodles",
    "Rolls",
    "juice",
    "Rice"
  ];

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    if(response.data.success) {
      toast.success("Food Removed Successfully");
    } else {
      toast.error("Error Removing Food");
    }
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setEditData({
      name: item.name,
      category: item.category,
      price: item.price,
      description: item.description || ''
    });
  };

  const saveEdit = async () => {
    const response = await axios.post(`${url}/api/food/update`, {
      id: editId,
      ...editData
    });
    if (response.data.success) {
      toast.success("Food Updated Successfully");
      setEditId(null);
      fetchList();
    } else {
      toast.error("Error Updating Food");
    }
  };

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div className="list-table-format" key={item._id}>
            <img src={`${url}/images/`+item.image} alt="" />
            {editId === item._id ? (
              <>
                <input name="name" value={editData.name} onChange={handleEditChange} />
                <select
                  name="category"
                  value={editData.category}
                  onChange={handleEditChange}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
                <input name="price" type="number" value={editData.price} onChange={handleEditChange} />
                <input name="description" value={editData.description} onChange={handleEditChange} placeholder="Description" />
                <button onClick={saveEdit} disabled={!editData.name || !editData.category || !editData.price}>Save</button>
                <button onClick={() => setEditId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{item.price}</p>
                <button onClick={() => startEdit(item)}>Edit</button>
              </>
            )}
            <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List