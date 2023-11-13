import * as React from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Link } from 'react-router-dom';
import { RxCross1 } from "react-icons/rx";
import { DeletePlaylist } from '../../../actions/Actions';


const ModalLibrary = ({data, setPlaylist = '', type = 'like', responsive}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
   
    return (
      <>
        <GoKebabHorizontal
              style={{cursor: 'pointer'}}  
              fontSize={30}
              onClick={handleOpen}
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
              width: `${responsive <= 500 ? '95%' : '400px'}`,
              bgcolor: "white",
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "row",
              flexWrap: "nowrap",
              borderRadius: "7px",
              border: "none",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div
              style={{
                width: "90%",
                display: "flex",
                border: 'none',
                flexDirection: "column",
                gap: "15px",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <Link to={`/plyst/${data?._id}`}
                className='HoverV2ColorGray'
                style={{
                textDecoration: "none",
                fontSize: "1em",
                fontWeight: "500",
                padding: "3px",
                color: 'blue'
                }}
            >
                voir plus de détails
            </Link>
             {type === 'playlist' ? 
             
             <p className='HoverV2ColorGray'
                onClick={() => {
                    DeletePlaylist(data?._id)
                    .then(response => {
                        setPlaylist(response?.data?.data);
                        handleClose();
                    })
                    .catch(error => console.log(error))
                }} 
                style={{padding: "3px", cursor: 'pointer'}}
                >
                supprimer playlist
            </p> 
            : null
        }
            <p className='HoverV2ColorGray'
                onClick={handleClose} 
                style={{padding: "3px", cursor: 'pointer'}}
                >
                Annuler
            </p>
            </div>
            <div
              onClick={handleClose}
              style={{
                width: "10%",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                cursor: "pointer"
              }}
            >
              <RxCross1 fontSize={30}/>
            </div>
          </Box>
        </Modal>
      </>
    );
}

export {ModalLibrary}