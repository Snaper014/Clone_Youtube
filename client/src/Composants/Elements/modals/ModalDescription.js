import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RxCross1 } from "react-icons/rx";

export const ModalDescription = ({open, handleClose, description, responsive}) => {

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
            width: `${responsive <= 500 ? '95%' : '400px'}`,
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
        overflowY: 'scroll',
        gap: "10px",
        alignItems: "center",
        justifyContent: "flex-start",
        }}
    >
        <p>{description}</p>
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
