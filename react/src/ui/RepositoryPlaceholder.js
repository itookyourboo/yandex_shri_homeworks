import configIcon from '../img/124_config.svg'
import TextButton from "./TextButton";
import {Link} from "react-router-dom";
import Text from "./Text";

function RepositoryPlaceholder() {
    const divStyle = {
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        gap: "22px",
        width: "264px"
    }

    const placeholderText = "Configure repository connection and synchronization settings";

    return (
        <div style={divStyle}>
            <img src={configIcon} alt="Config" width="124px" height="124px"/>
            <Text text={placeholderText} color="#000000"/>
            <Link to="/settings" style={{ textDecoration: 'none' }}>
                <TextButton color="yellow" text="Open settings"/>
            </Link>
        </div>
    );
}

export default RepositoryPlaceholder;
