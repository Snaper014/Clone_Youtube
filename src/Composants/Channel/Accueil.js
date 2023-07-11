import * as React from 'react';
import {CardCaroussel} from '../Carsoussel'
import ReactPlayer from 'react-player/lazy';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import { VscVerifiedFilled } from 'react-icons/vsc';



export function ChannelHome({data}){
    const navigate = useNavigate()
    const CheckWidth = () => {
        let Largeur = window.innerWidth
            console.log("Largeur de l'écran", Largeur)
            //penser à faire le responsive pour portable et tablette
            if(Largeur <= 1175){
                 document.querySelectorAll(".WidthCard").forEach((element) => {
                                        element.style.width = '21vw'
                });
            }
            if(Largeur >= 1176  && Largeur <= 1555){
                document.querySelectorAll(".WidthCard").forEach((element) => {
                   element.style.width = '17vw'
               });

            }
            if(Largeur >= 1556){
                document.querySelectorAll(".WidthCard").forEach((element) => {
                    element.style.width = '14.3vw'
                });

            }        
    }

    const HandleVideos = (id) => {
        navigate(`/watch/${id}`)
    }
    React.useEffect(() => {
        window.addEventListener('resize', CheckWidth);
        return () => window.removeEventListener('resize' , CheckWidth);
            
    }, [])


    return(
        <div style={{
            width: '100%',
            border: '1px solid red',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        }}>
           {data?.data?.data?.map((element, index) => {
                if(element?.type === 'player'){
                    return(
                    <div key={index} style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        height: '250px',
                        marginBottom: '2%'
                    }}>
                        
                            <ReactPlayer 
                                url={`https://www.youtube.com/watch?v=${element?.videoId}`} 
                                className='react-player ShortPlayer' 
                                controls
                                width={"500px"}
                                height={"100%"}
                            />   
    
                        <div style={{
                            width: '55%',
                            border: '1px solid yellow',
                            marginLeft: '2%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            justifyContent: 'flex-start',
                        }}>
                            <h5>
                                {element?.title.length >= 70 ? 
                                element?.description.substring(0, 70) + "..."
                                : element?.title
                                }
                            </h5>
                            <div className="ContenuNumero5">
                                 <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} vues</p>
                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.publishedTimeText}</p>
                            </div>
                            <p style={{width: '100%', marginBottom: '1%'}}>
                              {element?.description.length >= 310 ? 
                                element?.description.substring(0, 310) + "..."
                                : element?.description
                                }
                            </p>
                            <button className='mouseOver' style={{
                                backgroundColor: 'white', 
                                border: 'none', 
                                fontWeight: '550'
                                }}
                                onClick={() => navigate(`/watch/${element?.videoId}`)}
                                > 
                                    LIRE LA SUITE
                                </button>
                        </div>
                    </div>
                )}
                if(element?.type === 'video_listing'){
                    return(
                    <div key={index} style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        border: '2px solid orange',
                    }}>
                        <h3>{element?.title}</h3>
                        <h4 style={{marginBottom: '2%', fontWeight: '400'}}>
                            {element?.subtitle?.length >= 170 ? 
                                element?.subtitle.substring(0, 170) + "..."
                                : element?.subtitle}
                        </h4>
                        <CardCaroussel key={index} >
                        {element?.data.map((items, i) => (
                                <div key={i} className="WidthCard" style={{
                                    height: '100%',
                                    display: 'flex',
                                    width: '17vw',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginRight: '0.5%',
                                }}>
                                        
                                        <img 
                                            onClick={() => HandleVideos(items?.videoId)}
                                            width={"100%"}
                                            style={{borderRadius: '5%', cursor: 'pointer'}}  
                                            alt={items?.title}
                                            src={items?.thumbnail[1]?.url}>
                                       </img>
                    
                                        <h6 style={{fontWeight: '600', width: '100%', fontSize: '18px'}}>
                                            {items?.title.length >= 50 ? 
                                                items?.title?.substring(0, 50) + "..."
                                            : items?.title}
                                        </h6>
                                        <h4 style={{fontWeight: '400', display: 'inline', marginBottom: '2%'}}>
                                            {data?.data?.meta?.title} {' '}
                                            {data?.data?.meta?.isVerified ? <VscVerifiedFilled /> : null}
                                        </h4>
                                        
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        flexWrap: 'nowrap',
                                        width: '100%',
                                        fontSize: '0.8em'
                                    }}>
                                     <p style={{MarginLeft: '5px', marginRight: '5px'}}>{items?.viewCount} vues</p>
                                     <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                     <p style={{MarginLeft: '5px', marginRight: '5px'}}>{items?.publishedTimeText}</p>
                                    </div>
                                </div>

                            ))}
                            </CardCaroussel>
                        </div>
                )}
        return null;                            
           })}
        </div>
)}