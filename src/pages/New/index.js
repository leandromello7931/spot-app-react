import React, { useState, useMemo } from 'react';
import CurrencyInput from 'react-currency-input';
import api from '../../services/api';

import camera from '../../assets/camera.svg';

import './styles.css';

export default function New( { history }){
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const preview = useMemo(
    () => {
      return thumbnail ? URL.createObjectURL(thumbnail) : null;
    },
    [thumbnail]
  )
  async function handleSubmit(e){
    setIsloading(true);

    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);

    await api.post('/spots', data, {
      headers: { user_id }
    });

    history.push('/dashboard');

  }



  return (
    <form onSubmit={handleSubmit}>
      <label 
        id="thumbnail" 
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
        <img src={camera} alt="Select img" height="25px" width="25px" className="src"/>
      </label>

      <label htmlFor="company" className="htmlFor">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />

      <label htmlFor="techs" className="htmlFor">TECNOLOGIAS *<span> (separadas por vírgula)</span></label>
      <input
        id="techs"
        placeholder="Sua empresa incrível"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />

      <label htmlFor="price" className="htmlFor">VALOR DA DIÁRIA *<span> (em branco para GRATUITO)</span></label>
      <CurrencyInput 
        decimalSeparator="," 
        thousandSeparator="." 
        onValueChange={event => setPrice(event.target.value)}
        prefix="R$"
      />

      <button className="btn" disabled={isloading}>{isloading ? 'Processando...': 'Cadastrar'}</button>
    </form>
  )
}