import { useState } from 'react'

export function TodoItem({ content, index, onDelete, onCheckboxChangeCallback }) {

  const [checkBox, setCheckBox] = useState(false)

  function handleCheck(e) {
    const isChecked = e.target.checked

    setCheckBox(!checkBox)
    onCheckboxChangeCallback(isChecked)
  }

  function handleDelete() {
    onDelete(index)
  }
  // retrieve our current localStorage ( which updates on every state change ), and see which items need to be checked on page reloads.
  const isItemChecked = JSON.parse(localStorage.getItem('localState'));
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
      <button onClick={handleDelete} id={index}><img src='/images/remove.png' alt='bin icon' className="bin-image" /></button>
    </div>
  )
}