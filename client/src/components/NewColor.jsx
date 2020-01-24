import React, {useState} from 'react';

const NewColor = (props) => {
    const [newColor, setNewColor] = useState({
        color: '',
        code: {hex: ''},
        id: Date.now()
    })

    const changeHandler = e => {
        setNewColor({...newColor,[e.target.name]: e.target.value})
    }

    const submitHandler = e => {
        e.preventDefault();
        props.addColor(newColor);
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                <input 
                name='color'
                value={newColor.color}
                placeholder='Color Name'
                type="text"
                onChange={changeHandler}
                />
                
                <input 
                name='code'
                value={newColor.code.hex}
                placeholder='Enter Hex Code!'
                type="text"
                onChange={e =>
                    setNewColor({
                      ...newColor,
                      code: { hex: e.target.value }
                    })}
                />
                <button>Add Color!</button>
            </form>
            
        </div>
    );
}

export default NewColor;
