import React ,{ useState,useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

function App() {
  const[movies,setMovies]=useState([]);
  const[searchValue,setSearchValue]=useState([]);
  const[favourites,setFavourites]=useState('');

  const getMovieRequest= async (searchValue)=>{
    const url=`http://www.omdbapi.com/?s=${searchValue}&apikey=c10e5cd5`
    const response=await fetch(url);
    //console.log(movies);
    const responseJson=await response.json()
    //console.log(responseJson)
    if(responseJson.Search){
      setMovies(responseJson.Search)
    }
  };
	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

  useEffect(()=>{
    getMovieRequest(searchValue); // piccha nibba munda lavda
  },[searchValue])

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};


  return (
    <div>
      <div className="container-fluid movie-app">
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Movies"></MovieListHeading>
          <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}></SearchBox>
        </div>
        <div className="row">
            <MovieList movies={movies} handleFavouritesClick={addFavouriteMovie} favouriteComponenet={AddFavourites}></MovieList>
        </div>
        <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading="Favourites"></MovieListHeading>
        </div>
        <div className="row">
            <MovieList movies={favourites} handleFavouritesClick={removeFavouriteMovie} favouriteComponenet={RemoveFavourites}></MovieList>
        </div>
      </div>
    </div>
  );
}

export default App;
