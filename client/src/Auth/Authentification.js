import * as React from 'react';
import { SignUp, SignIn} from '@clerk/clerk-react';
import { BsYoutube } from 'react-icons/bs';
import { Link, useHref } from 'react-router-dom';
import { GetLogin } from '../redux/History';



function Auth(){
    const href = useHref();
    const isLogin = href === '/login' ? true : false;
    const route = isLogin ? "/register" : "/login";

    return (
        <>
            <nav style={{
                width: '100%',
                height: '7vh',
                zIndex: '10',
                position: 'fixed',
                display: "flex",
                alignItems: "center",
                padding: "0px 8px 0px 8px",
                justifyContent: "space-between",
                top: '0px',
                marginBottom: "10px",
                backgroundColor: 'white',
            }}>
                <Link to={"/"}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "5px",
                        textDecoration: "none",
                        color: "black",
                    }}
                >
                    <BsYoutube
                    fontSize={35}
                    style={{ color: "#DE1B1B", marginRight: "4px" }}
                />
                  <p style={{fontSize: '1.2em', fontWeight: '600'}}>Retour à L'Acceuil</p>  
                </Link>
               <Link to={route}
                    style={{
                        textDecoration: "none",
                        color: "black",
                        fontSize: '1.2em',
                        fontWeight: '600'
                    }}
               >
                    {isLogin ? 'S\'inscrire' : 'Se Connecter'}
               </Link> 
            </nav>
            <section style={{
                width: '100%',
                position: 'relative',
                zIndex: "1",
                top: '7vh',
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
               {isLogin ? 
                  <SignIn 
                        routing="path" 
                        redirectUrl={"/"} 
                        path="/login" 
                        />  
               :
                <SignUp 
                        routing="path" 
                        redirectUrl={"/"} 
                        path="/register" 
                        />
               } 

            </section>
        </>
    )
}

export {Auth};