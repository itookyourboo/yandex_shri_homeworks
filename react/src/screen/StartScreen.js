import '../css/UI.css'
import '../css/App.css'
import ImageTextButton from "../ui/ImageTextButton";
import settingsIcon from '../img/12_settings.svg'
import RepositoryPlaceholder from "../ui/RepositoryPlaceholder";
import Text from "../ui/Text";
import Media from "react-media";

function StartScreen() {
    return (
        <div className="StartScreen">
            <div className="innerPad header">
                <Text text="School CI server" fontWeight="500" fontSize="24px" lineHeight="28px"/>
                <Media query="(max-width: 600px)">
                    {matches =>
                        <ImageTextButton color='gray' src={settingsIcon} text="Settings" withText={!matches}/>
                    }
                </Media>
            </div>
            <div className="innerPad StartScreen-main">
                <RepositoryPlaceholder/>
            </div>
        </div>
    );
}

export default StartScreen;