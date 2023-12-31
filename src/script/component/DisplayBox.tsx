import { mediaType } from "../enums";


function DisplayBox({ type = mediaType.Image, source = "", currentIndex = 0, localIndex = 0, selectFunc = (() => { }) }) {
    const rotate = (localIndex - currentIndex) * -22.5;




    /*if (type == mediaType.Canvas) {
        if (source == "PhyCanvas")
        return <div className="DisplayBoxBackground">
            <PhyCanvas />
        </div>;
    }*/





    if (type == mediaType.Image) {

        const loaded = () => {
            //console.log(" Loaded ");
        }
        return <div className="DisplayBoxBackground">
            <img className={"DisplayBox " + ((localIndex == currentIndex) ? "target " : "") + (((rotate >= 60) || (rotate <= -60)) ? " hidden" : "")}
                src={source}
                onLoad={loaded}
                onClick={selectFunc}
                style={{ transform: "rotateY(" + rotate + "deg) " }} />
        </div>
    }

    if (type == mediaType.Video) {
        return <div className="DisplayBoxBackground">
                <iframe className={"DisplayBox " + ((localIndex == currentIndex) ? "target " : "") + (((rotate >= 60) || (rotate <= -60)) ? " hidden" : "")}
                    height={((localIndex == currentIndex) ? "480px " : "")}
                    src={source}
                    onClick={selectFunc}
                    style={{ transform: "rotateY(" + rotate + "deg) ", width: ((localIndex == currentIndex) ? "720px " : "")}}
                ></iframe>
              </div>
    }
}

export default DisplayBox;
