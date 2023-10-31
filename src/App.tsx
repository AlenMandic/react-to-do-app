import React, { useState } from 'react';
import { TodoItem } from './todo-item';
import { UserInput } from './user-input';
import './style.css';

type localStorageStructure = { checked: boolean; id: string; name: string };

function MainInput() {
  
  // this will use data which we will pass in from our TodoItem component.
  const [inputValue, setInputValue] = useState('')
  const [items, setItems] = useState(() => {

    const localState = JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[];
    return localState ? localState : []
  })

  function handleCheckBoxState(itemId:string, isChecked:boolean) {
    const existingData = JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[] || [];
    const indexToUpdate = existingData.findIndex((item) => item.id === itemId);

    if (indexToUpdate !== -1) {
      const updatedData = [...existingData];
      updatedData[indexToUpdate].checked = isChecked;
      localStorage.setItem('localState', JSON.stringify(updatedData));
    }
  }

  function handleAdd() {
    if (inputValue === '') {
      return
    } else {
      // generate a unique ID for each of my localStorage items.
      const randomString = Math.random().toString(36).substring(2, 5);
      const uniqueId = `${randomString}_${new Date().getTime()}`;

      localStorage.setItem('localState', JSON.stringify([...items, { name: inputValue, checked: false, id: uniqueId }]))

      setItems(JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[])
      setInputValue('')
    }
  }

  function handleInput(e:React.SyntheticEvent) {
    setInputValue((e.target as HTMLInputElement).value)
  }

  function deleteCallback(index: number) {
    const updatedItems = JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[];

    localStorage.setItem('localState', JSON.stringify([...updatedItems].filter((item, i) => i !== index)))
    setItems(JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[])
  }

  return (
      <div className="input-wrapper">
      <UserInput inputValue={inputValue} handleInput={handleInput} handleAdd={handleAdd} />

        <div className="todo-wrapper">
          {
            items.map((item, index) => (
              <TodoItem
                content={item.name}
                key={index}
                index={Number(index)}
                onDelete={deleteCallback}
                onCheckboxChangeCallback={(isChecked) => handleCheckBoxState(item.id, isChecked)}
              />
            ))
          }
        </div>
      </div>
  )
}

export default function App() {
  return (
    <div className="main-wrapper">
      <MainInput />
    </div>
  )
}
