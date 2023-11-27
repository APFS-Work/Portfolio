import { useEffect, useState } from "react";


function GetMousePos() {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMousePos = (e: { clientX: number; clientY: number; }) => {
            setPos({
                x: e.clientX,
                y: e.clientY     
            });
        }

        window.addEventListener("mousemove", handleMousePos);

        return () => {
            window.removeEventListener("mousemove", handleMousePos);
        };
    }, []);

    return pos;
}

export default GetMousePos;