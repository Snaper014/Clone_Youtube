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

React.useEffect(() => {
    execute(FetchHomeFeed())
}, [execute])

const HandleVideos = (id) => {
  navigate(`/watch/${id}`)
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
             <div className="styleHomeDiv" key={index} onClick={() => HandleVideos(element?.videoId)}>
                  <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                      <img alt={element?.title} 
                      src={element?.thumbnail[0]?.url}
                      height="202px"
                      style={{borderRadius: '10px', width: '100%'}}></img>
                       <div className={`${element?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{element?.lengthText}</p></div>
                  </div>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent:'center',
                    alignItems: 'center',
                    }}>
                      <div className="styleSousmenu">
                          <img style={{ 
                          width: '40px', 
                          height: '40px',
                          borderRadius: '50%', 
                          marginRight: '1%'
                          }} src={element?.channelThumbnail[0]?.url} alt={element?.title}>
                          </img>
                          <div style={{width: '100%', display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
                            <h5 style={{width: '100%',marginBottom: '1%'}}>{element?.title.substring(0,100)}</h5>
                            <p style={{width: '100%'}}>{element?.channelTitle}</p>
                            <div className="ContenuHomedescripVide">
                              <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} de vues</p>
                              <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                              <p>{element?.publishedTimeText}</p>
                            </div>
                          </div>    
                        </div>
                  </div>
              </div>
            )}
            else{
              return null
            }    
})}
      </div>
    </div>
    </ErrorBoundary> 
      </>
    )
  }
  export {Home}