import * as React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ContainerDesktop } from './Container/ContainerDesktop';
import { ContainerMobile } from './Container/ContainerMobile';
import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { BiUserCircle } from "react-icons/bi";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { ModalDescription } from './Elements/modals/ModalDescription';
import { ContentSectionMenu } from './Elements/MenuContent';
import { useContext } from '../Context/ContextProvider';
import { GetLibrary, DeleteVideoPlaylist } from '../actions/Actions';
import { ConvertlengthSeconds } from '../utils/utils';
import { RxCross1 } from 'react-icons/rx';
import { BsFillPlayFill } from 'react-icons/bs';
import {FaRandom} from 'react-icons/fa';


export const DetailsPlaylist = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const {user} = useContext();
    const [open, setOpen] = React.useState({
        description: false,
        notitication: false
    });
    const [responsive, setResponsive] = React.useState(window.innerWidth);
    const [randomNumber, setRandomNumber] = React.useState(0);
    const handleClose = () => setOpen(false);
    const [Playlist, setPlaylist] = React.useState([]);
    

    React.useEffect(() => {
      const CheckResponsive = () => setResponsive(window.innerWidth);
        if(user){
            GetLibrary(`?limit=${id}`)
            .then(response => {
                setPlaylist(response?.data?.data?.at(0))
                setRandomNumber(Math.floor(Math.random() * response?.data?.data?.at(0)?.data?.length))
            })
            .catch(error => console.log(error))
        }
        window.addEventListener("resize", CheckResponsive);
      return () => window.removeEventListener("resize", CheckResponsive);
    }, [user, id])

    console.log("src", Playlist);

    return (
      <>
        {responsive <= 1024 ?  
          <ContainerMobile styles={{
            position: "relative",
            height: `${user ? `${!Playlist?.data?.length  ? '90vh' : 'auto'}` : '90vh'}`,
            backgroundColor: "#efeff1",
            top: `7vh`,
            left: `0px`,
            padding: `${user ? '3px 0px 35px 0px' : '3px 0px 0px 0px'}`,
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            border: "none",
            color: "black",
            width: "100%",
          }}>
           {!user ?
            <>
            <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: "2%",
            }}
          >
            <BiUserCircle fontSize={35} />
            <p style={{ marginLeft: "5px" }}>Connexion</p>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              height: "60vh",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MdOutlineVideoLibrary
              style={{ marginBottom: "5%" }}
              fontSize={200}
            />
            <h2 style={{ marginBottom: "2%" }}>Vous n'êtes pas connecté</h2>
            <p style={{ marginBottom: "3%", textAlign: "center" }}>
              Connectez-vous maintenant pour mettre en ligne et enregistrer
              des vidéos, et publier des commentaires
            </p>
            <button
              onClick={() => navigate("/login")}
              style={{
                width: "25%",
                color: "white",
                border: "none",
                padding: "10px",
                backgroundColor: "#065fd4",
                borderRadius: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>Connexion</p>
            </button>
          </div>
          </> 
           : 
           <>
           <div 
              className='BackGround'
              style={{
              width: "100%",
              padding: "6px",
              color: 'white',
              gap: "10px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              borderRadius: "7px",
              border: "none",
              }}>
                  <img 
                        alt={Playlist?.titlePlaylist}
                        width="50%"
                         src={Playlist?.data?.at(0)?.thumbnail} 
                        height="175px" 
                        style={{borderRadius: "6px"}}
                    >
                    </img>
                    <h2>{Playlist?.titlePlaylist}</h2>
                    <h3>{user?.username}</h3>
                    <p>{Playlist?.data?.length} vidéos</p>
                    <p 
                       onClick={() => {
                        setOpen(prev => {
                        return {...prev, description: true}
                       })}} 
                       style={{marginBottom: "15px", cursor: 'pointer'}}>
                        Afficher la description compléte
                    </p>
                    <ModalDescription 
                        responsive={responsive}
                        open={open.description} 
                        handleClose={handleClose} 
                        description={Playlist?.description} 
                    />
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: `${responsive <= 450 ? 'column' : 'row'}`,
                        flexWrap: `${responsive <= 450 ? 'wrap' : 'nowrap'}`,
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                    <Link
                        to={`/Playlist/${Playlist?.data?.at(0)?.idVideo}/0/${id}?type=library`}
                        style={{
                            textDecoration: "none",
                            backgroundColor: "white",
                            width: `${responsive <= 450 ? '150px' : '30%'}`,
                            borderRadius: "40px",
                            color: "black",
                            padding: "8px",
                            fontWeight: "500",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                      <BsFillPlayFill /> Tout Lire  
                    </Link>
                    <Link
                        to={`/Playlist/${Playlist?.data?.at(randomNumber)?.idVideo}/${randomNumber}/${id}?type=library`}
                        style={{
                            textDecoration: "none",
                            backgroundColor: "transparent",
                            width: `${responsive <= 450 ? '150px' : '30%'}`,
                            borderRadius: "40px",
                            color: "white",
                            padding: "8px",
                            fontWeight: "500",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                      <FaRandom /> Aléatoire 
                    </Link>    
                    </div>  
            </div>
            <div style={{
              width: '100%',
              marginTop: "3%",
              border: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
         }}>
             {!Playlist?.data?.length ? <p>Aucunes vidéos veuillez en ajoutez.</p> :
                 Playlist?.data?.map((element, index) => (
                 <div key={index} style={{
                  display: 'flex',
                  flexDirection: `${responsive <= 500 ? 'column' : 'row'}`,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  border: '1px solid transparent',
                  width: '100%',
                  height: `${responsive <= 500 ? 'auto' : '175px'}`,
                  marginBottom: '2%',
                  boxSizing: 'border-box',
              }}>
                 <div style={{
                  height: "100%",
                  width: `${responsive <= 500 ? '100%' : '30%'}`, 
                  display:"flex",
                  flexDirection: 'row',
                  flexWrap: 'nowrap', 
                  alignItems: "flex-start",
                }}
                 >
                    
                     <RxCross1 
                         style={{
                          cursor: 'pointer',
                          height: '100%',
                          width: '10%'
                        }}     
                         onClick={() => {
                             if(user){
                                DeleteVideoPlaylist({idPlaylist: Playlist?._id, 
                                 idVideo: element?._id})
                                .then(response => setPlaylist(response?.data?.data))
                                .catch(error => console.log(error))
                                setOpen(prev => {
                                   return {...prev, notitication: true}
                                })    
                                 
                             }else return null;
                         }}
                         fontSize={30}
                     />
                     <Snackbar
                       open={open.notitication}
                       anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                       autoHideDuration={3000}
                       onClose={handleClose}
                     >
                       <Alert
                         onClose={handleClose}
                         severity="success"
                         sx={{ width: "100%" }}
                       >
                         Vous avez suprimmé la vidéo avec <strong>succès!</strong>
                       </Alert>
                     </Snackbar>
                 <Link
                   to={`/watch/${element?.idVideo}`}
                   style={{ 
                    textDecoration: "none", 
                    color: "black", 
                    width: `${responsive <= 500 ? '90%' : '90%'}` 
                  }}
                 >
                   <div style={{ 
                        marginLeft: `${responsive <= 500 ? '0px' : "2%"}`, 
                        position: "relative", 
                        width: "100%" 
                      }}>
                     <img
                       alt={element?.title}
                       src={element?.thumbnail}
                       height="175px"
                       width={"100%"}
                       style={{ borderRadius: "10px" }}
                     ></img>
                     <div
                       className={`${
                         element?.lengthSeconds === "EN DIRECT"
                           ? "IndicatorLive"
                           : "IndicatorView"
                       }`}
                     >
                       <p style={{ margin: "0.3em", fontWeight: "600" }}>
                         {ConvertlengthSeconds(element?.lengthSeconds)}
                       </p>
                     </div>
                   </div>
                 </Link>
                 </div>
                 <div style={{
                   display: 'flex',
                   alignItems: 'flex-start',
                   paddingLeft: '2%',
                   justifyContent: 'flex-start',
                   flexDirection: 'column',
                   flexWrap: 'nowrap',
                   height: '100%',
                   width: `${responsive <= 500 ? '100%' : '60%'}`,                
                }}>
                   <Link
                     to={`/watch/${element?.idVideo}`}
                     style={{
                       textDecoration: "none",
                       color: "black",
                       width: "100%",
                     }}
                   >
                     <p
                       style={{
                         fontSize: "18px",
                         width: "100%",
                         fontWeight: "550",
                         cursor: "pointer",
                       }}
                     >
                       {element?.title}
                     </p>
                   </Link>
                   <div style={{
                     display: 'flex',
                     alignItems: 'center',
                     marginBottom: '2vh',
                     marginTop: '3px',
                     flexDirection: 'row',
                     paddingRight: '2px',
                     paddingLeft: '2px',
                     flexWrap: 'nowrap',
                     width: '100%',
                     fontSize: '16px',  
                   }}>
                     <Link
                       to={`/Channel/${element?.channelId}`}
                       style={{
                         MarginLeft: "5px",
                         marginRight: "5px",
                         textDecoration: "none",
                         color: "black",
                       }}
                     >
                       {element?.channelTitle}
                     </Link>
                     <div
                       style={{
                         width: "4px",
                         height: "4px",
                         borderRadius: "50%",
                         backgroundColor: "black",
                         MarginLeft: "5px",
                         marginRight: "5px",
                       }}
                     ></div>
                     <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                       {element?.viewCount} vues
                     </p>
                   </div>
                 </div>
               </div>
             ))}
         </div>
         </> 

          }   
          </ContainerMobile>
        : 
        <ContainerDesktop Styles={{
            position: "relative",
            width: "90%",
            display: "flex",
            top: "11vh",
            left: "9.8vw",
            padding: `${user ? "20px 0px" : "0px"}`,
            flexDirection: `${user ? "row" : "column"}`,
            flexWrap: `${user ? "wrap" : "auto"}`,
            justifyContent: `${user ? "flex-start" : "center"}`,
            alignItems: `${user ? "flex-start" : "center"}`,
            height: `${user ? "auto" : "80vh"}`,
            border: "2px solid Transparent",
        }}>
          {!user ? 
            <ContentSectionMenu
            Logo={<MdOutlineVideoLibrary fontSize={120} />}
            title="Regardez vos vidéos préférées"
            paragraphe={`Connectez-vous pour accéder aux vidéos pour lesquelles vous avez cliqué sur "J'aime" ou que vous avez enregistrées.`}
          />
            :
           <div style={{
                height: "82vh",
                width: "100%",
                border: "none",
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",

           }}>
                <div style={{
                     width: '30%',
                     border: "none",
                     display: "flex",
                     alignItems: "flex-start",
                     justifyContent: "center"   
                }}>
                   <div 
                        className='BackGround'
                        style={{
                        height: "90%",
                        width: "90%",
                        padding: "6px",
                        color: 'white',
                        gap: "10px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        borderRadius: "7px",
                        border: "none",
                   }}>
                    <img 
                        alt={Playlist?.titlePlaylist}
                        width="90%"
                        src={Playlist?.data?.at(0)?.thumbnail} 
                        height="175px" 
                        style={{borderRadius: "6px"}}
                    >
                    </img>
                    <h2>{Playlist?.titlePlaylist}</h2>
                    <h3>{user?.username}</h3>
                    <p>{Playlist?.data?.length} vidéos</p>
                    <p 
                       onClick={() => {
                        setOpen(prev => {
                        return {...prev, description: true}
                       })}} 
                       style={{marginBottom: "15px", cursor: 'pointer'}}>
                        Afficher la description compléte
                    </p>
                    <ModalDescription 
                        open={open.description} 
                        handleClose={handleClose} 
                        responsive={responsive}
                        description={Playlist?.description} 
                    />
                    <div style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "nowrap",
                        alignItems: "center",
                        justifyContent: "space-evenly"
                    }}>
                    <Link
                        to={`/Playlist/${Playlist?.data?.at(0)?.idVideo}/0/${id}?type=library`}
                        style={{
                            textDecoration: "none",
                            height: "30px",
                            backgroundColor: "white",
                            width: "40%",
                            borderRadius: "40px",
                            color: "black",
                            fontWeight: "500",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                      <BsFillPlayFill /> Tout Lire  
                    </Link>
                    <Link
                        to={`/Playlist/${Playlist?.data?.at(randomNumber)?.idVideo}/${randomNumber}/${id}?type=library`}
                        style={{
                            textDecoration: "none",
                            height: "30px",
                            backgroundColor: "transparent",
                            width: "40%",
                            borderRadius: "40px",
                            color: "white",
                            fontWeight: "500",
                            display: "flex",
                            flexDirection: "row",
                            flexWrap: "nowrap",
                            alignItems: "center",
                            justifyContent: "space-evenly",
                        }}
                    >
                      <FaRandom /> Aléatoire 
                    </Link>    
                    </div>
                   </div> 

                </div>
                <div style={{
                     width: '70%',
                     border: "none",
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     overflowY: "scroll",   
                }}>
                    {!Playlist?.data?.length ? <p>Aucunes vidéos veuillez en ajoutez.</p> :
                        Playlist?.data?.map((element, index) => (
                        <div key={index} className="GridTrend">
                        <div style={{height: "100%", display:"flex", alignItems: "flex-start"}}
                        >
                            <RxCross1 
                                style={{cursor: 'pointer'}}     
                                onClick={() => {
                                    if(user){
                                       DeleteVideoPlaylist({idPlaylist: Playlist?._id, 
                                        idVideo: element?._id})
                                       .then(response => setPlaylist(response?.data?.data))
                                       .catch(error => console.log(error))
                                       setOpen(prev => {
                                          return {...prev, notitication: true}
                                       })    
                                        
                                    }else return null;
                                }}
                                fontSize={30}
                            />
                            <Snackbar
                              open={open.notitication}
                              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                              autoHideDuration={3000}
                              onClose={handleClose}
                            >
                              <Alert
                                onClose={handleClose}
                                severity="success"
                                sx={{ width: "100%" }}
                              >
                                Vous avez suprimmé la vidéo avec <strong>succès!</strong>
                              </Alert>
                            </Snackbar>
                        </div>
                        <Link
                          to={`/watch/${element?.idVideo}`}
                          style={{ textDecoration: "none", color: "black" }}
                        >
                          <div style={{ marginLeft: "2%", position: "relative" }}>
                            <img
                              alt={element?.title}
                              src={element?.thumbnail}
                              height="175px"
                              width={"300px"}
                              style={{ borderRadius: "10px" }}
                            ></img>
                            <div
                              className={`${
                                element?.lengthSeconds === "EN DIRECT"
                                  ? "IndicatorLive"
                                  : "IndicatorView"
                              }`}
                            >
                              <p style={{ margin: "0.3em", fontWeight: "600" }}>
                                {ConvertlengthSeconds(element?.lengthSeconds)}
                              </p>
                            </div>
                          </div>
                        </Link>
                        <div className="BoxeTends">
                          <Link
                            to={`/watch/${element?.idVideo}`}
                            style={{
                              textDecoration: "none",
                              color: "black",
                              width: "100%",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "18px",
                                width: "100%",
                                fontWeight: "550",
                                cursor: "pointer",
                              }}
                            >
                              {element?.title}
                            </p>
                          </Link>
                          <div className="ContenuNumero5">
                            <Link
                              to={`/Channel/${element?.channelId}`}
                              style={{
                                MarginLeft: "5px",
                                marginRight: "5px",
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              {element?.channelTitle}
                            </Link>
                            <div
                              style={{
                                width: "2px",
                                height: "2px",
                                borderRadius: "50%",
                                backgroundColor: "black",
                                MarginLeft: "5px",
                                marginRight: "5px",
                              }}
                            ></div>
                            <p style={{ MarginLeft: "5px", marginRight: "5px" }}>
                              {element?.viewCount} vues
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
           </div> 
        }
        </ContainerDesktop>}
      </>  

    )

}