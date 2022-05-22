import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, API_KEY,IMAGE_BASE_URL } from '../../../Config';
import MainImage from './Sections/MainImage';
import GridCard from '../commons/GridCard';
import { Row } from 'antd';

export default function LandingPage() {
    const navigate = useNavigate();
    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetchMovies(endpoint);
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {
                // console.log(response);
                setMovies([...Movies,...response.results]);
                setMainMovieImage(response.results[0]);
                setCurrentPage(response.page);
            });
    }
    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint)
    }
    // const onClickHandler = () => {
    //     axios.get(`/api/users/logout`)
    //         .then(response => {
    //             if (response.data.success) {
    //                 navigate('/login');
    //             } else {
    //                 alert('Failed to logout!');
    //             }
    //         })
    // }
    

  return (
      <div style={{ width: '100%', margin: '0' }}> 
          {/* Main Image*/}
            {MainMovieImage&&
                <MainImage
                image={`${IMAGE_BASE_URL}w1280/${MainMovieImage.backdrop_path}`}
                title={MainMovieImage.original_title}
                text={MainMovieImage.overview}
            />
            }
          <div style={{ width: '85%', margin: '1rem auto' }}>
              <h2>Movies by lates</h2>
              <hr />
              {/* Movie Grid Cards*/
                //   console.log(Movies)
              }
              <Row gutter={[16,16]}>
                  {Movies && Movies.map((movie, index) => (
                      <React.Fragment key={index}>
                          <GridCard
                              image={movie.poster_path ? `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                              movieId={movie.id}
                              movieName={movie.original_title}
                              movieIndex={index}
                            />
                      </React.Fragment>
                  ))}
              
              </Row>
        
          </div>      
          <div style={{display:'flex',justifyContent:'center'}}>
                <button onClick={loadMoreItems}>Load More</button>
          </div>
            
        </div>
  )
}
