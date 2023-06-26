import * as React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import { Recherche } from '../utils/Appel';
import { useFetchData } from '../utils/Fetch';
import { ErrorFallback } from '../Composants/FallbackError';
import BarSearch from './AppBar';


function Search(){
  let {userSearch} = useParams()
  const {execute, data, error, status} = useFetchData()
  
    React.useEffect(() => {
        if(userSearch){
          execute(Recherche(userSearch))
        }
    },[execute, userSearch])
    return(
      <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
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
          
            {dataYTB?.data?.data?.map((element, index) => {
              if(element?.type === 'video'){
                return(
              <div key={index} className="GridA" onClick={() => HandleVideos(element?.videoId)}>
                <div style={{position: 'relative'}}>
                  <img alt={element?.title} src={element?.thumbnail[0]?.url} height="201px" width={"100%"} style={{borderRadius: '10px'}}></img>
                  <div className={`${element?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{element?.lengthText}</p></div>
                </div>
                <div style={{marginLeft: '2%'}}>
                  <p style={{fontSize: '20px', marginBottom: '1%'}}>{element?.title}</p>
                    <div className="ContenuHomedescripVide">
                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} de vues</p>
                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                <p>{element?.publishedText}</p>
                    </div>           
                  <div style={{marginBottom: '2%', display: 'flex', flexDirection: 'row'}}>
                  <img style={{ 
                          width: '25px', 
                          height: '25px',
                          borderRadius: '50%', 
                          marginRight: '1%'
                          }} src={element?.channelThumbnail[0]?.url} alt={element?.title}>
                          </img>
                    <p>{element?.channelTitle}</p>
                  </div>
                  <p>{element?.description}</p>
                </div>
              </div>
            )}
            else{
              return null
            }
  })}
      </div>
      )
  }

  export {Contenu, Search}