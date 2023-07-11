import * as React from 'react';
import { BarreGauche } from './Menustatic';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Composants/FallbackError';
import { useFetchData } from '../utils/Fetch';
import { FetchHomeFeed } from '../utils/Appel';
import BarSearch from './AppBar';

function Home() {
  const {data: DataYTB, error, execute, status} = useFetchData()
  const navigate = useNavigate()
console.log("data Home", DataYTB)
React.useEffect(() => {
    execute(FetchHomeFeed())
}, [execute])

const HandleVideos = (id) => {
  navigate(`/watch/${id}`)
}
const HandleChannel = (Channelid) => {
  navigate(`/Channel/${Channelid}`)
}

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
        <BarSearch />
  <div className="GridP">
      <div><BarreGauche /></div>
      <div className="styleHome">
          {DataYTB?.data?.data?.map((element, index) => {
              if(element?.type === 'video'){
                  return (
             <div className="styleHomeDiv" key={index} >
                  <div onClick={() => HandleVideos(element?.videoId)} style={{width: '100%', position: 'relative'}}>
                      <img alt={element?.title} 
                      src={element?.thumbnail[0]?.url}
                      height="250px"
                      style={{borderRadius: '10px', width: '100%'}}></img>
                       <div className={`${element?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{element?.lengthText}</p></div>
                  </div>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent:'flex-start',
                    alignItems: 'flex-start',
                    }}>
                      <div className="styleSousmenu">
                          <img onClick={() => HandleChannel(element?.channelId)} style={{ 
                          width: '50px', 
                          height: '50px',
                          borderRadius: '50%', 
                          marginRight: '1%',
                          cursor: 'pointer',
                          }} 
                          src={element?.channelThumbnail[0]?.url} 
                          alt={element?.title}>
                          </img>
                      </div>
                         <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          width: '85%'
                        }}> 
                            <div style={{width: '100%', display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', flexDirection: 'column', cursor: 'pointer'}}>
                              <h3 onClick={() => HandleVideos(element?.videoId)} style={{width: '100%',marginBottom: '1%'}}>{element?.title.substring(0,100)}</h3>
                              <p onClick={() => HandleChannel(element?.channelId)} style={{width: '100%', fontSize: '18px'}}>{element?.channelTitle}</p>
                              <div className="ContenuHomedescripVide" onClick={() => HandleVideos(element?.videoId)}>
                                <p style={{marginRight: '5px'}}>{element?.viewCount} de vues</p>
                                <div style={{display: 'flex', alignSelf: 'center', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'black', marginRight: '5px'}}></div>
                                <p>{element?.publishedTimeText}</p>
                              </div>
                            </div>
                      </div>       
                  </div>
              </div>
            )}
    return null;
                
})}
      </div>
    </div>
    </ErrorBoundary> 
      </>
    )
  }
  export {Home}