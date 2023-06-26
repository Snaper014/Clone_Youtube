import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from '@tanstack/react-query';
import { fetchTrends } from '../utils/Appel';
import BarSearch from './AppBar';


 export function Games(){
    const choix = 'games';
    const {data: DataGames, isLoading, isError, error} = useQuery({queryKey: [`Fetch${choix}Tendance`] ,queryFn: () => fetchTrends(choix)})
    const navigate = useNavigate()
  
    const HandleVideos = (id) => {
        navigate(`/watch/${id}`)
    }   
  if(isLoading){
    return (
      <div style={{margin: '0 auto', width: '15%'}}>
      <CircularProgress />
    </div> 
    )         
    //import spinner MUI 
}
if(isError){
  return(
    <div style={{margin: '0 auto', width: '15%'}}>
      <p>Une Erreur est survenu {error.message}</p>
    </div>
  )
}
    return (
        <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BarSearch />
        <div className="GridP">
            <div><BarreGauche /></div>
            <div className="ConteneurTendances">
                     <div className="DivtitreTrend">
                        <div className="divTendances">
                        <img id="img" 
                            style={{height: '100%', width: '75%', borderRadius: '50%'}}
                            draggable="false" 
                            className="style-scope yt-img-shadow" alt="logoVideosGames" 
                            width="80" 
                            src="//yt3.googleusercontent.com/pzvUHajbQDLDt63gKFYUX445k3VprUs8CeJFpNTxGQZlk0grOSkAqU8Th1_C97dyYM3nENgjbw=s176-c-k-c0x00ffffff-no-rj-mo"
                            >
                            </img>
                        </div>
                        <div className="divTendances"><p>Jeux vidéo</p></div>
                    </div>
                    <div>
                    {DataGames?.data?.data?.map((element, index) => {
                        if(element?.type === 'video'){
                             return(
                                <div key={index} className="GridTrend" onClick={() => HandleVideos(element?.videoId)}>
                                    <div style={{width: '100%', marginLeft: '2%'}}>
                                        <img alt={element?.title} src={element?.thumbnail[0]?.url} height="138px"  style={{borderRadius: '10px', width: '100%'}}></img>
                                    </div>
                                <div className="BoxeTends">
                                    <p style={{fontSize: '18px', width: '50%'}}>{element?.title}</p>
                                    <div className="ContenuNumero5">
                                        <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.channelTitle}</p>
                                        <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                        <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} vues</p>
                                        <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                        <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.publishedTimeText}</p>
                                    </div>
                          <p style={{fontSize: '12px', width: '70%'}}>{element?.description}</p>
                </div>
              </div>
            )
          }
          else{
            return null
          }
      })}
                    </div>
            </div>  
        </div>
    </ErrorBoundary> 
</> 
    )
}
