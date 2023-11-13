import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { RxCross1 } from "react-icons/rx";
import { APICreatePlaylist } from "../../../actions/Actions";

const CreatePlaylist = ({responsive}) => {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState({
    titlePlaylist: "",
    description: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleParam = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const formSubmit = () => {
    APICreatePlaylist(query);
  };

  return (
    <div>
      <Button sx={{ color: "black", fontSize: "25px", fontWeight: "500" }} onClick={handleOpen}>
        Créer Playlist
      </Button>
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
            width: `${responsive <= 500 ? '90%' : 400}`,
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
          <form
            onSubmit={formSubmit}
            style={{
              width: "90%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <label
              htmlFor="titlePlaylist"
              style={{ marginBottom: "5px", fontWeight: "500" }}
            >
              Titre de la playlist :
            </label>
            <input
              id="titlePlaylist"
              name="titlePlaylist"
              required
              type="text"
              value={query.username}
              onChange={(e) => handleParam(e)}
              aria-label="titlePlaylist"
              style={{
                width: "80%",
                height: "40px",
                fontSize: "1em",
                borderRadius: "0.375rem",
                paddingLeft: "5px",
                marginBottom: "6px",
              }}
            />
            <label
              htmlFor="description"
              style={{ marginBottom: "5px", fontWeight: "500" }}
            >
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              type="text"
              maxLength="400"
              value={query.username}
              onChange={(e) => handleParam(e)}
              aria-label="description"
              style={{
                width: "80%",
                height: "80px",
                fontSize: "1em",
                borderRadius: "0.375rem",
                paddingTop: "5px",
                paddingLeft: "4px",
                marginBottom: "10px",
              }}
            />
            <input
              style={{ width: "50%" }}
              type="submit"
              name="submit"
              aria-label="submit form"
              className="btn-submit-form zoom"
              value="Créer"
            />
          </form>
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
    </div>
  );
};

export { CreatePlaylist };
