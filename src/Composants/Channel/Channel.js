import * as React from 'react';
import '../../App.css';
import { AllVideos } from './AllVideosChannel';
import { ChannelHome } from './Accueil';
import { StreamLive } from './LiveStreams';
import { AllShortsChannel } from './ShortsChannel';
import { PlaylistChannel } from './ChannelPlaylist';
import { Subscriptions } from './Subscriptions';
import { Liens } from './Liens';



const Contexte = React.createContext()
 function Composantcompose({children, ...props}){
  const [selectid, setSelectid] = React.useState(0)
  const Changer = (selectid) => setSelectid(selectid)

    return(
          <Contexte.Provider value={{selectid, Changer}} {...props}>
          <div className="DIVtrend">{children}</div>
          </Contexte.Provider>
      )
    
}
 function useContexte(){
    const context = React.useContext(Contexte)
        if(!context){
           throw new Error('Vous venez d\'utiliser ou de modifer le composant hors contexte')
        }
  return context
}
 function Tabs({children, ...props}){

    const clone = React.Children.map(children, (element, index) => React.cloneElement(element, 
      {index, ...props})
    )
    return <div className="SelecBTN">{clone}</div>
}
 function Tab({index, children}){
  const {selectid, Changer} = useContexte()
  return(
                <button className={ selectid === index ? "activer": "normal"} 
                key={index}
                onClick={() => Changer(index)}
                >{children}</button>          
    )}

 function Contenu({index, children}){
      const{selectid} = useContexte()
      return selectid === index ? <>{children}</> : null
    }

  function Texte({children, ...props}){
    const{selectid} = useContexte()
  return React.Children.map(children, (element, index) => React.cloneElement(element, 
    {selectid, index, ...props})
  )
  
}


function ChannelYTB({data}) {
    const categorie = ["Accueil", "Vidéos", "Shorts", "En direct", "Playlists", 
    "Chaînes", "À propos"]
    const NewData = data.data.meta.tabs;
  //const navigate = useNavigate();
  /*const HandleVideos = (id) => {
      navigate(`/watch/${id}`)
  }*/
 return (
    <>
    <Composantcompose>
        <Tabs>
           <Tab>{categorie[0].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[1].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[2].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[3].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[4].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[5].toLocaleUpperCase()}</Tab>
           <Tab>{categorie[6].toLocaleUpperCase()}</Tab>
        </Tabs>
        <Texte>
              <Contenu>{NewData.includes("Accueil") ? <ChannelHome data={data}/> : ''}</Contenu>
              <Contenu>{NewData.includes("Vidéos") ? <AllVideos /> : ''}</Contenu>
              <Contenu>{NewData.includes("Shorts") ? <AllShortsChannel /> : 'Cette Chaîne ne contient aucun shorts'}</Contenu>
              <Contenu>{NewData.includes("En direct") ? <StreamLive /> : ''}</Contenu>
              <Contenu>{NewData.includes("Playlists") ? <PlaylistChannel /> : 'dcdccd'}</Contenu>
              <Contenu>{NewData.includes("Chaînes") ? <Subscriptions /> : 'Cette chaîne ne présente aucune autre chaîne.'}</Contenu>
              <Contenu>{NewData.includes("À propos") ? <Liens /> : 'sdsdsd'}</Contenu>
        </Texte>
    </Composantcompose>
    
    </>
  )
}

export default ChannelYTB;