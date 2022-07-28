import '../css/UI.css'
import Text from "./Text";

function ImageTextButton(props) {
    const btnStyle = {
        borderRadius: 4,
        padding: props.withText? "0px 12px 0px 8px": "10px 10px 10px 10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "5.5px"
    }

    return (
        <div title={props.text} className={"button " + (props.color || 'gray')} style={btnStyle} onClick={props.onClick}>
            <img width="12px" height="12px" src={props.src} alt={props.text}/>
            {props.withText && <Text text={props.text} lineHeight="28px" color="#000000"/> }
        </div>
    );
}

export default ImageTextButton;
