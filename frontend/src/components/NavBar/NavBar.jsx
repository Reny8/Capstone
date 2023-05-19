import React from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';
import Logo from '../../output-onlinegiftools.gif';
const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
    return (
      <aside>
        <ul className='nav-bar'>
          <li className='brand'>
              <img src={Logo} alt='Comany Logo' style={{ height: '3rem' }} />
          </li>
          <li>
            <button onClick={() => navigate('/')} className='button'>
              <img
                src='https://img.icons8.com/fluency-systems-regular/32/6187C2/home.png'
                alt='Home'
              />{' '}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/logs')} className='button'>
              <img
                src='https://img.icons8.com/pastel-glyph/32/6187C2/spiral-bound-booklet.png'
                alt='Logs'
              />{' '}
            </button>
          </li>
          <li>
            <button onClick={() => navigate('/agenda')} className='button'>
              <img
                src='https://img.icons8.com/ios/32/6187C2/calendar--v1.png'
                alt='agenda'
              />{' '}
            </button>
          </li>
          {props.user && props.user.role === 'Project Manager' ? (
            <li>
              <button onClick={() => navigate('/print')} className='button'>
                <img
                  src='https://img.icons8.com/ios/32/6187C2/print--v1.png'
                  alt='Print'
                />{' '}
              </button>
            </li>
          ) : null}
          <li>
            {user ? (
              <button className='button' onClick={logoutUser}>
                <img
                  src='https://img.icons8.com/ios-glyphs/32/6187C2/logout-rounded-down.png'
                  alt='Logout'
                />{' '}
              </button>
            ) : (
              <button className='button' onClick={() => navigate('/login')}>
                <img
                  src='https://img.icons8.com/ios-filled/32/6187C2/login-rounded-down.png'
                  alt='Login'
                />{' '}
              </button>
            )}
          </li>
        </ul>
      </aside>
    );
};

export default Navbar;
