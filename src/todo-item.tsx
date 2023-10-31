import React, { useState } from 'react'

type localStorageStructure = { checked: boolean; id: string; name: string };

interface TodoItemProps {
  content: string,
  index: number,
  onDelete: (parameterOne: number) => void,
  onCheckboxChangeCallback: (parameterOne: boolean) => void,
}

export function TodoItem({ content, index, onDelete, onCheckboxChangeCallback }:TodoItemProps) {

  const [checkBox, setCheckBox] = useState(false)

  function handleCheck(e:React.SyntheticEvent) {
    const isChecked = (e.target as HTMLInputElement).checked

    setCheckBox(!checkBox)
    onCheckboxChangeCallback(isChecked)
  }

  function handleDelete() {
    onDelete(index)
  }
  // retrieve our current localStorage ( which updates on every state change ), and see which items need to be checked on page reloads.
  const isItemChecked = JSON.parse(localStorage.getItem('localState') || 'null') as localStorageStructure[];
  const isChecked = isItemChecked[index]?.checked || false;

  const textContent = isChecked ? (
    <p style={{ textDecoration: 'line-through', color: '#d87676' }}>{content}</p>
  ) : (
    <p>{content}</p>
  );

  return (
    <div className="items">
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      {textContent}
      <button onClick={handleDelete} id={String(index)}><img src='/src/remove.png' alt='bin icon' className="bin-image" /></button>
    </div>
  )
}