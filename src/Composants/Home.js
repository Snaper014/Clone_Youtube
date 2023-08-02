import * as React from 'react';
import { AppBarSecondary } from './AppBarSecondary';
import '../App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from '../Composants/FallbackError';
import { FetchHomeFeed } from '../utils/Appel';
import BarSearch from './AppBarPrimary';
import { CircularProgress } from '@mui/material';
import { DisplayContent } from '../utils/utils2';
import { useQuery } from '@tanstack/react-query';
import { useData } from '../utils/ContextProvider';

function Home() {
  const {data: DataYTB, isLoading, isError, error} = 
          useQuery({queryKey: [`Fetch Home Page`] ,
          queryFn: () => FetchHomeFeed()})
console.log("data Home", DataYTB)
const refWidth = React.useRef(null);
const {setDataContext, setOption} = useData();

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
    return(
      <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
  <div className="GridP">
      <div><AppBarSecondary /></div>
      <div ref={refWidth} style={{
        padding: '3vh 0px 3vh 0px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        border: '2px solid rgb(0, 255, 149)',
        color: 'black',
        width: '100%',
      }}>
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
          <DisplayContent 
            Data={DataYTB}
            refWidth={refWidth}
            setDataContext={setDataContext}
            setOption={setOption}
            LogochannelThumbnail={true}
          />
      </div> 
      </div>
    </div>
    </ErrorBoundary> 
  </>
)}
  export {Home}