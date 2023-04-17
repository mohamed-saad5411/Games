import React, { useEffect, useState } from 'react'
import styles from './Popularity.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Popularity() {

  const [popularityList, setpopularityList] = useState([])

  async function getPopularityGames() {

    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: { 'sort-by': 'popularity' },
      headers: {
        'X-RapidAPI-Key': '14943b72e7mshcd54d538d7abf71p18bfaajsnacbfc639325b',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    let { data } = await axios.request(options)
    setpopularityList(data)
    // console.log(data);
  }


  useEffect(() => {
    //call api
    getPopularityGames()
  }, [])

  return (
    <>
      <section id='card' className='custom-margin container'>
        <div className="row gy-4">
          {popularityList.map((game) =>
            <Link key={game.key} to= {`../details/${game.id}`} className="col-md-3 text-muted text-decoration-none">
              <div className="card pointer bg-dark">
                <img src={game.thumbnail} className="card-img-top" alt="..." />
                <div className="card-body">
                  <div className='d-flex justify-content-between align-items-center'>
                  <h5 className="card-title">{game.title.length > 13 ? game.title.slice(0,13) + ' ....' : game.title}</h5>
                    <a href="#" className="btn btn-primary btn-sm py-0">FREE</a>
                  </div>
                  <p>{game.short_description.slice(0,24) +' ....'}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <i class="fa-solid fa-square-plus"></i>
                    <div className='d-flex align-items-center'>
                      <button className='text-black btn btn-secondary btn-sm py-0'>{game.genre}</button>
                      {game.platform == "PC (Windows)" ? <i className="fa-brands fa-windows ps-2"></i> : <i className="fa-solid fa-window-maximize ps-2"></i>} 
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          )}
        </div>
        <button className='btn btn-outline-primary btn-custom m-auto my-5'>SEE MORE <i class="fa-solid fa-chevron-right"></i></button>
      </section>
    </>

  )

}
