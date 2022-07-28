import Text from "../ui/Text";
import TextField from "../ui/TextField";
import TextButton from "../ui/TextButton";
import {useState} from "react";
import {useHistory} from "react-router-dom";

function SettingsScreen(props) {
    const [settings, setSettings] = props.settings;
    const [disableState, setDisableState] = useState(false);
    const [values, setValues] = useState({
        repository: [validateRepository(settings.repository), settings.repository],
        command: [validateCommand(settings.command), settings.command],
        branch: [true, settings.branch],
        sync: [validateSync(settings.sync), settings.sync]
    });
    const history = useHistory();

    return (
        <div className="SettingsScreen">
            <div className="innerPad header">
                <Text text="School CI server" fontWeight="500" fontSize="24px" lineHeight="28px"/>
            </div>
            <div className="innerPad SettingsScreen-main">
                <div className="SettingsScreen-frame">
                    <div className="SettingsScreen-frame-title">
                        <Text text="Settings" fontWeight="bold" fontSize="15px" lineHeight="20px" color="#000000"/>
                        <Text text="Configure repository connection and synchronization settings" lineHeight="18px"/>
                    </div>
                    <div>
                        <Text text="GitHub repository" fontWeight="400" color="#000000" required={true}/>
                        <TextField value={settings.repository} hint="user-name/repo-name" withCancel={true}
                                   onChange={event => {
                                       const value = event.target.value;
                                       setValues({...values,
                                           repository: [validateRepository(value), value]
                                       });
                                   }}/>
                    </div>
                    <div>
                        <Text text="BuildCommand" fontWeight="400" color="#000000" required={true}/>
                        <TextField value={settings.command} hint="npm ci && npm run build" withCancel={true}
                                   onChange={event => {
                                       const value = event.target.value;
                                       setValues({...values,
                                           command: [validateCommand(value), value]
                                       });
                                   }}/>
                    </div>
                    <div>
                        <Text text="Main branch" fontWeight="400" color="#000000"/>
                        <TextField value={settings.branch} hint="master" withCancel={true} onChange={event => {
                            const value = event.target.value;
                            setValues({...values,
                                branch: [true, value]
                            });
                        }}/>
                    </div>
                    <div className="SettingsScreen-frame-sync">
                        <Text text="Synchronize every" fontWeight="400" color="#000000"/>
                        <TextField value={settings.sync} hint="10" withCancel={false} width="52px" textAlign="right"
                                   onChange={event => {
                                       const value = event.target.value;
                                       setValues({...values,
                                           sync: [validateSync(value), value]
                                       });
                                   }}/>
                        <Text text="minutes" fontWeight="400" color="#000000"/>
                    </div>
                    <div className="SettingsScreen-frame-buttons">
                        <TextButton text="Save" color="yellow" disabled={disableState} onClick={() => {
                            if (!Object.values(values).every(x => x[0] === true))
                                return;

                            setSettings({
                                repository: values.repository[1],
                                command: values.command[1],
                                branch: values.branch[1],
                                sync: values.sync[1]
                            });

                            setDisableState(true);
                            setTimeout(function () {
                                setDisableState(false);
                                history.push('/')
                            }, 2000);
                        }}/>
                        <TextButton text="Cancel" color="gray" disabled={disableState} onClick={() => {
                            history.goBack();
                        }}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function validateRepository(str) {
    return /.+\/.+/.test(str);
}

function validateCommand(str) {
    return str.length !== 0;
}

function validateSync(str) {
    try {
        parseInt(str);
        return true;
    } catch (err) {
        return false;
    }
}

export default SettingsScreen;