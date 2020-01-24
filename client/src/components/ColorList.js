import React, { useState } from "react";
import {axiosWithAuth} from '../tools/axiosAuth';
import NewColor from './NewColor';

const initialColor = {
  color: "",
  code: { hex: "" },
  id: 0,
};

const ColorList = (props) => {
  // console.log(props.colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
  
  console.log(colorToEdit)
  props.updateItem(colorToEdit.id, colorToEdit)
  
  
    
  };

  const deleteColor = color => {
    props.deleteItem(color.id);
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {props.colors ? props.colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>X
                
              </span>{"  "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        )) : <h1>Loading</h1>}
      </ul>
      <NewColor
      addColor={props.addColor} />
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        
      )}
      <div className="spacer" />
      
    </div>
  );
};

export default ColorList;
