import * as React from 'react';
import '../App.css';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import CircularProgress from '@mui/material/CircularProgress';
import { GetCategoryCulture } from '../utils/Appel';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import BarSearch from './AppBar';

export function Knoweldge(){
    const {data: DataCultural, isLoading, isError, error} = useQuery({queryKey: [`Fetch Culture`] ,queryFn: () => GetCategoryCulture()})
    const navigate = useNavigate()
    console.log(DataCultural)
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
                            <img style={{height: '100%', width: '75%', borderRadius: '50%'}}
                                alt="logo actus" 
                                src="//yt3.googleusercontent.com/qj80UVa3fFaLL9c0Cgd-BrEPuShbZnGBqrh2AArMRlfH2DZRAl4ilScrSqIRR3WIu01lSlJM=s176-c-k-c0x00ffffff-no-rj-mo"
                                >
                                </img>
                              <div className="divTendances"><p>Savoirs & Cultures</p></div>
                        </div>
                           
                    {DataCultural?.data?.data.map((element, index) => {
                        if(element?.type === 'video_listing'){
                      return(<div key={index} style={{
                          width: '100%',
                          border: '1px solid blue',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start'
                      }}>
                        <div style={{width: '100%'}}>
                            <h3 style={{
                                fontWeight: '500',
                            }}>{element?.title}</h3>
                            <p style={{margin: '3px 0px 2% 0px'}}>{element?.subtitle}</p>
                        </div>
                          <div style={{
                              width: '100%',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                          }}>
                          {element?.data.map((items, index) => {
                                if(index < 3){
                                  return(
                                    <div style={{
                                      width: '32%'
                                    }}
                                    key={index} onClick={() => HandleVideos(items?.videoId)}>
                                    <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
                                        <img alt={items?.title} 
                                        src={items?.thumbnail[0]?.url}
                                        height="202px"
                                        style={{borderRadius: '10px', width: '100%'}}></img>
                                        <div className={`${items?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{items?.lengthText}</p></div>
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
                                            }} src={items?.thumbnail[0]?.url} alt={items?.title}>
                                            </img>
                                            <div style={{width: '100%', display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', flexDirection: 'column'}}>
                                              <h5 style={{width: '100%',marginBottom: '1%'}}>{items?.title.length >= 70 ? items?.title.substring(0,70) + "..." : items?.title}</h5>
                                              <p style={{width: '100%'}}>{items?.channelTitle}</p>
                                              <div className="ContenuHomedescripVide">
                                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>{items?.viewCount} de vues</p>
                                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                                <p>{items?.publishedTimeText}</p>
                                              </div>
                                            </div>    
                                          </div>
                                    </div>
                                </div>
                                  )
                                }
                          return null;})}
                        </div>  

                      </div>)}
                    return null;})}            
                        
               <div>

                </div> 
            </div>  
        </div>
    </ErrorBoundary> 
</> 
    )
}