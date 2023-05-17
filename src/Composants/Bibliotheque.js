import * as React from 'react';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import '../App.css';
import Avatar from '@mui/material/Avatar';
import { MenuLaterale } from './BarreNaviguation';
import AppBar from '@mui/material/AppBar';
import { ErrorFallback } from '../Composants/FallbackError';
import { useNavigate } from 'react-router-dom';


function Biblio({Changement}) {
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
          <path d="M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z" className="style-scope yt-icon"></path>
            </g>
            </svg>
        <h2>Regardez vos vidéos préférées</h2>
        <p>Connectez-vous pour accéder aux vidéos pour lesquelles vous avez cliqué sur "J'aime" ou que vous avez enregistrées.</p>
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

  export {Biblio}