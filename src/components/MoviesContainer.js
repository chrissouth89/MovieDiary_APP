import React from "react"
import axios from 'axios'
import update from 'immutability-helper'

class MoviesContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			movies: [],
			inputValue: ''
		}
	}

	getMovies() {
		axios.get('/api/v1/movies')
		.then(response => {
			this.setState({movies: response.data})
		})
		.catch(error => console.log(error))
	}

	createMovie = (e) => {
		if (e.key === 'Enter' && !(e.target.value === '')) {
		  axios.post('/api/v1/movies', {movie: {title: e.target.value}})
		  .then(response => {
			const movies = update(this.state.movies, {
			  $splice: [[0, 0, response.data]]
			})
			this.setState({
			  movies: movies,
			  inputValue: ''
			})
		  })
		  .catch(error => console.log(error))      
		}    
	  }
	
	handleChange = (e) => {
		  this.setState({inpuValue: e.target.value})
	  }

	updateMovie = (e, id) => {
		axios.put(`/api/v1/movies/${id}`, {movie: {done: e.target.checked}})
		.then(response => {
			const movieIndex = this.state.movies.findIndex(x => x.id === response.data.id)
			const movies = update(this.state.movies, {
				[movieIndex]: {$set: response.data}
			})
			this.setState({
				movies: movies
			})
		})
		.catch(error => console.log(error))
	}

	deleteMovie = (id) => {
		  axios.delete(`/api/v1/movies/${id}`)
		  .then(reponse => {
			  const movieIndex = this.state.movies.findIndex(x => x.id === id)
			  const movies = update(this.state.movies, {
				  $splice: [[movieIndex, 1]]
			  })
			  this.setState({
				  movies: movies
			  })
		  })
		  .catch(error => console.log(error))
	  }

	componentDidMount() {
		this.getMovies()
	}

	render() {
		return (
			<div>
				<div className="inputContainer">
					<input className="movieInput" type="text" placeholder="Add a Movie" onKeyPress={this.createMovie} value={this.state.inputValue} onChange={this.handleChange} />
				</div>
				<div className="listWrapper">
					<ul className="movieList">
						{this.state.movies.map((movie) => {
							return(
								<li className='movie' move={movie} key={movie.id}>
									<input className='movieCheckBox' type='checkbox' />
									<label className='movieLabel'>{movie.title}</label>
									<span className='deleteMovieBtn' onClick={(e) => this.deleteMovie(movie.id)}>
									X
									</span>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		)
	}
}

export default MoviesContainer
