import * as React from 'react';
import { AppBarSecondary } from './AppBarSecondary';
import '../App.css';
import Avatar from '@mui/material/Avatar';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Composants/FallbackError';
import BarSearch from './AppBarPrimary';

function History() {
    return(
      <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />        
  <div className="GridP">
      <div><AppBarSecondary /></div>
      <div className="Principale" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin : '3vh 0vh 3vh 0vh',
      }}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{pointerEvents: 'none', display: 'block', width: '120px', height: '120px'}}>
          <g class="style-scope yt-icon">
            <path d="M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z" className="style-scope yt-icon"></path>
              </g>
          </svg>
        <h2>Ne manquez pas les nouvelles vidéos</h2>
        <p>Connectez-vous pour découvrir les nouveautés de vos chaînes YouTube préférées</p>
        <div style={{
          display: 'grid',
          width: '25vh',
          height: '6vh',
          gridTemplateColumns : '30% 70%',
          border: '1px solid gray',
          borderRadius: '40px',

        }}>
          <Avatar src="/broken-image.jpg" sx={{width: '4vh', height: '4vh', margin: '1vh auto'}}/>
          <p style={{color: '#065fd4', fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>Se connecter</p>
        </div>
      </div>
    </div>
    </ErrorBoundary> 
      </>
    )
  
  }
  export {History}