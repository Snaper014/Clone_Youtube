import * as React from 'react';
import '../App.css';
import King from './CComTendances';
import { BarreGauche } from './Menustatic';
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from '../Composants/FallbackError';
import BarSearch from './AppBar';



 function Trend(){
    return (
        <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <BarSearch />
        <div className="GridP">
            <div><BarreGauche /></div>
            <div className="ConteneurTendances">
                     <div className="DivtitreTrend">
                        <div className="divTendances">
                        <img  style={{height: '100%', width: '75%', borderRadius: '50%'}} alt="trend" src="https://www.youtube.com/img/trending/avatar/trending.png"></img>
                        </div>
                        <div className="divTendances"><p>Tendances</p></div>
                    </div>
                    <King />
            </div>  
        </div>
    </ErrorBoundary> 
</> 
    )
}

export {Trend}