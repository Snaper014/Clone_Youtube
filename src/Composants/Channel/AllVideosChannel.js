import * as React from 'react';
import '../../App.css';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetChannelVideos } from '../../utils/Appel';
import { useQuery } from '@tanstack/react-query';



export function AllVideos(){
    let {chaId} = useParams()
    const navigate = useNavigate()
    const {data: DataVideos, isLoading, isError, error} = useQuery({ 
        queryKey: [`Fetch Channel All videos`] ,
        queryFn: () => GetChannelVideos(chaId)
    })
    console.log(DataVideos)
    if(isLoading){
        return (
          <div style={{margin: '0 auto', width: '15%'}}>
            <CircularProgress />
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
    const HandleVideos = (id) => {
        navigate(`/watch/${id}`)
    }
    
    return(
        <div style={{
            width: '100%',
            border: '2px solid yellow',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',

        }}>
            {DataVideos?.data?.data.map((items, i) => (
                        <div key={i} style={{
                            height: '100%',
                            display: 'flex',
                            width: '23%',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginRight: '2%',
                            marginBottom: '3%'
                        }}>
                            <div onClick={() => HandleVideos(items?.videoId)} 
                                style={{position: 'relative', width: '100%'}}>
                                <img 
                                    width={"100%"}
                                    style={{borderRadius: '5%', cursor: 'pointer'}}  
                                    alt={items?.title}
                                    src={items?.thumbnail[1]?.url}>
                                </img>

                            </div>
            
                                <h6 style={{fontWeight: '600', 
                                            width: '100%', 
                                            fontSize: '18px',
                                            marginBottom: '2%'
                                            }}>
                                    {items?.title.length >= 63 ? 
                                        items?.title?.substring(0, 63) + "..."
                                    : items?.title}
                                </h6>
                  
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                                width: '100%',
                                fontSize: '0.8em',
                            }}>
                             <p style={{MarginLeft: '5px', marginRight: '5px'}}>{items?.viewCount} vues</p>
                             <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                             <p style={{MarginLeft: '5px', marginRight: '5px'}}>il y a {items?.publishedTimeText}</p>
                            </div>
                        </div>
            ))}
        </div>        
    )
}