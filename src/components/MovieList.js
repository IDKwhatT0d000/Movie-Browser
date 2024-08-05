import React from 'react';

const MovieList = (props) => {
  const FavouriteComponenet=props.favouriteComponenet;
  return (
    <>
      {Array.isArray(props.movies) && props.movies.map((movie, index) => (
        <div key={index} className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt={movie.Title} className="movie-poster" />
          <div onClick={()=>props.handleFavouritesClick(movie)}className='overlay d-flex align-items-center justify-content-center'>
            <FavouriteComponenet></FavouriteComponenet>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
