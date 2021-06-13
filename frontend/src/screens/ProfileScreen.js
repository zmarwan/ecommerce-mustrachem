import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(userInfo._id));
    } else {
      setName(user.name);
      setLname(user.lname);
      setEmail(user.email);
      setTel(user.tel);
      setAdresse(user.adresse);
      setVille(user.ville);
    }
  }, [dispatch, userInfo._id, user]);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update profile
    if (password !== confirmPassword) {
      alert('Le mot de passe et le mot de passe de confirmation ne sont pas conformes');
    } else {
      dispatch(
        updateUserProfile({
          userId: user._id,
          name,
          email,
          password,
        })
      );
    }
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Profile</h1>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile modifié avec succes 
              </MessageBox>
            )}
             <div>
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                type="text"
                placeholder="nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                
              ></input>
            </div>
            <div>
              <label htmlFor="lname">Prénom</label>
              <input
                id="lname"
                type="text"
                placeholder="prenom"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                
              ></input>
            </div>
            
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                
              ></input>
            </div>
            <div>
              <label htmlFor="tel">Telephone</label>
              <input
                id="tel"
                type="text"
                placeholder="telephone"
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                
              ></input>
            </div>
            <div>
              <label htmlFor="adresse">Adresse</label>
              <input
                id="adresse"
                type="text"
                placeholder="adresse"
                value={adresse}
                onChange={(e) => setAdresse(e.target.value)}
                
              ></input>
            </div>
            <div>
              <label htmlFor="ville">Ville</label>
              <input
                id="ville"
                type="text"
                placeholder="ville"
                value={ville}
                onChange={(e) => setVille(e.target.value)}
                
              ></input>
            </div>
            <div>
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword"> Confirmez le mot de passe</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter confirm password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            
            <div>
              <label />
              <button className="primary" type="submit">
                Modifier
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
