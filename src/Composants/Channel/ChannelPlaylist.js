import * as React from 'react';
import '../../App.css';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GetChannelPlaylist } from '../../utils/Appel';
import { useQuery } from '@tanstack/react-query';
import { MdOutlinePlaylistPlay} from "react-icons/md";
import { BsPlayFill } from "react-icons/bs";




export function PlaylistChannel(){
    let {chaId} = useParams()
    const navigate = useNavigate()
    const [Lecture, setLecture] = React.useState(null)
    const {data: DataPlaylist, isLoading, isError, error} = useQuery({ 
        queryKey: [`Fetch channel playlist`] ,
        queryFn: () => GetChannelPlaylist(chaId),
    })
    //console.log("dataplayslist" , DataPlaylist)
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
    const HandlePlaylist = (videoid, playlist, index = 0) => {
        navigate(`/Playlist/${videoid}/${index}/${playlist}`)
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
            {DataPlaylist?.data?.data.map((items, i) => (
                        <div key={i} style={{
                            height: '100%',
                            display: 'flex',
                            width: '23%',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                            marginRight: '2%',
                            marginBottom: '3%',
                            cursor: 'pointer',
                        }} onMouseOver={() => setLecture(i)} 
                        onClick={() => HandlePlaylist(items?.videoId, items?.playlistId, 0)} 
                        onMouseLeave={() => setLecture(null)}>
                            <div style={{position: 'relative', width: '100%'}}>
                                <img 
                                    width={"100%"}
                                    style={{borderRadius: '5%'}}  
                                    alt={items?.title}
                                    src={items?.thumbnail[0]?.url}>
                                </img>
                              <div  style={{
                                position: 'absolute',
                                width: '100%',
                                height: '20%',
                                bottom: '0',
                                color: 'white',
                                fontSize: '14px',
                                background: 'rgba(0, 0, 0, 0.5)',
                                borderRadius: '8px',
                                pointerEvents: 'none',
                                marginBottom: '0.3rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                              }}>
                                    <MdOutlinePlaylistPlay color='white' fontSize={20} style={{marginLeft: '2%'}}/>
                                    <p style={{marginRight: '2%', fontWeight: '550'}}>{items?.videoCount} vidéos</p>
                              </div>
                              {Lecture === i ? <div style={{
                                    width: '100%',
                                    height: '98%',
                                    bottom: '0',
                                    borderRadius: '5%',
                                    marginBottom: '0.3rem',
                                    position: 'absolute',
                                    background: 'rgba(0, 0, 0, 0.7)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                              }}>
                                <BsPlayFill fontSize={40}/>
                                <p style={{fontWeight: '550', fontSize: '1.1em'}}>TOUT LIRE</p>
                              </div>: null}
                            </div>
                                <h6 style={{fontWeight: '600', 
                                            width: '100%', 
                                            fontSize: '18px',
                                            marginBottom: '3%'
                                            }}>
                                    {items?.title?.length >= 63 ? 
                                        items?.title?.substring(0, 63) + "..."
                                    : items?.title}
                                </h6>
                  
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                flexWrap: 'nowrap',
                                width: '100%',
                                fontWeight: '600',
                                fontSize: '0.9em',
                            }}>
                             <p style={{MarginLeft: '5px', marginRight: '5px'}}>Afficher la playlist compléte</p>
                            </div>
                        </div>
            ))}
        </div>        
    )
}