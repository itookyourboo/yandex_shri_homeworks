import Text from "../ui/Text";
import ImageTextButton from "../ui/ImageTextButton";
import settingsIcon from "../img/12_settings.svg";
import playIcon from "../img/12_play.svg";
import BuildCard from "../ui/BuildCard";
import TextButton from "../ui/TextButton";
import {Link, useHistory} from "react-router-dom";
import NewBuildModal from "../ui/NewBuildModal";
import {useState} from "react";
import Media from "react-media";

function BuildHistoryScreen(props) {
    const [state, setState] = useState('hide');
    const history = useHistory();

    return (
        <div className="BuildHistoryScreen">
            <div className="innerPad header">
                <Text text={props.settings.repository} fontWeight="600" fontSize="24px" lineHeight="30px"
                      color="#000000"/>
                <div className="BuildHistoryScreen-header-buttons">
                    <Media query="(max-width: 700px)">
                        {matches =>
                            <ImageTextButton color='gray' src={playIcon} text="Run build" withText={!matches}
                                             onClick={() => {
                                                 setState('show');
                                             }}/>}
                    </Media>
                    <Link to="/settings">
                        <ImageTextButton color='gray' src={settingsIcon} text="Settings" withText={false}/>
                    </Link>
                </div>
            </div>
            <div className="innerPad BuildHistoryScreen-main">
                {generateTestCards()}
                <div style={{display: "flex"}}>
                    <TextButton text="Show more"/>
                </div>
            </div>
            {state === 'show' && <NewBuildModal
                onRunClick={commit => {
                    if (commit)
                        history.push("/build/" + commit);
                }}
                onCancelClick={() => {
                    setState('hide');
                }}/>
            }
        </div>
    );
}

function generateBuildCard(card) {
    return <BuildCard number={card.number} status={card.status} message={card.message} branch={card.branch || "master"}
                      commitHash={card.commitHash} user={card.user} date={card.date || "21 янв, 03:06"}
                      time={card.time || "1 ч 20 мин"}/>
}

function generateTestCards() {
    const cards = [
        {
            number: 1368,
            message: "add documentation for postgres scaler",
            status: "done",
            commitHash: "9c9f0b9",
            user: "Philip Kirkorov"
        },
        {
            number: 1367,
            message: "Super cool UI kit for making websites that look like games",
            status: "fail",
            commitHash: "952e5567",
            branch: "super-cool-ui-kit",
            user: "Vadim Makeev"
        },
        {
            number: 1366,
            message: "Merge branch 'master' of github.com:jaywcjlove/awesome",
            status: "done",
            commitHash: "b4636ab",
            user: "Philip Kirkorov"
        },
        {
            number: 1365,
            message: "upgrade typescript to 3.8",
            status: "wait",
            commitHash: "b4636ab",
            user: "Philip Kirkorov"
        },
        {
            number: 1364,
            message: "add documentation for postgres scaler",
            status: "done",
            commitHash: "b4636ab",
            user: "Philip Kirkorov"
        },
        {
            number: 1367,
            message: "replace all `div` to `article`",
            status: "fail",
            commitHash: "952e5567",
            user: "Vadim Makeev"
        },
        {
            number: 1362,
            message: "improved accessibility",
            status: "done",
            commitHash: "e41e4cc",
            user: "Philip Kirkorov"
        },
        {
            number: 1350,
            message: "fix: upload 别片类型",
            status: "done",
            commitHash: "e41e4cc",
            user: "Philip Kirkorov"
        },
        {
            number: 1349,
            message: "Form item has default height align with form size",
            status: "done",
            commitHash: "e41e4cc",
            user: "Philip Kirkorov"
        }
    ];

    return cards.map(generateBuildCard);
}

export default BuildHistoryScreen;
