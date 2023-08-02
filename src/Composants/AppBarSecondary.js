import * as React from 'react';
import '../App.css';
import { GoHome } from "react-icons/go";
import { BsCollectionPlay, BsFileEarmarkPlay } from "react-icons/bs";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { ButtonNaviguation } from '../utils/utils';



function AppBarSecondary(){
    //const [connecter, setConnecter] = React.useState(false)
    //setConnecter(authentification)
    return(
        <div className="NaviguationGauche">
            <ButtonNaviguation  
                route="/" 
                logo={<GoHome fontSize={28} />}
                texte="Acceuil"
            />
            <ButtonNaviguation  
                route="/Shorts" 
                logo={<BsFileEarmarkPlay fontSize={28}/>}
                texte="Shorts"
            />
             <ButtonNaviguation  
                route="/abonnements" 
                logo={<BsCollectionPlay fontSize={28}/>}
                texte="Abonnements"
            />
            <ButtonNaviguation
                route="/Bibliothéque"
                logo={<MdOutlineVideoLibrary fontSize={28}/>}
                texte="Bibliothèque"
            />
            <ButtonNaviguation
                route="/Historique"
                logo={<GoHistory fontSize={28}/>}
                texte="Historique" 
            /> 
        </div>
    )
}

export {AppBarSecondary}