import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { register } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(props) {
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/';

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Le mot de passe et le mot de passe de confirmation ne sont pas conformes');
    } else {
      dispatch(register(name,lname,email,tel,adresse,ville, password));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Créer un compte</h1>
        </div>
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            id="name"
            placeholder="Enter votre nom"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="name">Prénom</label>
          <input
            type="text"
            id="lname"
            placeholder="Enter votre prénom"
            required
            onChange={(e) => setLname(e.target.value)}
          ></input>
        </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter votre email"
                onChange={(e) => setEmail(e.target.value)}
               
              ></input>
            </div>
            <div>
              <label htmlFor="tel">Telephone</label>
              <input
                id="tel"
                type="text"
                placeholder="telephone"
                onChange={(e) => setTel(e.target.value)}
               
              ></input>
            </div>
            <div>
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                type="text"
                placeholder="Entrez votre adresse"
                onChange={(e) => setAdresse(e.target.value)}
               
              ></input>
            </div>
            <div>
              <label htmlFor="ville">Ville</label>
              <input
                id="ville"
                type="text"
                placeholder="Entrez la ville"
                onChange={(e) => setVille(e.target.value)}
               
              ></input>
            </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Entrez un mot de passe"
            required
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirmez le mot de passe"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            S'inscrire
          </button>
        </div>
        <div>
          <label />
          <div>
            Vous avez déjà un compte?{' '}
            <Link to={`/signin?redirect=${redirect}`}>Connectez-vous</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
