

function TextBox({ type="", text=""}) {
    return <div className="TextBox">
        <h2>{ type }</h2>
        <p>{ text }</p>
    </div>
}

export default TextBox;