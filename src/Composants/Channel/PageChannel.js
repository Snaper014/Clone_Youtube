import * as React from 'react';
import '../../App.css';
import ChannelYTB from './Composantcompose';
import { AppBarSecondary} from '../AppBarSecondary';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../FallbackError';
import BarSearch from '../AppBarPrimary';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { GetChannelHomeUser } from '../../utils/Appel';
import { VscVerifiedFilled } from 'react-icons/vsc';



 export function PageYoutubeur(){
    let {chaId} = useParams()
    const [dataChannel, setDataChannel] = React.useState(null)
    const [error, setError] = React.useState(null)
    console.log("DataChannel", dataChannel)
    React.useEffect(() => {
        GetChannelHomeUser(chaId)
        .then(data => setDataChannel(data))
        .catch(error => setError(error))
  }, [chaId])

  if(!dataChannel){
      return (
        <div style={{display: 'flex',alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh'}}>
          <CircularProgress style={{fontSize: '40px'}}/>
        </div>
      )         
  }
  if(error){
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
            <div className="ContainerChannel">
                <div className="SectionImageChannel">
                  <div style={{
                      width: '100%', 
                      height: '65%',
                      }}>
                    {dataChannel?.data?.meta?.banner !== null ?    
                      <img width={"100%"}
                          height={"100%"}
                          alt={dataChannel?.data?.meta?.channelHandle}
                          src={dataChannel?.data?.meta?.banner[3]?.url}
                      >
                      </img> : <div style={{
                              backgroundColor: 'white',
                              height: '100%',
                              width: '100%',
                        }}></div>
                          }     
                  </div>
                  <div style={{
                      width: '100%',
                      height: '35%',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                  }}>
                    <div style={{
                            display: 'flex', 
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0px 0px 0px 2%',
                            height: '100%'
                            }}>
                        <img 
                        style={{borderRadius: '50%'}}
                        alt={dataChannel?.data?.meta?.title} 
                        src={dataChannel?.data?.meta?.avatar[1]?.url}
                        width="100px"
                        height="100px" 
                        >
                        </img>
                    </div>
                  <div style={{
                                display: 'flex', 
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                height: '100%',
                                marginLeft: '2%',
                                }}>
                    <div style={{width: '100%', 
                                marginBottom: '1%', 
                                }}>
                            <h4 style={{fontSize: '20px', fontWeight: '400'}}>
                              {dataChannel?.data?.meta?.title} {' '}
                              {dataChannel?.data?.meta?.isVerified ? <VscVerifiedFilled /> : null}
                              </h4>
                    </div>
                      <div style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          width: '100%',
                      }}>
                          <p style={{display: 'inline', marginRight: '10px', fontWeight: '600'}}>{dataChannel?.data?.meta?.channelHandle}</p>
                          <p style={{display: 'inline', marginRight: '10px'}}>{dataChannel?.data?.meta?.subscriberCountText} d'abonnés</p>
                          <p style={{display: 'inline', marginRight: '10px'}}>{dataChannel?.data?.meta?.videosCountText} vidéos</p>
                      </div>  
                      <div style={{fontSize: '0.8em', width: '100%'}}>{dataChannel?.data?.meta?.description.length >= 70 ?
                              <p>{dataChannel?.data?.meta?.description.substring(0, 78) + "..."} </p>

                            : <p>{dataChannel?.data?.meta?.description}</p>
                          }</div>         
                    
                  </div>
            </div>

                    </div>
                    <div style={{
                        width: '100%',
                        padding: '0vh 3vh 3vh 3vh',
                    }}>
                        <ChannelYTB data={dataChannel}/>
                    </div>
            </div>  
        </div>
    </ErrorBoundary> 
</> 
    )
}

