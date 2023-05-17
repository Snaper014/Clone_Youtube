import * as React from 'react'
import '../App.css';
import Avatar from '@mui/material/Avatar';

function MenuLaterale({valeur, Pedro, Kiche}){
    return(
        <>
        <div className="Naviguer" 
        style={{
          transform: valeur ? 'translateX(0%)' : 'translateX(-100%)',
           }}>
       <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        border: '1px solid black',
        margin: '0vh 2vh 5vh 2vh'
        }}>
        <div id='MenuDeroulant' onClick={() => Pedro()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="#666">
                <rect x="0" y="4" rx="3" ry="3" width="32" height="3" />
                <rect x="0" y="14" rx="3" ry="3" width="32" height="3" />
                <rect x="0" y="24" rx="3" ry="3" width="32" height="3" />
                </svg>
        </div>
            <div onClick={Kiche}>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent:'center',
                            height: '8vh'}}>
                    <i className="fa-brands fa-youtube" style={{color: 'red', marginRight: '2px', fontSize: '26px'}}></i>          
                    <span  style={{fontWeight: 'normal', fontSize: '24px', fontFamily: 'kenya'}}>YouTube</span>
                    <p style={{fontSize: '10px', height: '35px', alignSelf:'flex-end', marginLeft: '0.4em'}}>FR</p>
                  </div>
            </div>
    </div>
      <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Accueil</p>
      </div>
      <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Abonnements</p>
      </div>
      <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Bibliothéque</p>
      </div>
        <div className="StyleMenuBtn" style={{margin: '0vh 2vh 3vh 2vh'}}>
          <p>Logo</p>
          <p>Historique</p>
        </div>
        <hr></hr>

        <div className="StyleMenuBtn2">
          <p>Connectez-vous à YouTube pour cliquer sur "J'aime", ajouter un commentaire et vous abonner.</p>
          <div className="StyleMenuBtnConnecter">
            <Avatar src="/broken-image.jpg" sx={{width: '4vh', height: '4vh', margin: '1vh auto'}}/>
            <p style={{color: '#065fd4', fontSize: '14px', fontWeight: '600', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%'}}>Se connecter</p>
          </div>
        </div>
      <div style={{width: '80%', marginBottom: '2vh'}}><p style={{fontSize: '18px'}}>Explorer</p></div>
      <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Tendances</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Musiques</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Jeux vidéos</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Actualités</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Sport</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Savoir et culture</p>
        </div>
        <div className="StyleMenuBtn">
          <p>Logo</p>
          <p>Mode et Beauté</p>
        </div>
    </div>
    {valeur ? <div className="Terax" onClick={() => Pedro()}></div> : null}           
</>
    )
}

export {MenuLaterale}