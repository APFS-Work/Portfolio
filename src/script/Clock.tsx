import React, { useMemo, useRef } from "react";
import { Pages } from "./enums";

function RenderClock({ clockSize = 600, secHandRot = 0, minHandRot = 130, hourHandRot = 260, page = Pages.Menu, prevPage = Pages.Menu, backToMenu = (() => { }) }) {

    const clockS = { "--clockSize": (clockSize.toString() + "px") } as React.CSSProperties;
    const clockRef = useRef(null);

    const halfClockSize = clockSize / 2;

    const RenderMinuteLine = useMemo(() => {
        //console.log("Render Minute Line");

        const shortLine = clockSize / 60;
        const longLine = clockSize / 20;
        let Y1, Y2, rot;
        const X1 = halfClockSize;
        const X2 = halfClockSize;
        const rotAnchorX = halfClockSize;
        const rotAnchorY = halfClockSize;

        const result = [];


        for (let i = 0; i < 60; i++) {
            rot = i * 6;
            (i % 5) == 0 ? Y2 = longLine : Y2 = shortLine;

            const rotStr = "rotate(" + rot + " " + rotAnchorX + " " + rotAnchorY + ")";
            const keyStr = "MinuteLine" + i;
            result.push(<line key={keyStr} x1={X1} y1={Y1} x2={X2} y2={Y2} transform={rotStr} />);
        }

        return result;
    }, [clockSize]);

    const RenderSecHand = useMemo(() => {
        //console.log("Render Seconds Hand");

        const X1 = halfClockSize;
        const X2 = halfClockSize;
        const Y1 = clockSize / 15;
        const Y2 = halfClockSize;

        const rotStr = "rotate(" + secHandRot + " " + halfClockSize + " " + halfClockSize + ")";

        return <line className="secHand" x1={X1} y1={Y1} x2={X2} y2={Y2} transform={rotStr} />;
    }, [clockSize, secHandRot]);

    const RenderMinHand = useMemo(() => {
        //console.log("Render Minute Hand");

        const X1 = halfClockSize;
        const X2 = halfClockSize;
        const Y1 = clockSize / 10;
        const Y2 = halfClockSize;

        const rot = { "--minHandRot": minHandRot + "deg" } as React.CSSProperties;

        return <line className={"minHand " + ((prevPage == Pages.Menu && page == Pages.Showcase) ? "minHandTrans " : "")} x1={X1} y1={Y1} x2={X2} y2={Y2} style={ rot } />;
    }, [clockSize, minHandRot]);

    const RenderHourHand = useMemo(() => {
        //console.log("Render Hour Hand");

        const X1 = halfClockSize;
        const X2 = halfClockSize;
        const Y1 = clockSize / 5;
        const Y2 = halfClockSize;

        const rot = { "--hourHandRot": hourHandRot + "deg" } as React.CSSProperties;

        return <line className={"hourHand " + ((prevPage == Pages.Menu && page == Pages.Showcase) ? "hourHandTrans " : "")} x1={X1} y1={Y1} x2={X2} y2={Y2} style={rot} />;
    }, [clockSize, hourHandRot]);



    //return {CreateClock:CreateClock, RenderMinuteLine: RenderMinuteLine, RenderSecHand: RenderSecHand};
    return <svg className={"clock " + ((prevPage == Pages.Menu && page == Pages.Showcase) ? "clockTrans " : "")} style={clockS} ref={clockRef} onClick={ backToMenu }>
        <circle className="clockFace"></circle>
        {RenderMinuteLine}
        {RenderSecHand}
        {RenderMinHand}
        {RenderHourHand}
        <circle className="middle"></circle>
        Please use a browser that support svg
    </svg>;
}

export default RenderClock;