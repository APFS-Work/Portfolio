import { Pages, ShowcaseType } from "./enums";

function Menu({ toShowcase = (type) => { } , page, prevPage}) {
    return (
        <div className="menu">

            <div className={"threeDArtContainer " +
                ((prevPage == Pages.Menu && page == Pages.Showcase) ? "transition " : "") +
                ((prevPage == Pages.Showcase && page == Pages.Menu) ? "transition reverse" : "")} onClick={() => { toShowcase(ShowcaseType.ThreeDArt) } } >
                <h1 className = "threeDArt">
                    3DArt
                </h1>
            </div>

            <div className={"programmingContainer " +
                ((prevPage == Pages.Menu && page == Pages.Showcase) ? "transition " : "") + 
                ((prevPage == Pages.Showcase && page == Pages.Menu) ? "transition reverse" : "")} onClick={() => { toShowcase(ShowcaseType.Programming) } }  >
                <h1 className = "programming">
                    Programming
                </h1>
            </div>

        </div>
    );
}

export default Menu;