import { Axios } from 'axios'
import React, { useEffect } from 'react'

function Favorite(props) {
    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviepost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    useEffect(() => {
        let data = {
            userFrom,
            movieId
        }
        // Axios.post('/api/favorite/favoriteNumber', data)
        //     .then(response => {
        //         console.log(response.data);
        //         if (response.data.success) {
                    
        //         } else {
        //             alert('Failed to load number')
        //         }
        //     })
    },[])
  return (
      <div>
          <button>Favorite</button>
      </div>
  )
}

export default Favorite