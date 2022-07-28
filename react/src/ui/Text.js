function Text(props) {
    const divStyle = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "2px 0px"
    }

    const textStyle = {
        fontFamily: '"Yandex Sans Text Regular", sans-serif',
        fontStyle: props.fontStyle || "normal",
        fontWeight: props.fontWeight || "normal",
        fontSize: props.fontSize || "13px",
        lineHeight: props.lineHeight || "16px",

        color: props.color || "#7F8285"
    }

    const starStyle = {
        color: "#ff0000",
        marginLeft: "2px"
    }

    return (
        <div style={divStyle}>
            <div style={textStyle}>{props.text}</div>
            {props.required && <span style={starStyle}>*</span>}
        </div>
    )
}


export default Text;
