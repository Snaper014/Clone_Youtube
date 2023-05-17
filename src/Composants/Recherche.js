import * as React from 'react';
import '../App.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { BarreGauche } from './Menustatic';
import AppBar from '@mui/material/AppBar';
import { ErrorBoundary } from 'react-error-boundary';
import { Avatar } from '@mui/material';
import { Recherche } from '../utils/Appel';
import { MenuLaterale } from './BarreNaviguation';
import { useFetchData } from '../utils/Fetch';
import { ErrorFallback } from '../Composants/FallbackError';


function Search({ValeurChamps}){
  const [valeur, setValeur] = React.useState(false)
  const [champs, setChamps] = React.useState()
  const [NewValue, setNewValue] = React.useState(ValeurChamps)
  const {execute, data, error, status} = useFetchData()
  const navigate = useNavigate()

  const Pedro = () => {
    setValeur(!valeur)
  }
  const HandleChange = (e) => setChamps(e.target.value)
  const Envoyer = () => {
    setNewValue(champs)
  }
  const Retour = () =>{
    navigate('/')
}
    React.useEffect(() => {
        if(NewValue){
          execute(Recherche(NewValue))
        }
    },[execute, NewValue])
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
      <Contenu data={data} error={error} status={status} />
    </div>
    </ErrorBoundary> 
      </>
    )
}  

  function Contenu({data : dataYTB, error, status}){
      //const data = dataYTB?.data?.items
      const navigate = useNavigate();
      let Location = useLocation()
      console.log(Location)
      const HandleVideos = (id) => {
          navigate(`/watch/${id}`)
      }
      if(status === 'fetching'){
          return 'chargment...'          
          //import spinner MUI 
      }
      if(status === 'fail'){
        return(
          <div className="Principale">
            <p>Une Erreur est survenu {error.message}</p>
          </div>
        )
      }
      return(
        <div className="Principale">
          
            {dataYTB?.data?.items.map((element, index) => (
              element?.id.kind === 'youtube#channel' ?  null :
              <div key={index} className="GridA" onClick={() => HandleVideos(element?.id?.videoId)}>
                <div>
                  <img alt={element?.snippet?.title} src={element?.snippet?.thumbnails?.default?.url} height="201px" width="360px" style={{borderRadius: '10px'}}></img>
                </div>
                <div>
                  <p style={{fontSize: '20px', marginBottom: '1%'}}>{element?.snippet?.title}</p>
                  <div style={{marginBottom: '2%', display: 'flex', flexDirection: 'row'}}>
                    <div style={{backgroundColor: 'gray', width: '25px', height: '25px',
                  borderRadius: '50%', marginRight: '1%'}}></div>
                    <p>{element?.snippet?.channelTitle}</p>
                  </div>
                    <p>{element?.snippet?.publishedAt}</p>
                  <p>{element?.snippet?.description}</p>
                </div>
              </div>
            ))}
      </div>
      )
  }

  export {Contenu, Search}