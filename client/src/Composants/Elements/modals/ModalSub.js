import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";

const ModalSub = ({open, handleClose, responsive = 1440}) => {

  return (
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
            width: `${responsive <= 600 ? '98%' : 400}`,
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
        <h4>Voulez-vous vous abonner à cette chaîne ?</h4>
        <p>Connectez-vous pour vous abonner à cette chaîne</p>
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
        </Box>
      </Modal>
  );
};

export { ModalSub };
