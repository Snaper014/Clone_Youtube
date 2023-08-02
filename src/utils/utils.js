import * as React from 'react';
import '../App.css';
import { CardCaroussel } from '../Composants/Carsoussel';
import { IoIosRadio } from "react-icons/io";
import { Link} from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchTrends } from './Appel';


export const ButtonNaviguation = ({route, texte, logo}) => {
    return(
        <Link to={`${route}`} className='HoverColorGray' style={{
            textDecoration: 'none', 
            color: 'black',
            height: '13vh',
            display: 'flex',
            borderRadius: '10px',
            width: '80%',
            alignItems: 'center',
            justifyContent: 'center',
            }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {logo}
                <p>{texte}</p>   
            </div>
        </Link>
    )
}
export const ButtonNavPrimaryOne = ({route, logo, texte, height = 'auto'}) => {
        return (
            <Link to={`${route}`}
                  style={{
                    textDecoration: 'none',
                    color: 'black',
                    width: '75%',
                    cursor: 'pointer',
                    margin: `${texte === "Historique" ? "0vh 2vw 3vh 2vw" : "0vh 2vw 0vh 2vw"}`,
                  }}    
            >
               <div 
                    className='HoverColorGray'
                    style={{
                    display: 'flex',
                    flexDirection: 'row',
                    borderRadius: '10px',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: '100%',
                    fontSize: '18px',
                    height: `${height}`,
                    border: '1px solid transparent',
               }}>
                 {logo}
                 <p>{texte}</p>
               </div>
            </Link>
        )
}

export const CheckWidth =  (
    ref,
    setWidthVideos, 
    setWidthShorts,
    setMarginLeft,
    setMarginRight,
    HasCaroussel = false,
    setValue = 0,
) => {
    let Largeur = window.innerWidth;
    const { width } = ref.current.getBoundingClientRect();
    let WidthContainer = width;
    //Width Container with Caroussel
    let WCWC = width * 0.90;
    // console.log("test" , width);
    // console.log("Largeur Fenetre", Largeur);
    // console.log("largeur conteneur", WidthContainer);
    if(HasCaroussel){
      if(WCWC){
        if(Largeur <= 1175){
          let width = WCWC * 0.23;
          console.log(width)
          setWidthVideos(`${width}px`)
          setMarginLeft(`${Math.round(WCWC) * 0.005}px`)
          setMarginRight(`${Math.round(WCWC) * 0.014}px`)
          setValue(4);
        }
        if(Largeur >= 1176  && Largeur <= 1604){
          let width = WCWC * 0.185;
          console.log(width)
          setWidthVideos(`${width}px`)
          setMarginLeft(`${Math.round(WCWC) * 0.009}px`)
          setMarginRight(`${Math.round(WCWC) * 0.006}px`)
          setValue(5)
        }
        if(Largeur >= 1605){
          let width = Math.round(WCWC * 0.150);
          console.log(width)
          setWidthVideos(`${width}px`)
          setMarginLeft(`${Math.round(WCWC) * 0.01}px`)
          setMarginRight(`${Math.round(WCWC) * 0.006}px`)
          setValue(6)
        }
      }
    }else{
      if(WidthContainer){
        if(Largeur <= 1115){
          let width = WidthContainer * 0.46;
          let WidthShorts = WidthContainer * 0.300;
          console.log(width)
          setWidthVideos(`${width}px`)
          setWidthShorts(`${WidthShorts}px`)
          setMarginLeft(`${Math.round(WidthContainer) * 0.014}px`)
          setMarginRight(`${Math.round(WidthContainer) * 0.023}px`)
        }
        if(Largeur >= 1116  && Largeur <= 1603){
          let width = WidthContainer * 0.315;
          let WidthShorts = WidthContainer * 0.183;
          console.log(width)
          setWidthVideos(`${width}px`)
          setWidthShorts(`${WidthShorts}px`)
          setMarginLeft(`${Math.round(WidthContainer) * 0.005}px`)
          setMarginRight(`${Math.round(WidthContainer) * 0.012}px`)
        }
        if(Largeur >= 1604 && Largeur <= 1945){
          let width = WidthContainer * 0.23;
          let WidthShorts = WidthContainer * 0.148;
          console.log(width)
          setWidthVideos(`${width}px`)
          setWidthShorts(`${WidthShorts}px`)
          setMarginLeft(`${Math.round(WidthContainer) * 0.005}px`)
          setMarginRight(`${Math.round(WidthContainer) * 0.014}px`)
        }
        if(Largeur >= 1946 && Largeur <= 2295){
          let width = WidthContainer * 0.183;
          let WidthShorts = WidthContainer * 0.108;
          console.log(width)
          setWidthVideos(`${width}px`)
          setWidthShorts(`${WidthShorts}px`)
          setMarginLeft(`${Math.round(WidthContainer) * 0.01}px`)
          setMarginRight(`${Math.round(WidthContainer) * 0.006}px`)
        }
        if(Largeur >= 2296){
          let width = Math.round(WidthContainer * 0.150);
          let WidthShorts = WidthContainer * 0.095;
          console.log(width)
          setWidthVideos(`${width}px`)
          setWidthShorts(`${WidthShorts}px`)
          setMarginLeft(`${Math.round(WidthContainer) * 0.01}px`)
          setMarginRight(`${Math.round(WidthContainer) * 0.006}px`)
        }
      }

    }
  }

  export const MoreContent = (numero, choice = false) => {
    let Container = document.getElementById(`Container-level-${numero}`);
    let button = document.getElementById(`Button-section-${numero}`);
    let element = Container.querySelector(`${choice ? '.shorts' : 'div'}`);
    console.log(element);
    element.style.flexWrap = "wrap";
    button.remove();
  }

  export function ContentTrend({choix = 'now'}){
    const {data: dataTrend, isLoading, isError, error} = 
    useQuery({queryKey: [`Fetch${choix}Tendance`] ,
    queryFn: () => fetchTrends(choix)})
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
      <> 
          {dataTrend?.data?.data?.map((element, index) => {
            if(element?.type === 'video'){
              return(
                <div key={index} className="GridTrend">
                  <Link to={`/watch/${element?.videoId}`} 
                  style={{textDecoration: 'none', color: 'black'}}>
                  <div style={{marginLeft: '2%', position: 'relative'}}>
                    <img alt={element?.title} src={element?.thumbnail[0]?.url} height="175px" width={"300px"}  style={{borderRadius: '10px'}}></img>
                    <div className={`${element?.lengthText === "EN DIRECT" ? 'IndicatorLive' : 'IndicatorView'}`}>
                      <p style={{margin: '0.3em', fontWeight: '600'}}>
                        {element?.lengthText}
                      </p>
                    </div>
                  </div>
                  </Link>
                  <div className="BoxeTends">
                  <Link to={`/watch/${element?.videoId}`} 
                        style={{textDecoration: 'none', color: 'black', width: '50%'}}
                        >
                        <p style={{
                           fontSize: '18px', 
                           width: '100%', 
                           fontWeight: '550', 
                           cursor: 'pointer'
                        }}>
                          {element?.title}
                        </p>
                  </Link>        
                        <div className="ContenuNumero5">
                                <Link to={`/Channel/${element?.channelId}`} 
                                  style={{MarginLeft: '5px', 
                                          marginRight: '5px',
                                          textDecoration: 'none',
                                          color: 'black', 
                                      }}>
                                    {element?.channelTitle}
                                </Link>
                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} vues</p>
                                <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                                <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.publishedTimeText}</p>
                        </div>
                        <Link to={`/watch/${element?.videoId}`} 
                        style={{textDecoration: 'none', color: 'black', width: '50%'}}
                        >
                          <p style={{
                              fontSize: '12px', 
                              width: '70%', 
                              cursor: 'pointer'
                              }}>
                              {element?.description}
                          </p>
                        </Link>
                  </div>
                </div>
              )
            }
            else{
              return null
            }
        })}
    </>
    )
  }

  export const NewSearchs = ({
    data,
    setDataContext,
    setOption,
    value,
    WidthShorts,
    marginLeft,
    MarginRight,
  }) => {
    
       return(
        <>
          {!data ? <div style={{width: '100%'}}>chargement...</div> :
             data?.data?.data.map((element, index) => {
                if(element?.type === "channel"){
                  return (
                    <a href={`/Channel/${element?.channelId}`}
                        key={index}
                        style={{textDecoration: 'none', color: 'black'}} 
                      >
                    <div className="SearchContainer">
                    <div style={{
                          display: 'flex', 
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '450px',
                          height: '250px',
                          }}>
                      <img 
                        style={{borderRadius: '50%'}}
                        alt={element?.title} 
                        src={`https:${element?.thumbnail[1]?.url}`}
                        width="176"
                        height="176" 
                        >
                        </img>
                    </div>
                    <div style={{marginLeft: '2%'}}>
                      <p style={{fontSize: '20px', marginBottom: '1%'}}>{element?.title}</p>
                        <div className="ContenuHomedescripVide">
                                    <p>{element?.publishedText}</p>
                        </div>           
                      <div style={{marginBottom: '2%', display: 'flex', flexDirection: 'row'}}>
                        <p>{element?.channelTitle}</p>
                      </div>
                      <p>{element?.description}</p>
                    </div>
                  </div>
                  </a>
                  )
                }
                if(element?.type === "video"){
                  return(
                <div key={index} className="SearchContainer">
                  <a href={`/watch/${element?.videoId}`} 
                     style={{textDecoration: 'none', color: 'black'}}>
                  <div style={{position: 'relative', cursor: 'pointer'}}>
                    <img alt={element?.title} src={element?.thumbnail[0]?.url} height="250px" width="450px" style={{borderRadius: '10px'}}></img>
                    <div className={`${element?.lengthText === "EN DIRECT" ? '' : 'IndicatorView'}`}><p style={{margin: '0.3em', fontWeight: '600'}}>{element?.lengthText === "EN DIRECT" ? '' : element?.lengthText}</p></div>
                  </div>
                  </a>
                  <div style={{marginLeft: '2%'}}>
                    <p style={{fontSize: '20px', marginBottom: '1%'}}>{element?.title}</p>
                      <div className="ContenuHomedescripVide">
                          {element?.viewCount === "" && (null)}
                          {element?.lengthText === "EN DIRECT" && (
                            <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} spectateurs</p>
                          )}
                          {element?.viewCount !== "" && element?.lengthText !== "EN DIRECT" &&(
                              <>
                              <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} de vues</p>
                              <div style={{display: 'flex', alignSelf: 'center', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                              <p>{element?.publishedTimeText}</p>
                              </>
                          )}          
                      </div>
                      <a href={`/Channel/${element?.channelId}`}
                        key={index}
                        style={{textDecoration: 'none', color: 'black'}} 
                      >            
                    <div style={{marginBottom: '2%', 
                            display: 'flex', 
                            flexDirection: 'row',
                            cursor: 'pointer',
                            }}>
                    <img style={{ 
                            width: '25px', 
                            height: '25px',
                            borderRadius: '50%', 
                            marginRight: '1%',
                            }} src={element?.channelThumbnail[0]?.url} alt={element?.title}>
                            </img>
                      <p>{element?.channelTitle}</p>
                    </div>
                    </a>
                    <p>{element?.description}</p>
                    {element?.lengthText === "EN DIRECT" ? 
                        <p style={{
                          backgroundColor: 'rgba(204, 0, 0, 0.9)',
                          marginTop: '1%',
                          color: 'white',
                          borderRadius: '2px', 
                          width: '14%',
                          fontSize: '1em',
                          display: 'flex',
                          flexDirection: 'row',
                          flexWrap: 'nowrap',
                          alignItems: 'center',
                          justifyContent: 'space-around',
                          fontWeight: '550',
    
                          }}>
                            <IoIosRadio color='white' fontSize={25}/>
                            EN DIRECT
                        </p>
                     : null}
                    {!element?.badges || element?.lengthText === "EN DIRECT" ? 
                        null  :  
                      <p style={{
                        backgroundColor: '#efeff1',
                        marginTop: '1%',
                        borderRadius: '2px', 
                        width: '10%',
                        fontSize: '0.8em',
                        textAlign: 'center',
                        fontWeight: '550',
  
                        }}>NOUVEAU</p>}
                  </div>
                </div>
              )}
          if(element?.type === "shorts_listing"){
            return(
            <div 
            key={index}
            className="ContainerSearchShorts"
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              border: '2px solid orange',
              width: `100%`,
            }}>
              <div style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginBottom: '2%',
              }}>
                <img alt="logo shorts" src='/youtube-shorts.png'></img>
                <h2 style={{marginLeft: '2%'}}>{element?.title}</h2>
              </div>
              <div style={{
                 display: 'flex',
                 width: '100%',
                 alignItems: 'flex-start',
                 justifyContent: 'flex-start',
                 overflow: 'hidden',
                 flexDirection: 'row', 
                 flexWrap: 'nowrap',
              }}>
              <CardCaroussel value={value} shorts>
              {element?.data.map((items, i) => (
                    <a href={`/List/Shorts/${i}`} 
                          style={{textDecoration: 'none', color: 'black'}}
                          key={i} 
                          onClick={() => {
                            setOption(true);
                            setDataContext(element);
                          }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      flexDirection: 'column',
                      flexWrap: 'nowrap',
                      width: `${WidthShorts}`,
                      marginLeft: `${marginLeft}`,
                      marginRight: `${MarginRight}`,
                      cursor: 'pointer',
                    }}>
                      <img style={{borderRadius: '10px'}} 
                            alt={items?.title} 
                            src={items?.thumbnail[0]?.url} 
                            width={WidthShorts} height="465px">
                      </img>
                      <h4 style={{
                        fontWeight: '600', 
                        width: '100%', 
                        fontSize: '16px',
                        marginBottom: '2%',
                      }}> 
                      {items?.title.length >= 63 ? 
                        items?.title?.substring(0, 63) + "..."
                        : items?.title}
                      </h4>
                      <p>{items?.viewCountText}</p>
                    </div>
                    </a>
                ))}
              </CardCaroussel> 
              </div> 
            </div>
          )}
    return null;})}
      </>
      )
    }

 