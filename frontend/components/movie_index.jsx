import React from 'react';
import { Link } from 'react-router-dom';



class MovieTypeaheadNode {
    constructor(parent, value) {
        this.value = value;
        this.parent = parent;
        this.children = [];
        this.matchingMovies = [];
    }

    addChild(letter) {
        let child = this.childWithValue(letter);

        if (!child) {
            child = new MovieTypeaheadNode(this, letter);
            this.children.push(child);
        }

        return child;
    }

    childWithValue(letter) {
        for (var idx in this.children) {
            let child = this.children[idx];

            if (child.value == letter) {
                return child;
            }
        }
        return null;
    }

    addMatchingMovie(movie) {
        this.matchingMovies.push(movie)
        if (this.parent) {
            this.parent.addMatchingMovie(movie);
        }
    }
}

export class MovieTypeahead {
    constructor(movieList) {
        this.movieList = movieList;
        this.rootNode = new MovieTypeaheadNode(null, '');

        // fill words
        movieList.forEach(movie => {
            var currentNode = this.rootNode;

            movie.title.toLowerCase().split('').forEach((letter, index) => { 
                currentNode = currentNode.addChild(letter)

                if (index == movie.title.length - 1) {
                    // add '' node to indicate end of word
                    currentNode.addChild('')

                    // add word to this and all others in backwards path
                    currentNode.addMatchingMovie(movie)
                }
            })

        })
    }

    findMatchingMovies(query) {
        var matches = [];
        var currentNode = this.rootNode;
        for (var idx = 0; idx < query.length; idx++) {
            const letter = query[idx].toLowerCase();

            currentNode = currentNode.childWithValue(letter)

            if (currentNode == null) return [];
        }

        return currentNode.matchingMovies
    }
}

export class MovieIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {}
        this.state.query = ''
        this.state.didFetchMovies = false;

        this.onTypeaheadChange = this.onTypeaheadChange.bind(this)
    }

    componentDidMount() {
        if (!this.state.didFetchMovies) {
            this.props.fetchMovies();
            this.setState({
                didFetchMovies: true
            })
        }
    }
    
    onTypeaheadChange(event) {
        this.setState({
            query: event.target.value
        })
    }

    render() {
        const matchedMovies = this.props.movieTypeahead.findMatchingMovies(this.state.query)
        const movieListItems = matchedMovies.map((movie) => {
            return (
                <li key={movie.bomojo_id}>
                    <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                    </Link>
                </li>
            )
        })
        
        return (
            <div className="">
                <h2>Search</h2>
                <input type='text' onChange={this.onTypeaheadChange} value={this.state.query} />
                <h2>Movies</h2>
                <ul className="">
                    {movieListItems}
                </ul>
            </div>
        );
    }
}

