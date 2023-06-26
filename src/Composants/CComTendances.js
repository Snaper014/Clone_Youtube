import * as React from 'react';
import '../App.css';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchTrends } from '../utils/Appel';


const Poutre = React.createContext()
const nouveautes = "nouveautés";
const Jv = "jeux vidéo";

 function Composantcompose({children, ...props}){
  const [selectid, setSelectid] = React.useState(0)
  const Changer = (selectid) => setSelectid(selectid)

    return(
          <Poutre.Provider value={{selectid, Changer}} {...props}>
          <div className="DIVtrend">{children}</div>
          </Poutre.Provider>
      )
    
}

 function usePorte(){
    const context = React.useContext(Poutre)
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
function ContenuNouv({choix = 'now'}){
  const {data: dataTrend, isLoading, isError, error} = useQuery({queryKey: [`Fetch${choix}Tendance`] ,queryFn: () => fetchTrends(choix)})
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
        {dataTrend?.data?.data?.map((element, index) => {
          if(element?.type === 'video'){
            return(
              <div key={index} className="GridTrend" onClick={() => HandleVideos(element?.videoId)}>
                <div style={{width: '100%', marginLeft: '2%'}}>
                  <img alt={element?.title} src={element?.thumbnail[0]?.url} height="138px"  style={{borderRadius: '10px', width: '100%'}}></img>
                </div>
                <div className="BoxeTends">
                      <p style={{fontSize: '18px', width: '50%'}}>{element?.title}</p>
                      <div className="ContenuNumero5">
                              <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.channelTitle}</p>
                              <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                              <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.viewCount} vues</p>
                              <div style={{ width: '2px', height: '2px', borderRadius: '50%', backgroundColor: 'black', MarginLeft: '5px', marginRight: '5px'}}></div>
                              <p style={{MarginLeft: '5px', marginRight: '5px'}}>{element?.publishedTimeText}</p>
                      </div>
                          <p style={{fontSize: '12px', width: '70%'}}>{element?.description}</p>
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

function King() {
  return (
    <>
    <Composantcompose>
        <Podium >
          <Place>{nouveautes.toLocaleUpperCase()}</Place>
          <Place>MUSIQUE</Place>
          <Place>{Jv.toLocaleUpperCase()}</Place>
          
        </Podium >
        <Texte>
              <Zert><ContenuNouv choix='now'/></Zert>
              <Zert><ContenuNouv choix='music'/></Zert>
              <Zert><ContenuNouv choix='games'/></Zert>
        </Texte>
    </Composantcompose>
    
    </>
  )
}

export default King;