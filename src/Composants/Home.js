import * as React from 'react';
import { BarreGauche } from './Menustatic';
import '../App.css';
import AppBar from '@mui/material/AppBar';
import { Avatar } from '@mui/material';
import { MenuLaterale } from './BarreNaviguation';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Composants/FallbackError';
import { useNavigate } from 'react-router-dom';
import { useFetchData } from '../utils/Fetch';
import { Recherche } from '../utils/Appel';



function Home({Changement}) {
  const [valeur, setValeur] = React.useState(false)
  const [champs, setChamps] = React.useState()
  const {data: DataYTB, error, execute, status} = useFetchData()
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
React.useEffect(() => {
    execute(Recherche('Tous'))
}, [execute])
console.log(DataYTB)

if(status === 'fetching'){
  return 'chargment...'          
  //import spinner MUI ou skeletons
}
if(status === 'fail'){
return(
  <div className="Principale">
    <p>Une Erreur est survenu {error.message}</p>
  </div>
)
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
      <div className="styleHome">
          {DataYTB?.data.items.map((element, index) => (
              <div className="styleHomeDiv" key={index}>
                  <img alt={element?.snippet?.title} 
                  src={element?.snippet?.thumbnails?.default?.url}
                  height="202px"
                  style={{borderRadius: '10px', width: '100%'}}></img>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent:'center',
                    alignItems: 'center',
                    }}>
                      <div className="styleSousmenu">
                          <div style={{backgroundColor: 'gray', 
                          width: '40px', 
                          height: '40px',
                          borderRadius: '50%', 
                          marginRight: '1%'
                          }}>
                          </div>
                          <div>
                            <h5>{element?.snippet?.title}</h5>
                            <p>{element?.snippet?.channelTitle}</p>
                            <p>{element?.snippet?.publishedAt}</p>
                          </div>    
                        </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
    </ErrorBoundary> 
      </>
    )
  
  }
  export {Home}