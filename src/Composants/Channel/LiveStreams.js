import * as React from 'react';
import '../../App.css';
import { CircularProgress } from '@mui/material';
import { Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetChannelLives } from '../../utils/Appel';
import { useQuery } from '@tanstack/react-query';



export function StreamLive(){
    let {chaId} = useParams()
    const {data: DataLive, isLoading, isError, error} = useQuery({ 
        queryKey: [`Fetch Channel All streams`] ,
        queryFn: () => GetChannelLives(chaId)
    })
    console.log(DataLive)
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

    return(
        <div style={{
            width: '100%',
            border: '2px solid yellow',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',

        }}>
            {DataLive?.data?.data.map((items, i) => (
                <Link to={`/watch/${items?.videoId}`}
                style={{
                textDecoration: 'none', 
                color: 'black', 
                width: '23%',
               }}>
                <div key={i} style={{
                    height: '100%',
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    marginRight: '2%',
                    marginBottom: '3%'
                }}>
                    <div style={{position: 'relative', width: '100%'}}>
                        <img 
                            width={"100%"}
                            style={{borderRadius: '5%', cursor: 'pointer'}}  
                            alt={items?.title}
                            src={items?.thumbnail[1]?.url}>
                        </img>
                        <div className={`${items?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{items?.lengthText}</p></div>
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
                        { items?.lengthText === "EN DIRECT" ? null :
                            <>
                            <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                            <p style={{MarginLeft: '5px', marginRight: '5px'}}>il y a {items?.publishedTimeText}</p>
                            </>
                        }
                    </div>
                </div>
               </Link> 
            ))}
        </div>        
    )
}