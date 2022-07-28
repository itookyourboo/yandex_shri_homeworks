function TextField(props) {
    const textStyle = {
        width: props.width || "100%",
        textAlign: props.textAlign || "left"
    };

    return (
        <input defaultValue={props.value} style={textStyle} type={props.withCancel ? "search" : "text"}
               className="text-field" placeholder={props.hint} onChange={props.onChange}/>
    );
}

export default TextField;
