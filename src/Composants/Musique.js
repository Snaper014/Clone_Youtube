import * as React from 'react';
import '../App.css';
import Queen from './CComMusique';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import BarSearch from './AppBar';



 function Zik(){
    return (
        <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div className="GridP">
            <div><BarreGauche /></div>
            <div className="ConteneurTendances">
                     <div className="DivtitreTrend">
                        <div className="divTendances">
                        <img  style={{height: '100%', width: '75%', borderRadius: '50%'}} alt="trend" src="image-music.jpg"></img>
                        </div>
                        <div className="divTendances"><p>Musique</p></div>
                    </div>
                    <Queen />
            </div>  
        </div>
    </ErrorBoundary> 
</> 
    )
}

export {Zik}