import { useState } from "react";
import DisplayBox from "./DisplayBox";


function DisplayBoxContainer({ media }) {

    const [index, setIndex] = useState(0);

    function createDisplayBoxes() {
        const displayBoxes = [];
        for (let i = 0; i < media.length; i++) {
            displayBoxes.push(<DisplayBox
                key={Object.keys(media[i])[0].toString() + Object.values(media[i])[0].toString()}
                type={Object.keys(media[i])[0]}
                source={Object.values(media[i])[0]}
                currentIndex={index}
                localIndex={i}
                selectFunc={() => { setIndex(i) } }
            />);
        }
        return displayBoxes;
    }

    return <div className="DisplayBoxContainer">
        { createDisplayBoxes() }
    </div>
}

export default DisplayBoxContainer;