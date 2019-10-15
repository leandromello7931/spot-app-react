import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Dashboard(){
  const [spots, setSpots] = useState([]);

  useEffect(()=>{ //load data when load the page
    async function loadSpots(){
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });
      setSpots(response.data);
    }
    loadSpots();
  }, [] ) // [] dependecy array: when the variables value inside changes the function executes again
  return (
    <>
      <ul className="spot-list">
        {spots.map(spot => (
          <li key={ spot._id }>
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} >

            </header>
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : `GRATUITO`}</span>
          </li>
        ))}
      </ul>
        
      <Link to="/new">
        <button className="btn">Cadastrar novo Spot</button>
      </Link>
    </>

  )
}