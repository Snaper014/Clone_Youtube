import * as React from 'react';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import '../App.css';
import BarSearch from './AppBar';
import ReactPlayer from 'react-player/lazy';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { FetchHomeShorts } from '../utils/Appel';
import { ErrorFallback } from '../Composants/FallbackError';
import { Carsoussel } from './Carsoussel';

function ShorterCAC40() {
    const {data : dataShorts, isLoading, isError, error} = useQuery({queryKey: [`Fetch/Shorts`] ,queryFn: () => FetchHomeShorts()})

if(isLoading){
    return (
    <CircularProgress />
    )         
    //import spinner MUI 
}
if(isError){
  return(
    <div className="GridTrend">
      <p>Une Erreur est survenu {error.message}</p>
    </div>
  )
}
    return(
      <>
        <ErrorBoundary fallback={ErrorFallback}>
          <BarSearch />
  <div className="GridP">
      <div><BarreGauche /></div>
      <div  style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid rgb(0, 255, 149)',
        width: '95%',
      }}>
        {dataShorts?.data?.data.map((element) => {
          if(element.type !== 'shorts_listing'){ return null}
              else if(element.type === 'shorts_listing'){
                return(
                    <Carsoussel>
                      {element?.data.map((AUelment, index) => (
                        <ReactPlayer key={index} 
                          url={`https://www.youtube.com/shorts/${AUelment.videoId}`} 
                          className='react-player ShortPlayer' 
                          width={'25vw'}
                          height={'100%'}
                          loop
                          style={{margin: '0 auto'}}  
                           />
                        ))}
                    </Carsoussel>
                )} 
            })}
        </div>
      </div>
    </ErrorBoundary> 
  </>
    )
  }
  export {ShorterCAC40}