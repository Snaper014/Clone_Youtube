import * as React from 'react';
import '../../App.css';
import { useParams} from 'react-router-dom';
import { GetAbout} from '../../utils/Appel';
import { CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';


export function Liens(){
    let {chaId} = useParams()
    const {data, isLoading, isError, error} = useQuery({ 
        queryKey: [`Fetch Channel All videos`] ,
        queryFn: () => GetAbout(chaId)
    })

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
        <div style={{width: '100%', 
                    border : '1px sold green',
                    display: 'flex',
                    flexDirection: 'column',
                    fontSize: '18px'
            }}>
            <div style={{width: '100%',
                border: '1px solid orange',
                display: 'flex',
                flexDirection: 'row',
            }}>
                <div style={{width: '70%', 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            border: '1px solid red',
                            }}>
                  <h4 style={{marginBottom: '2%', fontSize: '22px'}}>Description</h4>
                  <p style={{marginBottom: '4%'}}>{data?.data?.description}</p>
                  <hr />
                  <p style={{marginBottom: '2%', fontSize: '18px'}}>Informations</p>
                  <div style={{width: '100%', marginBottom: '5%'}}> 
                        pays : <span style={{marginLeft: '5%'}}>{data?.data?.country}</span>
                    </div>
                    <hr />
                {!data?.data?.links ? <div></div> : 
                <>
                    <p style={{marginBottom: '2%', fontSize: '18px'}}>Liens</p>
                    <div style={{display: 'flex', 
                                    flexDirection: 'row', 
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-between',
                                    width: '50%',
                            }}>
                    {data?.data?.links.map((element, index) => (
                        <Link target="_blank" rel="noopener noreferrer" to={element?.link} key={index} style={{width: '50%', marginBottom: '5%'}}>{element?.title}</Link>
                    ))} 
                </div>
                </>} 
                
                </div>
                <div style={{width: '30%', border: '1px solid yellow', display: 'flex', flexDirection: 'column'}}>
                        <p style={{marginBottom: '2%' , fontSize: '22px'}}>Statistiques</p>
                        <hr />
                        <p style={{marginBottom: '2%', fontSize: '18px'}}> Actif depuis le {data?.data?.joinedDate}</p>
                        <hr />
                        <p style={{marginBottom: '2%', fontSize: '18px'}}>{data?.data?.viewCount} vues</p>
                        <hr />   
                </div>
            </div>
        </div>
    )
}