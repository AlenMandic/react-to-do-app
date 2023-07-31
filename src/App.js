import React, { useState } from 'react'
import { TodoItem } from './TodoItem';

function MainInput() {
  
  // this will use data which we will pass in from our TodoItem component.
  const [checkboxState, setCheckboxState] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(() => {

    const localState = JSON.parse(localStorage.getItem('localState'));
    return localState ? localState : []
  })

  function handleCheckBoxState(itemId, isChecked) {
    setCheckboxState(isChecked);
    const existingData = JSON.parse(localStorage.getItem('localState')) || [];
    const indexToUpdate = existingData.findIndex((item) => item.id === itemId);

    if (indexToUpdate !== -1) {
      const updatedData = [...existingData];
      updatedData[indexToUpdate].checked = isChecked;
      localStorage.setItem('localState', JSON.stringify(updatedData));
    }
  }

  function handleAdd(e) {
    if (inputValue === '') {
      return
    } else {
      // generate a unique ID for each of my localStorage items.
      const randomString = Math.random().toString(36).substring(2, 5);
      const uniqueId = `${randomString}_${new Date().getTime()}`;

      localStorage.setItem('localState', JSON.stringify([...items, { name: inputValue, checked: false, id: uniqueId }]))

      setItems(JSON.parse(localStorage.getItem('localState')))
      setInputValue('')
    }
  }

  function handleInput(e) {
    setInputValue(e.target.value)
  }

  function deleteCallback(index) {
    localStorage.setItem('localState', JSON.stringify([...items].filter((item, i) => i !== index)))
    setItems(JSON.parse(localStorage.getItem('localState')))
  }

  return (
    <>
      <div className="input-wrapper">
        <h1>Your task list</h1>
        <h2>New Task</h2>
        <input type="text" id="main-text" placeholder="Add item" value={inputValue} onChange={handleInput}></input>
        <button onClick={handleAdd} id="add">Add</button>

        <h2 style={{ marginTop: '40px' }}>Current tasks: </h2>
        <div className="input-wrapper"></div>
        <div className="todo-wrapper">
          {
            items.map((item, index) => (
              <TodoItem
                content={item.name}
                key={index}
                index={index}
                onDelete={deleteCallback}
                onCheckboxChangeCallback={(isChecked) => handleCheckBoxState(item.id, isChecked)}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="main-wrapper">
      <MainInput />
    </div>
  )
}
