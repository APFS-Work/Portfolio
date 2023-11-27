import { useEffect, useRef, useState } from "react";
import TimeLinePoint from "./TimeLinePoint";
import GetWindowSize from "../tools/GetWindowSize";
import GetMousePos from "../tools/GetMousePos";
import RenderClock from "../Clock";
import { Pages } from "../enums";

function TimeLineContainer({ pointsData = [{ title: "", year: 0, tools: [""] }], selectFunc, currentIndex, page, prevPage, backToMenu }) {

    const { height } = GetWindowSize();
    const { x: mousePosX, y: mousePosY } = GetMousePos();

    const [clockScale, setClockScale] = useState(1);
    const clockScaleAnimation = useEffect(() => {

        const dir = ((prevPage == Pages.Showcase && page == Pages.Menu) ? -1 : 1);

        if (!((prevPage == Pages.Menu && page == Pages.Showcase) ||
            (prevPage == Pages.Showcase && page == Pages.Menu))) return;
        let inter: number;
        let timeOut: number;

        const delay = setTimeout(() => {
            inter = setInterval(() => {
                setClockScale((clockScale) => {
                    if (clockScale <= 0.5 && dir == 1) return clockScale;
                    if (clockScale >= 1 && dir == -1) return clockScale;
                    return (clockScale - ((0.5 * dir) / 60))
                });
            }, 16);

            timeOut = setTimeout(() => {
                clearInterval(inter);
            }, 1000);
        }, 1000);            

        return () => {
            clearTimeout(delay);
            clearInterval(inter);
            clearTimeout(timeOut);
        }
    }, [page]);

    const time = new Date();
    const [minRot, setMinRot] = useState(time.getSeconds() * 6);
    const [hRot, setHourRot] = useState(time.getMinutes() * 6);

    const secToMinRot = useEffect(() => {
        const timeOut = setTimeout(() => {
            setMinRot(time.getSeconds() * 6);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
            setMinRot(time.getSeconds() * 6);
        }
    }, [time.getSeconds()]);

    const minToHourRot = useEffect(() => {
        const timeOut = setTimeout(() => {
            setHourRot(time.getMinutes() * 6);
        }, 1000);

        return () => {
            clearTimeout(timeOut);
            setHourRot(time.getMinutes() * 6);
        }
    }, [time.getMinutes()]);

    let clockInfo: { x: number; y: number; height: number; width: number; };

    const clockRef = useRef(<p></p>);
    const menuClock = RenderClock({
        clockSize: height * 0.3 * clockScale,
        secHandRot: calSecHandRot(),
        minHandRot: minRot,
        hourHandRot: hRot,
        page: page,
        prevPage: prevPage,
        backToMenu: backToMenu
    });
    clockRef.current = menuClock;

    function calSecHandRot() {
        try {
            const Ref = clockRef.current.ref.current;
            clockInfo = { x: Ref.getBoundingClientRect().x, y: Ref.getBoundingClientRect().y, height: Ref.getBoundingClientRect().height, width: Ref.getBoundingClientRect().width };
        } catch (e) {
            //console.log(e);
        }
        if (typeof clockInfo === "undefined") return 0;
        const clockCenterPosX = clockInfo.x + (clockInfo.width / 2);
        const clockCenterPosY = clockInfo.y + (clockInfo.height / 2);
        const angle = 180 - (Math.atan2(mousePosX - clockCenterPosX, mousePosY - clockCenterPosY) * 180 / Math.PI);
        return angle;
    }


    function createPoints() {
        const points = [];
        for (let i = 0; i < pointsData.length; i++) {
            points.push(<TimeLinePoint key={"TimeLinePoint" + i} title={pointsData[i].title} year={pointsData[i].year} tools={pointsData[i].tools} setFunc={selectFunc} index={i} isToggle={ i==currentIndex } />);
        }
        return points;  
    }

    return <div className={"timeLineContainer " +
        ((prevPage == Pages.Menu && page == Pages.Showcase) ? "timeLineContainTrans " : "") + 
        ((prevPage == Pages.Showcase && page == Pages.Menu) ? "timeLineContainTrans reverse" : "") }>

        <div className={"TimeLine end " +
            ((prevPage == Pages.Menu && page == Pages.Showcase) ? "timeLineEndTrans " : "") +
            ((prevPage == Pages.Showcase && page == Pages.Menu) ? "timeLineEndTrans reverse" : "") }></div>
        <div className={"TimeLine begin " +
            ((prevPage == Pages.Menu && page == Pages.Showcase) ? "timeLineBeginTrans " : "") + 
            ((prevPage == Pages.Showcase && page == Pages.Menu) ? "timeLineBeginTrans reverse" : "") }></div>

        {menuClock}

        <div className={"timeLinePointContainer " + ((prevPage == Pages.Menu && page == Pages.Showcase) ? "timeLinePointsContainTrans " : "")}>
            { createPoints() }
        </div>
    </div>
}

export default TimeLineContainer;