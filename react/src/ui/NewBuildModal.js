import Text from "./Text";
import TextField from "./TextField";
import TextButton from "./TextButton";
import {useState} from "react";

function NewBuildModal(props) {
    const [state, setState] = useState("");

    return (
        <div className="modal">
            <div className="modal-content">
                <Text text="New build" fontWeight="600" fontSize="18px" lineHeight="22px" color="#000000"/>
                <Text text="Enter the commit hash which you want to build" fontWeight="400" color="#000000"/>
                <TextField hint="Commit hash" withCancel={true} onChange={event => {
                    setState(event.target.value);
                }}/>
                <div className="SettingsScreen-frame-buttons">
                    <TextButton text="Run build" color="yellow" onClick={() => {
                        props.onRunClick(state);
                    }}/>
                    <TextButton text="Cancel" color="white" onClick={props.onCancelClick}/>
                </div>
            </div>
        </div>
    );
}

export default NewBuildModal;
