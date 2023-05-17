import * as React from 'react';
import { BarreGauche } from './Menustatic';
import '../App.css';
import Avatar from '@mui/material/Avatar';
import { ErrorBoundary } from 'react-error-boundary';
import { MenuLaterale } from './BarreNaviguation';
import AppBar from '@mui/material/AppBar';
import { ErrorFallback } from '../Composants/FallbackError';
import { useNavigate } from 'react-router-dom';

function History({Changement}) {
  const [valeur, setValeur] = React.useState(false)
  const [champs, setChamps] = React.useState('')
  const navigate = useNavigate()

  const Pedro = () => {
    setValeur(!valeur)
  }
  const HandleChange = (e) => setChamps(e.target.value)
  const Envoyer = () => {
    Changement(champs)
    navigate(`/Recherche/${champs}`)
  }
  const Retour = () =>{
    navigate('/')
}
    return(
      <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <AppBar sx={{
         width: '98%',
         height: '4em',
         margin: '0 auto',
         display: 'grid',
         gridTemplateColumns: '12% 70% 18%',
         boxSizing: 'border-box',
         border: '1px solid black',
         zIndex: '1',
      }}>
        <div className="LogoYoutube" >
            <div id='MenuDeroulant' onClick={() => Pedro()}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#666">
                    <rect x="0" y="4" rx="3" ry="3" width="32" height="3" />
                    <rect x="0" y="14" rx="3" ry="3" width="32" height="3" />
                    <rect x="0" y="24" rx="3" ry="3" width="32" height="3" />
                    </svg>
            </div>
                <div onClick={Retour}>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent:'center',
                                height: '100%'}}>
                        <i className="fa-brands fa-youtube" style={{color: 'red', marginRight: '2px', fontSize: '26px'}}></i>          
                        <span  style={{fontWeight: 'normal', fontSize: '24px', fontFamily: 'kenya'}}>YouTube</span>
                        <p style={{fontSize: '10px', height: '35px', alignSelf:'flex-end', marginLeft: '0.4em'}}>FR</p>
                      </div>
                </div>
  
        </div>
        <div style={{backgroundColor: 'yellow', 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center'}}>
          <input type="text" className="Recherche" placeholder='Rechercher' value={champs} onChange={HandleChange}></input>
            <button onClick={Envoyer}>Voir</button>
        </div>
        <div style={{backgroundColor: 'red',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
            <div className="StyleMenuBtnConnecter">
              <Avatar src="/broken-image.jpg" sx={{width: '4vh', height: '4vh', margin: '1vh auto'}}/>
              <p style={{color: '#065fd4', fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>Se connecter</p>
            </div>
        </div>
      </AppBar>
      <MenuLaterale  valeur={valeur} Pedro={Pedro} Kiche={Retour}/>          
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