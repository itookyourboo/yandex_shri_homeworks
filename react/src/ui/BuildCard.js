import Text from "./Text";
import React from "react";
import commitIcon from "../img/16_commit.svg"
import userIcon from "../img/16_user.svg"
import dateIcon from "../img/16_calendar.svg"
import timeIcon from "../img/16_stopwatch.svg"
import doneIcon from "../img/24_done.svg"
import failIcon from "../img/24_fail.svg"
import waitIcon from "../img/24_clock.svg"

const icon = {
    done: doneIcon,
    fail: failIcon,
    wait: waitIcon
}, color = {
    done: "#00B341",
    fail: "#FF3333",
    wait: "#FF9A00"
}

function BuildCard(props) {
    return (
        <div className="card">
            <img src={icon[props.status]} alt={props.status}/>
            <div className="card-frame">
                <div className="card-content">
                    <Status number={props.number} color={props.status} message={props.message}/>
                    <div className="card-meta-commit">
                        <IconText src={commitIcon} texts={[
                            <Text text={props.branch} color="#000000" fontWeight="400" lineHeight="16px"/>,
                            <Text text={props.commitHash} lineHeight="16px"/>
                        ]}/>
                        <IconText src={userIcon} texts={
                            <Text text={props.user} color="#000000" fontWeight="400" lineHeight="16px"/>
                        }/>
                    </div>
                </div>
                <div className="card-meta-time">
                    <IconText src={dateIcon} texts={
                        <Text text={props.date} fontWeight="400" lineHeight="16px"/>
                    }/>
                    <IconText src={timeIcon} texts={
                        <Text text={props.time} fontWeight="400" lineHeight="16px"/>
                    }/>
                </div>
            </div>
        </div>
    );
}

function Status(props) {
    return (
        <div className="status">
            <Text text={"#" + props.number} color={color[props.color]} fontWeight="500" fontSize="18px"
                  lineHeight="20px"/>
            <Text text={props.message} color="#000000" fontWeight="400" fontSize="15px" lineHeight="20px"/>
        </div>
    );
}

function IconText(props) {
    return React.createElement(
        "div",
        {className: "icon-text"},
        <img style={{opacity: "0.3"}} src={props.src} alt="icon"/>,
        props.texts
    );
}

export default BuildCard;
