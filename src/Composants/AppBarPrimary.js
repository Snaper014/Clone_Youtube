import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineSearch} from "react-icons/ai";
import { BsYoutube} from "react-icons/bs";
import { BiUserCircle } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { BsCollectionPlay} from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { ButtonNavPrimaryOne } from '../utils/utils';
import { AiFillFire} from "react-icons/ai";
import { PiMusicNoteBold } from "react-icons/pi";
import { LuGamepad2 } from "react-icons/lu";
import { BsNewspaper, BsLightbulb } from "react-icons/bs";
import { GoTrophy } from "react-icons/go";
import { GiClothesline } from "react-icons/gi";
import '../App.css';

export default function BarSearch(){
    const [valeur, setValeur] = React.useState(false)
    const [champs, setChamps] = React.useState('')
    const navigate = useNavigate()

    const IsTranslate = () => {
      setValeur(!valeur)
    }
    const HandleChange = (e) => setChamps(e.target.value);
    const Envoyer = () => {
      navigate(`/Recherche/${champs}`)
    }
    const Retour = () =>{
      navigate('/')
  }
  const handleKeyPress = (e) => {
    if(e.code === "Enter"){
      Envoyer();
    }
  }
    return(
        <>
        <AppBar sx={{
         width: '100%',
         height: '9vh',
         margin: '0 auto',
         display: 'grid',
         boxShadow: 'none',
         backgroundColor: 'white',
         gridTemplateColumns: '15% 70% 15%',
         boxSizing: 'border-box',
         color: 'black',
         border: '1px solid transparent',
         zIndex: '1',
      }}>
        <div className="LogoYoutube" >
            <div className='mouseOver' onClick={() => IsTranslate()}>
               <AiOutlineMenu fontSize={24}/>  
            </div>
                <div onClick={Retour} className='mouseOver'>
                      <div style={{display: 'flex', alignItems: 'center', justifyContent:'center',
                                height: '100%'}}>
                       <BsYoutube fontSize={30} style={{color: 'red', marginRight: '4px'}}/>                    
                        <span  style={{fontWeight: 'normal', fontSize: '30px', fontFamily: 'kenya'}}>YouTube</span>
                        <p style={{fontSize: '10px', height: '35px', alignSelf:'flex-end', marginLeft: '0.4em'}}>FR</p>
                      </div>
                </div>
  
        </div>
        <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
        }}>
          <input onKeyDown={handleKeyPress}
                type="text" 
                className="Recherche" 
                placeholder='Rechercher' 
                value={champs} 
                onChange={HandleChange}>
          </input>
            <button style={{
              height: '7vh',
              border: 'none',
              width: '8%',
              backgroundColor: '#efeff1',
              display: 'flex',
              borderRadius: '0px 40px 40px 0px',
              alignItems: 'center',
              justifyContent: 'center',
            }} onClick={Envoyer}><AiOutlineSearch fontSize={28}/></button>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className="StyleMenuBtnConnecter">
              <div style={{width: '20%', 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                <BiUserCircle fontSize={35} color='#065fd4'/>
              </div>
              <p style={{color: '#065fd4', 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      width: '60%',
                      height: '100%'
                  }}>Se connecter</p>
            </div>
        </div>
      </AppBar>



      <div className="Naviguer" 
        style={{
          transform: valeur ? 'translateX(0%)' : 'translateX(-100%)',
          overflowY: 'scroll',
           }}>
       <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '80%',
        border: '1px solid transparent',
        margin: '0vh 2vh 5vh 2vh'
        }}>
        <div  onClick={() => IsTranslate()}>
          <AiOutlineMenu fontSize={24}/> 
        </div>
            <div onClick={Retour}
                  style={{
                  display: 'flex', 
                  alignItems: 'center', justifyContent:'center',
                      height: '100%'}}>
              <BsYoutube fontSize={32} style={{color: 'red', marginRight: '4px'}}/>
              <span  style={{fontWeight: 'normal', fontSize: '32px', fontFamily: 'kenya'}}>YouTube</span>
              <p style={{display:'flex',
                      fontSize: '10px', 
                      height: '35px', 
                      alignSelf:'flex-start', 
                      marginLeft: '0.4em'}}>FR</p>
            </div>
    </div>
      <ButtonNavPrimaryOne 
        route="/" logo={<GoHome fontSize={28}/>} texte="Accueil" height="6vh"/>
      <ButtonNavPrimaryOne 
        route="/abonnements" logo={<BsCollectionPlay fontSize={28}/>} 
        texte="Abonnements" height="6vh"
      />
      <ButtonNavPrimaryOne 
        route="/Bibliothéque" logo={<MdOutlineVideoLibrary fontSize={28}/>} 
        texte="Bibliothéque" height="6vh"
      />
      <ButtonNavPrimaryOne 
        route="/Historique" logo={<GoHistory fontSize={28}/>} 
        texte="Historique" height="6vh"
      />  
      <hr style={{height: '3px', color: 'black'}}/>

        <div className="StyleMenuBtn">
          <p style={{marginBottom: '3%'}}>Connectez-vous à YouTube pour cliquer sur "J'aime", ajouter un commentaire et vous abonner.</p>
          <div className="StyleMenuBtnConnecter">
              <div style={{width: '20%', 
                          height: '100%', 
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                <BiUserCircle fontSize={35} color='#065fd4'/>
              </div>
              <p style={{color: '#065fd4', 
                      fontSize: '18px', 
                      fontWeight: '600', 
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      width: '60%',
                      height: '100%'
                  }}>Se connecter</p>
            </div>
        </div>
      <div style={{width: '80%', marginBottom: '2vh'}}><h4 style={{fontSize: '18px'}}>Explorer</h4></div>
      <ButtonNavPrimaryOne 
        route="/tendances" logo={<AiFillFire fontSize={28}/>} 
        texte="Tendances" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/musique" logo={<PiMusicNoteBold fontSize={28}/>} 
        texte="Musique" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/Videosgames" logo={<LuGamepad2 fontSize={28}/>} 
        texte="Jeux vidéos" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/Actus" logo={<BsNewspaper fontSize={28}/>} 
        texte="Actualités" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/Sport" logo={<GoTrophy fontSize={28}/>} 
        texte="Sport" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/Culture" logo={<BsLightbulb fontSize={28}/>} 
        texte="Savoir et culture" height='6vh'
      />
      <ButtonNavPrimaryOne 
        route="/Mode" logo={<GiClothesline fontSize={28}/>} 
        texte="Mode et Beauté" height='6vh'
      />
    </div>
    {valeur ? <div className="OmberDiv" onClick={() => IsTranslate()}></div> : null} 
</>
    )
}