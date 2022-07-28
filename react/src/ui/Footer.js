import '../css/UI.css'
import '../css/App.css'
import {Link} from "react-router-dom";
import Text from "./Text";

function Footer() {
    const noUnderline = {
        textDecoration: "none"
    };

    return (
        <footer className="App-footer">
            <div className="App-footer-items">
                <Link style={noUnderline} to="/">
                    <Text text="Support"/>
                </Link>
                <Link style={noUnderline} to="/">
                    <Text text="Learning"/>
                </Link>
                <Link style={noUnderline} to="/">
                    <Text text="Русская версия"/>
                </Link>
            </div>
            <Text text="© 2021 Alexander Kharlamov"/>
        </footer>
    );
}

export default Footer;
