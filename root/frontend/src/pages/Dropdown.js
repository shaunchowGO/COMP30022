import React from "react";
import "../css/Dropdown.css";

function Dropdown(props) {
	const [selectedItem, setSelectedItem] = React.useState("");
	const [toggleDrop, setToggleDrop] = React.useState(false);
	const displayItem = () => {
		if (selectedItem === "") {
			return "-Select-";
		} else {
			return selectedItem;
		}
	};

	const handleSelect = (item) => {
		setSelectedItem(item.Name);
		setToggleDrop(false);
		props.onSelect(item);
	  };

	return (
		<div className="drop-down">
			<div className="select-option">
				<div className="selected" onClick={() => setToggleDrop(!toggleDrop)}>
					{displayItem()}
				</div>
				{toggleDrop && (
					<ul className="options">
						{props.data.map(item => (
							<li
								className="file-name"
								onClick={() => {
									handleSelect(item);
									setToggleDrop(!toggleDrop);
								}}
							>
								{item.Name}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
}

export default Dropdown;
