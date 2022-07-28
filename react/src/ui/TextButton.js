import '../css/UI.css'
import Text from "./Text";

function TextButton(props) {
    const btnStyle = {
        borderRadius: 4,
        padding: "0 20px"
    }
    let className = "button ";
    if (props.disabled) className += "disabled";
    else className += (props.color || 'gray')

    return (
        <div className={className} style={btnStyle} title={props.text}
             onClick={props.onClick}>
            <Text text={props.text} lineHeight="36px" color="#000000"/>
        </div>
    );
}

export default TextButton;
