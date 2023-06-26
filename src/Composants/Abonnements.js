import * as React from 'react';
import '../App.css';
import Avatar from '@mui/material/Avatar';
import { BarreGauche } from './Menustatic';
import BarSearch from './AppBar';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';




function Abonner() {

    return(
      <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />

  <div className="GridP">
      <div><BarreGauche /></div>
      <div className="Principale" style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin : '3vh 0vh 3vh 0vh',
      }}>
        <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{pointerEvents: 'none', display: 'block', width: '120px', height: '120px'}}>
          <g className="style-scope yt-icon">
          <path d="M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z" className="style-scope yt-icon"></path>
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
  export {Abonner}