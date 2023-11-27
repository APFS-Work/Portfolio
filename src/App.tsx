import { useEffect, useRef, useState } from "react";

import "./style/Menu.css";
import "./style/Showcase.css";
import "./style/TimeLine.css";

import Menu from "./script/Menu.tsx";
import Showcase from './script/Showcase.tsx';
import { Pages, ShowcaseType } from "./script/enums.tsx";

function App() {
    const [currentPage, setCurrentPage] = useState(Pages.Menu);
    const prevPage = useRef<Pages>(currentPage);
    //console.log("current page : " + currentPage + "   ,previous page : " + prevPage.current);

    const [currentShowtype, setShowtype] = useState(ShowcaseType.Programming);

    useEffect(() => {
       if (prevPage.current == currentPage) return;

       prevPage.current = currentPage;
    }, [currentPage]);


  return (
    <>
          <Menu toShowcase={(type) => { setCurrentPage(Pages.Showcase); setShowtype(type); }} page={currentPage} prevPage={ prevPage.current} />
          <Showcase page={currentPage} prevPage={prevPage.current} backToMenu={() => { setCurrentPage(Pages.Menu) }} showType={ currentShowtype} />
    </>
  )
}

export default App
