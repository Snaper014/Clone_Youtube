import * as React from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import ReactPlayer from 'react-player/lazy'
import '../App.css';
import { useFetchData } from '../utils/Fetch';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DetailVideos, Suggestions } from '../utils/Appel';
import BarSearch from './AppBar';

function Videos() {
  const [BanniereVideo, setBanniereVideo] = React.useState()
  const navigate = useNavigate()
  const {data : dataYTB, error, status, execute} = useFetchData()
  let { id } = useParams()

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
        <BarSearch />    

  <div className="GridP">
      <div></div>
        {<div className="Principale">
          <div className="GridVideoyoutube" style={{
            border: '2px solid red',
            display: 'grid',
            width: '100%',
          }}>
             <div style={{
              backgroundColor: 'white',
              border: '1px solid pink',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
             }}>
                <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} className='react-player' controls />
                <h1 style={{fontWeight: 'bolder', marginTop: '1%', fontSize: '20px', width: '100%', marginBottom: '2%'}}>{dataYTB?.title}</h1>
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
                              src={dataYTB?.data?.thumbnail[0]?.url}></img>
                      
                     <div style={{marginLeft: '3vh'}}>
                        <p style={{fontWeight: 'bolder'}}>{dataYTB?.data?.channelTitle}</p>
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
                            <p>{dataYTB?.data?.viewCount} vues</p>
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
                  <p>{dataYTB?.data?.description}</p>
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
                 {BanniereVideo?.data?.data?.map((element, index) => (
                    <div style={{
                      width: '100%',
                      display: 'grid',
                      gridTemplateColumns: '50% 50%',
                      margin: '2vh 0vh 2vh 0vh',

                      }} 
                      key={index} onClick={() => HandleVideos(element?.videoId)}>
                        <img  style={{borderRadius: '10px', height: '94px', width: '168px'}} src={element?.thumbnail[0]?.url} alt={index}></img>
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          flexWrap: 'wrap',
                          width: '100%',

                          }}>
                            <p style={{width: '100%', fontWeight: '600'}}>{element?.title.length > 60 ? element?.title.substring(0, 45) + "..." : element?.title}</p>
                            <p style={{width: '100%', fontSize: '12px'}}>{element?.channelTitle}</p>
                            <div className="SuggesVdeo">
                                <p style={{marginRight: '5px'}}>{element?.viewCount} vues</p>
                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>Il y a {element?.publishedTimeText}</p>
                            </div>
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