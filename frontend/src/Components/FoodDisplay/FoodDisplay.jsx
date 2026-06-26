// import React from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../Context/StoreContext';
// import { useContext } from 'react';
// import FoodItem from '../FoodItem/FoodItem';

// const FoodDisplay = ({category}) => {
// const {food_list}= useContext(StoreContext);

//   return (
//     <div className='food-display' id='food-display'>
//   <h2>Top dishes near you</h2>
//    <div className="food-display-list">
//     {food_list.map((item,index) =>{
//         if(category==="All" || category===item.category){
//                 // If the category is "All" or matches the item's category, display the item
//                 // Note: The comparison operator should be '===' instead of '=' for equality check
//                 // Also, ensure that the category is case-sensitive if needed
//               return(
//                 <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
//                )
//         }
           
               
//     } )}
//    </div>
//     </div>
//   )
// }

// export default FoodDisplay



// import React, { useContext } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../Context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({ category }) => {
//   const { food_list } = useContext(StoreContext);

//   // const filteredFoods = category === "All"
//   //   ? food_list
//   //   : food_list.filter(item => item.category === category);

//   const filteredFoods = category === "All"
//   ? food_list
//   : food_list.filter(item => item.category.trim().toLowerCase() === category.trim().toLowerCase())




//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {filteredFoods.map((item, index) => (
//           <FoodItem
//             key={item._id || index}
//             id={item._id}
//             name={item.name}
//             description={item.description}
//             price={item.price}
//             image={item.image}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default FoodDisplay

// ...existing code...
import React, { useContext, useEffect } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext) || {};

  useEffect(() => {
    console.log('FoodDisplay -> selected category:', category);
    console.log('FoodDisplay -> food_list (length):', Array.isArray(food_list) ? food_list.length : 0);
    // show first few items for quick debugging
    if (Array.isArray(food_list)) console.log('FoodDisplay -> sample items:', food_list.slice(0,5));
  }, [category, food_list]);

  const items = Array.isArray(food_list) ? food_list : [];

  const filteredFoods = category === "All"
    ? items
    : items.filter(item => (item.category || '').trim().toLowerCase()
        === (category || '').trim().toLowerCase());

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {items.length === 0 && <p>No food data available (food_list is empty).</p>}
        {items.length > 0 && filteredFoods.length === 0 && <p>No items for "{category}".</p>}
        {filteredFoods.map((item, index) => (
          <FoodItem
            key={item._id || `${item.name}-${index}`}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  )
}

export default FoodDisplay
// ...existing code...