import * as React from 'react';
import '../App.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FetchMusique } from '../utils/Appel';


const contexte = React.createContext()

 function Composantcompose({children, ...props}){
  const [selectid, setSelectid] = React.useState(0)
  const Changer = (selectid) => setSelectid(selectid)

    return(
          <contexte.Provider value={{selectid, Changer}} {...props}>
          <div className="DIVtrend">{children}</div>
          </contexte.Provider>
      )
    
}
 function usePorte(){
    const context = React.useContext(contexte)
        if(!context){
           throw new Error('Vous venez d\'utiliser ou de modifer le composant hors contexte')
        }
  return context
}
 function Podium({children, ...props}){

    const clone = React.Children.map(children, (element, index) => React.cloneElement(element, 
      {index, ...props})
    )
    return <div className="SelecBTN">{clone}</div>
}
 function Place({index, children}){
  const {selectid, Changer} = usePorte()
  return(
                <button className={ selectid === index ? "activer": "normal"} 
                key={index}
                onClick={() => Changer(index)}
                >{children}</button>          
    )}

 function Zert({index, children}){
      const{selectid} = usePorte()
      return selectid === index ? <>{children}</> : null
    }

  function Texte({children, ...props}){
    const{selectid} = usePorte()
  return React.Children.map(children, (element, index) => React.cloneElement(element, 
    {selectid, index, ...props})
  )
  
}

function Contenu({choix, id}){
    const {data: dataTrend, isLoading, isError, error} = useQuery({queryKey: [`Fetch/${choix}/Musique`] ,queryFn: () => FetchMusique(id)})
    const navigate = useNavigate();
    const HandleVideos = (id) => {
        navigate(`/watch/${id}`)
    }
    if(isLoading){
        return (
         <div style={{margin: '0 auto', width: '15%'}}>
           <CircularProgress />
         </div> 
        )         
        //import spinner MUI 
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
        
          {dataTrend?.data?.data?.map((element, index) => (
            <div key={index} className="GridTrend" onClick={() => HandleVideos(element?.videoId)}>
              <div style={{width: '100%', marginLeft: '2%'}}>
                <img alt={element?.title} src={element?.thumbnail[0]?.url} height="138px"  style={{borderRadius: '10px', width: '100%'}}></img>
              </div>
              <div className="BoxeTends">
                    <p style={{fontSize: '18px', width: '50%'}}>{element?.title}</p>
                    <div className="ContenuNumero5">
                            <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.channelTitle}</p>
                            <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false" className="style-scope yt-icon" style={{pointerEvents: 'none', display: 'block',width: '15px', height: '15px',}}><g className="style-scope yt-icon"><path d="M12,4v9.38C11.27,12.54,10.2,12,9,12c-2.21,0-4,1.79-4,4c0,2.21,1.79,4,4,4s4-1.79,4-4V8h6V4H12z" className="style-scope yt-icon"></path></g></svg>
                    </div>
                        <p style={{fontSize: '12px', width: '70%'}}>{element?.description}</p>
              </div>
            </div>
          ))}
    </>
    )
}

function Queen() {
  return (
    <>
    <Composantcompose>
        <Podium >
          <Place>La Hit List</Place>
          <Place>Rap Podium</Place>
          <Place>Le Coin chill</Place>
          <Place>Released</Place>
          
        </Podium >
        <Texte>
              <Zert><Contenu choix={`hitlist`} id={'RDCLAK5uy_ly6s4irLuZAcjEDwJmqcA_UtSipMyGgbQ'}/></Zert>
              <Zert><Contenu choix={`Rap Podium`} id={'RDCLAK5uy_mK9RSAOLuO3PT_u74S1YJzlUneNOgTUTE'}/></Zert>
              <Zert><Contenu choix={`Le Coin chill`} id={'RDCLAK5uy_l33rnweoz4jR7hsfgDJrpkExUnA-9B45E'}/></Zert>
              <Zert><Contenu choix={`Releasead`} id={'RDCLAK5uy_mztvVkPbbOgYQFQUOi9VbLcZ4ewdmBczw'}/></Zert>
        </Texte>
    </Composantcompose>
    
    </>
  )
}

export default Queen;