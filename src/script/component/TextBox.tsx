

function TextBox({ type = "", text = "" }) {
    const contetnText = (type == "Link") ? (<a className="TextBoxLink" href={text}>{ text }</a>) : (<p>{text}</p>);
    return <div className="TextBox">
        <h2>{type}</h2>
        {contetnText}
    </div>
}

export default TextBox;