import "../style/Showcase.css";
import TimeLineContainer from "./component/TimeLineContainer";
import { useEffect, useRef, useState } from "react";
import ContentsContainer from "./component/ContentsContainer";
import programmingProjects from "../data/ProgrammingProjects.json";
import ThreeDProjects from "../data/ThreeDProjects.json";
import { ShowcaseType } from "./enums";

function Showcase({ page, prevPage, backToMenu, showType}) {

    const [currentIndex, setIndex] = useState(0);
    const progProj = programmingProjects.Projects;
    const threeDProj = ThreeDProjects.Projects;

    return <div className="Showcase">
        <TimeLineContainer pointsData={(showType == ShowcaseType.ThreeDArt)?threeDProj: progProj} selectFunc={setIndex} currentIndex={currentIndex} page={page} prevPage={prevPage} backToMenu={backToMenu} />
        <ContentsContainer contentsData={(showType == ShowcaseType.ThreeDArt) ? threeDProj : progProj} page={page} prevPage={prevPage} currentIndex={currentIndex} />
    </div> 
}

export default Showcase;