import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
  const userId = props.match.params.id;
  const [name, setName] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [ville, setVille] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      props.history.push('/userlist');
    }
    if (!user) {
      dispatch(detailsUser(userId));
    } else {
      setName(user.name);
      setLname(user.lname);
      setEmail(user.email);
      setTel(user.tel);
      setAdresse(user.adresse);
      setVille(user.ville);
      setIsAdmin(user.isAdmin);
    }
  }, [dispatch, props.history, successUpdate, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch update user
    dispatch(updateUser({ _id: userId, isAdmin }));
  };
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit User {name}</h1>
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && (
            <MessageBox variant="danger">{errorUpdate}</MessageBox>
          )}
        </div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="name">Nom</label>
              <input
                id="name"
                type="text"
                placeholder="nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled
              ></input>
            </div>
            <div>
              <label htmlFor="lname">Préom</label>
              <input
                id="lname"
                type="text"
                placeholder="prenom"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                disabled
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
                disabled
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
                disabled
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
                disabled
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
                disabled
              ></input>
            </div>
            <div>
              <label htmlFor="isAdmin">Admin</label>
              <input
                id="isAdmin"
                type="checkbox"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></input>
            </div>
            <div>
              <button type="submit" className="primary">
                Modifier
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
