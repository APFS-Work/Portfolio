import { Pages } from "../enums";
import Content from "./Content";


function ContentsContainer({ contentsData = [{ media: [{}], overview: "", link: ""}], page = Pages.Menu, prevPage = Pages.Menu, currentIndex = 0}) {
    function createConents() {
        const contents = [];
        for (let i = 0; i < contentsData.length; i++) {
            contents.push(<Content
                key={"content" + i}
                media={contentsData[i].media}
                overview={contentsData[i].overview}
                link={contentsData[i].link}
                localIndex={i}
                currentIndex={currentIndex}
            />);
        }
        return contents;
    }

    return <div className={"ContentsContainer " + ((prevPage == Pages.Menu && page == Pages.Showcase) ? "contentContainTrans " : "")} >
        { createConents()}
	</div>
}

export default ContentsContainer;