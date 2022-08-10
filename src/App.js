import React, { useState } from "react";

import Dogs from "./components/Dog/Dogs";
import SearchBar from "./components/Search/SearchBar";

import Source from "./api/source";
import "./App.css";

function App() {
	const [state, setState] = useState({
		results: [],
		searchLength: 0,
		sortByType: "",
		order: 1
	});

	//Searching Funtion
	const onSearch = async (text) => {
		const results = await Source.get("/search", {
			params: { q: text, "api-key": "f6fd0d3e-1ac8-4251-8c05-bcf6732ecb12" },
		});

		setState(prevState => {
			return { ...prevState, results: results, searchLength: text.length, sortByType: "", order: 1 }
		})
	};

	//Sort By Name
	const sortByName = () => {
		sortBy(nameSort);
	}

	//Sort By Height
	const sortByHeight = () => {
		sortBy(heightSort);
	}

	//Sort By Life Span
	const sortByLifeSpan = () => {
		sortBy(lifeSpanSort);
	}

	//Sort By Function
	const sortBy = (type) => {
		const { results, order } = state;

		//Setting State For Sort By Type Based On Button Click
		switch (type) {
			case nameSort:
				setState(prevState => {
					return { ...prevState, sortByType: "Name" }
				})
				break;
			case heightSort:
				setState(prevState => {
					return { ...prevState, sortByType: "Height" }
				})
				break;
			case lifeSpanSort:
				setState(prevState => {
					return { ...prevState, sortByType: "Life span" }
				})
				break;
			default:
				return "";
		}

		//Changing order for ASC & DESC
		const order1 = (order === 1) ? -1 : 1;

		//Sorting
		results.data.sort((a, b) => {
			return order1 * type(a, b);
		})

		//Setting State
		setState(prevState => {
			return { ...prevState, order: order1 }
		})
	}

	//Doing Name Sort
	const nameSort = (a, b) => {
		return a.name.localeCompare(b.name);
	}

	//Doing Life Span Sort
	const lifeSpanSort = (a, b) => {
		return parseFirst2Characters(a.life_span) - (parseFirst2Characters(b.life_span));
	}

	//Doing Height Sort
	const heightSort = (a, b) => {
		return parseFirst2Characters(a.height.metric) - (parseFirst2Characters(b.height.metric));
	}

	//Getting First 2 Characters To Do Sorting
	const parseFirst2Characters = (val) => {
		return parseInt(val.substring(0, 2).trim());
	}

	return (
		<div className="App">
			<section>
				<div className="container-fluid">
					<div className="row">
						<div className="col-12 dark-bg d-flex justify-content-center">
							<div className="pt-5 pb-5 w-50">
								<SearchBar onSearch={onSearch} />
								{state.searchLength !== 0 && state.results.data.length !== 0 ?
									<p className="text-white text-center mb-5">{state.results.data.length + " Adorable Dogs Found"}</p>
								: ""}

								{state.searchLength !== 0 && state.results.data.length !== 0 ?
									<p className="text-white mt-5 text-center sort">Sort By</p>
								: ""}

								<div className="d-flex justify-content-center">
									{state.searchLength !== 0 && state.results.data.length !== 0 ? 
										<p className="mr-1 ml-1 text-white"><button className={state.sortByType !== "Name" ? "btn btn-success btn-block btn-square" : "btn btn-warning btn-block btn-square btn-outline"} onClick={sortByName}> Name {state.sortByType === "Name" && state.order === -1 ? <i className="fa fa-sort-amount-desc"></i> : ""} {state.sortByType === "Name" && state.order === 1 ? <i className="fa fa-sort-amount-asc"></i> : ""} </button></p> 
									: ""}
									{state.searchLength !== 0 && state.results.data.length !== 0 ? 
										<p className="mr-1 ml-1 text-white"><button className={state.sortByType !== "Height" ? "btn btn-success btn-block btn-square" : "btn btn-warning btn-block btn-square btn-outline"} onClick={sortByHeight}> Height {state.sortByType === "Height" && state.order === -1 ? <i className="fa fa-sort-amount-desc"></i> : ""} {state.sortByType === "Height" && state.order === 1 ? <i className="fa fa-sort-amount-asc"></i> : ""}</button></p> 
									: ""}
									{state.searchLength !== 0 && state.results.data.length !== 0 ? 
										<p className="mr-1 ml-1 text-white"><button className={state.sortByType !== "Life span" ? "btn btn-success btn-block btn-square" : "btn btn-warning btn-block btn-square btn-outline"} onClick={sortByLifeSpan}> Life Span {state.sortByType === "Life span" && state.order === -1 ? <i className="fa fa-sort-amount-desc"></i> : ""} {state.sortByType === "Life span" && state.order === 1 ? <i className="fa fa-sort-amount-asc"></i> : ""} </button></p> 
									: ""}
								</div>

								{state.searchLength !== 0 && state.sortByType !== "" ?
									<p className="mr-1 ml-1 text-white text-center">{state.sortByType !== "" ? "Sorted by " + state.sortByType : ""} in {state.order === -1 ? "Descending Order" : "Ascending Order"}</p>
								: ""}
							</div>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						<div className="col-12 mt-5">
							{state.searchLength !== 0 ?
								<Dogs results={state.results} />
							:
								<p className="text-center">Please enter your dream dog name to search..</p>
							}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;
