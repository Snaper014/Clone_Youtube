import * as React from 'react';
import '../../App.css';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetChannelShorts} from '../../utils/Appel';
import { useQuery } from '@tanstack/react-query';
import { useData } from '../../utils/ContextProvider';


export function AllShortsChannel(){
    let {chaId} = useParams()
    const navigate = useNavigate()
    const {setDataContext} = useData()
    const {data: DataShorts, isLoading, isError, error} = useQuery({ 
        queryKey: [`Fetch Channel All videos`] ,
        queryFn: () => GetChannelShorts(chaId)
    })
    console.log(DataShorts)
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
    const HandleShorts = (index, data) => {
        setDataContext(data)
        navigate(`/List/Shorts/${index}`)
    }

    return(
        <div style={{
            width: '100%',
            height: '100%',
            border: '2px solid yellow',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',

        }}>
            {DataShorts?.data?.data.map((items, i) => (
                        <div key={i} style={{
                            height: '85vh',
                            display: 'flex',
                            width: '24%',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginBottom: '0.5%',
                            cursor: 'pointer',
                        }} onClick={() => HandleShorts(i, DataShorts)}>
                         <div style={{width: '100%', height: '75%'}}>
                            <img style={{borderRadius: '10px'}} alt={items?.title} width="100%" height="100%" src={items?.thumbnail[0]?.url}></img>
                         </div>
                         <div style={{width: '100%', height: '25%'}}>
                         <h6 style={{fontWeight: '600', 
                                            width: '100%', 
                                            fontSize: '18px',
                                            marginBottom: '2%'
                                            }}>
                                    {items?.title.length >= 63 ? 
                                        items?.title?.substring(0, 63) + "..."
                                    : items?.title}
                                </h6>
                           <p>{items?.viewCountText}</p>
                        </div>        
                </div>
            ))}
        </div>    
    )
}
