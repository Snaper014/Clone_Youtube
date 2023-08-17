import * as React from "react";
import "../../App.css";
import { SectionChannel } from "./Container/SectionData";
import {IoIosArrowDown} from "react-icons/io";

export function ButtonAndContainer() {
    const [select, setSelect] = React.useState("Accueil");
     return(
    <>
        <div className="SelecBTN">
            {SectionChannel.map((element, index) => (
                <button key={index}
                style={{cursor: "pointer"}}
                onClick={() => setSelect(element?.button)}
                className={select === element?.button ? "activer" : "normal"}
                >
                  {element?.button.toLocaleUpperCase()}  
                </button>  
            ))}
        </div>
      {SectionChannel.map((element, index) => (
            <React.Fragment key={index}>
                {select === element?.button ? element?.contenu : null}
            </React.Fragment>
      ))}   
    </>     
     )   
}

export const MobileButtonAndContainer = () => { 
    const [select, setSelect] = React.useState("Accueil");
    const [DisplaySection, setDisplaySection] = React.useState(false);
    
    return (
        <>
            <div className="SelecBTN">
            {SectionChannel.map((element, index) => {
                if(index < 3){
                  return(
                    <button key={index}
                    onClick={() => setSelect(element?.button)}
                    className={select === element?.button ? "mobileActive" : "mobileNormal"}
                    >
                    {element?.button.toLocaleUpperCase()}  
                    </button>  
                    )
                }
               return null; 
            })}
            <button style={{
                width: "5%", 
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }} 
                onClick={() => setDisplaySection(!DisplaySection)}
                >
                <IoIosArrowDown fontSize={28}/>
            </button>
        </div>
            {DisplaySection ? 
                <>
                   <div onClick={() => setDisplaySection(!DisplaySection)}
                        style={{
                        position: "fixed",
                        zIndex: "10",
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                   }}>
                        <div style={{
                            width: "256px",
                            height: "266px",
                            backgroundColor: "white",
                            borderRadius: "10px",
                        }}>
                       <ul style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-around",
                            textDecoration: "none",
                            listStyle: "none",
                       }}>
                        {SectionChannel.map((items, i) => {
                            if(i > 2){
                                return(
                                  <li key={i} 
                                  onClick={() => setSelect(items?.button)}
                                  style={{
                                    width: "100%", 
                                    marginLeft: "5%",
                                    fontSize: "1.8em",
                                    cursor: "pointer",
                                    }}>
                                    {items?.button}
                                  </li>  
                                )
                            }
                           return null; 
                        })}
                        <li style={{
                            width: "100%", 
                            marginLeft: "5%", 
                            fontSize: "1.8em",
                            cursor: "pointer",
                        }} 
                        onClick={() => setDisplaySection(!DisplaySection)}>
                            Annuler
                        </li>
                       </ul>
                       </div>
                    </div> 
                <div className="OmberDiv"></div>   
                </> 
            : null}
          {SectionChannel.map((element, index) => (
            <div style={{width: "100%"}} key={index}>
                {select === element?.button ? element?.contenu : null}
            </div>
            ))}  
        </>
    )
}