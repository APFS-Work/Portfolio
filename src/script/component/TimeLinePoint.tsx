
function TimeLinePoint({ title = "title", year = 2023, tools = ["none"], isToggle = false, setFunc = ((ind: number) => { console.log(ind); }), index = 0 }) {

	function toolsStr() {
		let str = "";
		tools.map((tool, ind) => {
			str += tool;
			if ((ind + 1) < tools.length) {
				str += ", ";
			}
		});
		return str;
	}

	return <div className="timeLinePoint" onClick={() => { setFunc(index)} }>
		<h2 className="title">{ title }</h2>
		<p className={"year " + (isToggle? "enable ": "disable ")} >{ year }</p>
		<p className={"tools " + (isToggle ? "enable " : "disable ")}>{ toolsStr() }</p>	
	</div>
}

export default TimeLinePoint;