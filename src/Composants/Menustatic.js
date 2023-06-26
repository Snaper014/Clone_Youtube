import * as React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';


function BarreGauche(){
    //const [connecter, setConnecter] = React.useState(false)
    //setConnecter(authentification)
    return(
        <div className="NaviguationGauche">
            <Link to="/">
                    <input type='button' className="BTN" value="Acceuil"></input>
            </Link>
            <Link to="/abonnements">
                <button className="BTN">Abonnements</button>
            </Link>
            <Link to="/Bibliothéque">
                <button className="BTN">Bibliothéque</button>
            </Link>
            <Link to="/Shorts">
                <button className="BTN">Shorts</button>
            </Link>     
            <Link to="/Historique">
                <button className="BTN">Historique</button>
            </Link>
                
        </div>
    )
}

export {BarreGauche}