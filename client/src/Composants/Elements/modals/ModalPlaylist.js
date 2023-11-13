import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { MdPlaylistAdd } from "react-icons/md";
import { AddVideosPlaylist } from "../../../actions/Actions";
import { AddInfosLikes } from "../../../utils/utils";
import { GetLibrary } from "../../../actions/Actions";
import Snackbar from "@mui/material/Snackbar";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ModalPlaylist = ({ dataYTB, user, id , isLibrary = false, responsive = 1440}) => {
  const [open, setOpen] = React.useState(false);
  const [Notification, setNotification] = React.useState(false);
  const [listPlaylist, setListPlaylist] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleNotifClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setNotification(false);
  };


const handleCheck = (e) => {
    const value = e.target.checked;
    const name = e.target.name;

    if(value){
        AddVideosPlaylist(name, AddInfosLikes(dataYTB, id, '', isLibrary));
        setNotification(true);
    }else return null;
}

  React.useEffect(() => {
    if (user) {
      GetLibrary()
        .then((response) => {
          const result = response?.data?.data;
          const NewData = result.map((items) => items?.titlePlaylist);
          setListPlaylist(NewData);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  return (
    <div>
      <MdPlaylistAdd
        fontSize={30}
        onClick={handleOpen}
        style={{cursor: "pointer" }}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: `${responsive <= 600 ? '100%' : "400px"}`,
            bgcolor: "white",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "row",
            flexWrap: "nowrap",
            borderRadius: "7px",
            border: "none",
            boxShadow: 24,
            p: 3,
          }}
        >
          <Snackbar
              open={Notification}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              autoHideDuration={3000}
              message={<>Vous avez ajouté la vidéo dans la playlist <strong>succès!</strong></>}
              onClose={handleNotifClose}
            ></Snackbar>
          <div
            style={{
              height: "200px",
              width: "100%",
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              alignItems: "flex-start",
            }}
          >
            {!user ?   
              <div
              style={{
                height: "200px",
                width: "90%",
                border: "none",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
               <h4>Regarder à nouveau cette vidéo plus tard ?</h4>
               <p>Connectez-vous pour ajouter la vidéo à une playlist.</p>
               <Link to={"/login"}
                    style={{
                        textDecoration: "none",
                        color: "#065fd4",
                        fontWeight: "500",
                        fontSize: "1em"
                    }}
               >
                  Se connecter
               </Link>
            </div>
            :
            <div
              style={{
                height: "200px",
                width: "90%",
                border: "none",
                display: "flex",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  display: "flex",
                  overflowY: "scroll",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {!listPlaylist?.length ? 
                  <p>Créer une playlist pour ajouter la vidéo.</p> 
                  : 
                    listPlaylist.map((element, index) => (
                  <div 
                      key={index}
                      style={{
                       width: "100%",
                       height: "25px",
                       display: "flex",
                       alignItems: "flex-start",
                       flexDirection: "row",
                       fontSize: "1.2em",
                       fontWeight: "500",
                       marginBottom: "10px",
                       flexWrap: "nowrap" 
                  }}>
                    <label style={{width: "80%"}}>
                        {element?.length >= 40 ? 
                            element.length.substring(0, 37) + "..." 
                        : element}
                    </label>
                    <input 
                      style={{width: "20%", height: "100%"}}
                      key={index}
                      type="checkbox"
                      name={element}
                      onChange={handleCheck}
                  />
                  </div>  
                ))}
              </div>
            </div>}
            <div
              onClick={handleClose}
              style={{
                width: "10%",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <RxCross1 fontSize={30}/>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export { ModalPlaylist };
