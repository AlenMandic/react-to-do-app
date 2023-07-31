export function UserInput({ inputValue, handleInput, handleAdd }) {

    return(

        <>
        <h1>Your task list 📜</h1>
        <h2>New Task 🖋</h2>
        <input type="text" id="main-text" placeholder="Add item" value={inputValue} onChange={handleInput}></input>
        <button onClick={handleAdd} id="add">Add</button>

        <h2 style={{ marginTop: '40px' }}>Current tasks: </h2>
        <div className="input-wrapper"></div>
        </>
        
    )
}