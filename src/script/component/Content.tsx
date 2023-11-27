import DisplayBoxContainer from "./DisplayBoxContainer";
import TextBox from "./TextBox";


function Content({ media = [{}], overview = "", link = "", localIndex = 0, currentIndex = 0}) {


    return <div className={"Content " + ((localIndex==currentIndex) ? "show " : "hide ")}>
        <DisplayBoxContainer media={ media} />
        <TextBox type="Overview" text={overview} />
        <TextBox type="Github Link" text={link} />
    </div>
}

export default Content;