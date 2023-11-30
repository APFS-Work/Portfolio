import VarCanvas from "./component/VarCanvas";
import { Pages, ShowcaseType } from "./enums";

function Menu({ toShowcase = (type: ShowcaseType) => { console.log(type); }, page = Pages.Menu, prevPage = Pages.Menu }) {
        return (
        <div className="menu">

            <div className={"threeDArtContainer " +
                ((prevPage == Pages.Menu && page == Pages.Showcase) ? "transition " : "") +
                ((prevPage == Pages.Showcase && page == Pages.Menu) ? "transition reverse" : "")} onClick={() => { toShowcase(ShowcaseType.ThreeDArt) } } >
                <div className="cubeContainer">
                    <div className="cube">
                        <div className="front"></div>
                        <div className="back"></div>
                        <div className="top"></div>                      
                        <div className="bottom"></div>                       
                        <div className="left"></div>                     
                        <div className="right"></div>              
                    </div>
                </div>
                <h1 className = "threeDArt">
                    3DArt
                </h1>
            </div>

            <div className={"programmingContainer " +
                ((prevPage == Pages.Menu && page == Pages.Showcase) ? "transition " : "") + 
                ((prevPage == Pages.Showcase && page == Pages.Menu) ? "transition reverse" : "")} onClick={() => { toShowcase(ShowcaseType.Programming) } }  >
                <VarCanvas />
                <h1 className = "programming">
                    Programming
                </h1>
            </div>

        </div>
    );
}

export default Menu;