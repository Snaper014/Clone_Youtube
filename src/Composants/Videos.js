import * as React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import ReactPlayer from 'react-player/lazy'
import '../App.css';
import { useFetchData } from '../utils/Fetch';
import { MenuLaterale } from './BarreNaviguation';
import { useParams } from 'react-router-dom';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DetailVideos, Suggestions } from '../utils/Appel';
import AppBar from '@mui/material/AppBar';



function Videos({Changement}) {
  const [valeur, setValeur] = React.useState(false)
  const [champs, setChamps] = React.useState('')
  const [BanniereVideo, setBanniereVideo] = React.useState()
  const navigate = useNavigate()
  const {data : dataYTB, error, status, execute} = useFetchData()
  let { id } = useParams()
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
      execute(DetailVideos(id))
      Suggestions(id).then(reponse => setBanniereVideo(reponse)).catch(error => console.log(error.message)) 
  }, [id, execute])

  if(status === 'fetching'){
    return 'chargement...'
  }
  if(error){
    return (
      <div className="Principale">
          <h1>Une Erreur est survenu</h1>
          <p style={{color: 'red'}}>{error.message}</p>
      </div>
    )
  }
  const HandleVideos = (id) => {
    navigate(`/watch/${id}`)
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
      <div></div>
        {<div className="Principale">
          <div className="GridVideoyoutube" style={{
            border: '2px solid red',
            display: 'grid',
            width: '100%',
            height: '100vh',
          }}>
             <div style={{
              backgroundColor: 'white',
              border: '1px solid pink',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
             }}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
                <h1 style={{fontWeight: 'bolder', marginTop: '1%', fontSize: '20px', width: '100%', marginBottom: '2%'}}>{dataYTB?.data?.items[0]?.snippet?.title}</h1>
                <div style={{width: '100%', display: 'grid', gridTemplateColumns: '50% 50%'}}>
                    <div style={{
                      width: '100%',
                    }}>
                          <div style={{ display: 'flex', flexDirection: 'row'}}>
                            <img alt='kiche' style={{ 
                              width: '50px', 
                              height: '50px',
                              borderRadius: '50%', 
                              marginRight: '1%',
                              }}
                              src={dataYTB?.data?.items[0]?.snippet?.thumbnails?.default?.url}></img>
                      
                     <div style={{marginLeft: '3vh'}}>
                        <p style={{fontWeight: 'bolder'}}>{dataYTB?.data?.items[0]?.snippet?.channelTitle}</p>
                        <button style={{fontSize: '12px'}}>S'abonner</button>
                      </div>
                      </div>   
                    </div>
                    <div style={{
                      width: '100%', 
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                      }}>
                            <p>{dataYTB?.data?.items[0]?.statistics?.viewCount} vues</p>
                            <button style={{margin: '2%', fontSize: '24px'}}>Like</button>
                            <button style={{margin: '2%', fontSize: '24px'}}>Dislike</button>
                            <button style={{margin: '2%', fontSize: '24px'}}>Partager</button>
                    </div>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  width: '100%',
                  margin: '2vh 0vh 2vh 0vh',
                  
                  }}>
                  <h6 style={{marginBottom: '2vh'}}>Description</h6>
                  <p>{dataYTB?.data?.items[0]?.snippet?.description}</p>
                </div>

              </div> 

             <div style={{
               backgroundColor: 'skyblue',
               border: '1px solid skyblue',
               width: '100%',
               display: 'flex',
               flexDirection: 'column',
               flexWrap: 'nowrap',
             }}>
                 {BanniereVideo?.data?.items.map((element, index) => (
                    <div style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '50% 50%',
                      margin: '2vh 0vh 2vh 0vh',

                      }} 
                      key={index} onClick={() => HandleVideos(element?.id?.videoId)}>
                        <img  style={{borderRadius: '10px', height: '94px', width: '168px'}} src={element?.snippet?.thumbnails?.default?.url} alt={index}></img>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexWrap: 'wrap',
                          width: '100%',

                          }}>
                            <p>{element?.snippet?.title}</p>
                            <p>{element?.snippet?.channelTitle}</p>
                        </div>
                    </div>
                 ))}
             </div>
          </div>
        </div>
      }
    </div>
    </ErrorBoundary> 
      </>
    )
  
  }
  export {Videos}