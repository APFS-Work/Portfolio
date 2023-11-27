import { useState, useEffect } from "react";

function GetWindowSize() {
	const { innerWidth: width, innerHeight: height } = window;
	return { width, height};
}

function WindowSize() {
	const [windowSize, setWindowSize] = useState(GetWindowSize());

	useEffect(() => {
		function handleResize() {
			setWindowSize(GetWindowSize());
		}

		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return windowSize;
}

export default WindowSize;