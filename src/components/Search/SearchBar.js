import React from "react";
import "./Search.css";

function Searchbar(props) {
	const { onSearch } = props;
	let timeout = 0;

	//Searching Funtion - Executes after 1000 Milli Seconds
	const doSearch = (evt) => {
		var searchText = evt.target.value;
		if (timeout) clearTimeout(timeout);
		timeout = setTimeout(() => {
			onSearch(searchText);
		}, 1000);
	}

	return (
		<div className="justify-content-center mb-4">
			<input
				className="form-control"
				type="text"
				name="search"
				placeholder="Search.."
				onChange={doSearch}
				autoComplete="off"
				autoFocus
			/>
		</div>
	);
}

export default Searchbar;
