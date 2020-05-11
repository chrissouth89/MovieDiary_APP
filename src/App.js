import React from "react"
// import logo from "./logo.svg"
import "./App.css"
import MoviesContainer from "./components/MoviesContainer"

class App extends React.Component {
	render() {
		return (
			<div className="container">
				<div className="header">
					<h1>Movie List</h1>
				</div>
				<MoviesContainer />
			</div>
		)
	}
}

export default App
