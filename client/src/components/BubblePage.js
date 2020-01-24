import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../tools/axiosAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
useEffect(() => {
  // axiosWithAuth()
  // .get('http://localhost:5000/api/colors')
  // .then(res => {
  //   console.log(res);
  //   setColorList(res.data);
  // })
  // .catch(err => {
  //   console.log(err);
  // })

  setColorList(props.colorData)
},[colorList])

const updateItem = (id, color) => {
  axiosWithAuth()
  .put(`http://localhost:5000/api/colors/${id}`, color)
  .then(res => {
    console.log('data',res.data)
    console.log(props.colorData)
   let result = props.colorData.map(item => {
      if(item.id === res.data.id) {
        item = res.data;
      }
    })
    console.log(props.colorData);
    props.setColorData(result);
  })
  .catch(err => {
    console.log(err);
  })
}

const deleteItem = id => {
  axiosWithAuth().delete(`http://localhost:5000/api/colors/${id}`)
    .then( res => {
      console.log(res)
      
      let result = colorList.filter(item => {
        return item.id !== res.data.id
      })
      props.setColorData(result);

    })
    .catch(err => {
      console.log(err);
    })

}



  return (
    <>
      <ColorList colors={colorList} 
      updateColors={setColorList}
      updateItem={updateItem}
      deleteItem={deleteItem}
      />
      <Bubbles colors={colorList} />
    </>
  );
}; 

export default BubblePage;
