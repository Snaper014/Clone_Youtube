import * as React from 'react';
import '../App.css';
import { AppBarSecondary } from './AppBarSecondary';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import CircularProgress from '@mui/material/CircularProgress';
import { GetCategorySport } from '../utils/Appel';
import { useQuery } from '@tanstack/react-query';
import BarSearch from './AppBarPrimary';
import { useData } from '../utils/ContextProvider';
import { DisplayContent } from '../utils/utils2';

export function Sport(){
    const {data: DataSport, isLoading, isError, error} = 
      useQuery({queryKey: [`Fetch Sport`] , 
      queryFn: () => GetCategorySport()})
      const refWidth = React.useRef(null);
      const {setDataContext, setOption} = useData();
      console.log(DataSport)
  if(isLoading){
    return (
      <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
          <CircularProgress style={{fontSize: '40px'}}/>
      </div>
    )  
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
            <div><AppBarSecondary /></div>
            <div ref={refWidth} style={{
                padding: '0px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                flexWwrap: 'nowrap',
                border: '2px solid rgb(0, 255, 149)',
                color: 'black',
                width: '100%',
            }}>
                 <div style={{
                     width: '100%',
                     height: '180px',
                     backgroundColor: '#efeff1',
                     display: 'flex',
                     flexDirection: 'column',
                     marginBottom: '40px',
                     justifyContent: 'space-between', 
                 }}>
                  <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    }}>
                      <div style={{
                        width: '10%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                         }}>
                            <img style={{height: '80px', width: '80px', borderRadius: '50%'}}
                            alt="logo sport"
                            src={
                              DataSport?.data?.meta?.avatar[0]?.url.includes("https:") ?
                              DataSport?.data?.meta?.avatar[0]?.url : 
                              "https:" + DataSport?.data?.meta?.avatar[0]?.url} 
                            >
                            </img>
                         </div>
                      <div style={{
                        width: '90%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        }}>
                          <h1 style={{fontWeight: '400'}}>{DataSport?.data?.meta?.title}</h1>
                          <p>{DataSport?.data?.meta?.subscriberCountText} d'abonnés</p>
                      </div>
                    </div>
                  <div style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      }}>
                         <h2 style={{
                          width: '12%', 
                          borderBottom: '2px solid black',
                          fontWeight: '500', 
                          fontSize: '18px',
                          padding: '10px',
                          textAlign: 'center',
                          }}>
                            À LA UNE
                      </h2>
                    </div>
                </div>
          <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>          
          <DisplayContent 
            Data={DataSport}
            refWidth={refWidth}
            setDataContext={setDataContext}
            setOption={setOption}
            LogochannelThumbnail={false}
          />
          </div>
        </div>  
      </div>
    </ErrorBoundary> 
</> 
    )
}