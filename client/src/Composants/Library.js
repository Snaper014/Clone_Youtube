import * as React from "react";
import { ContentSectionMenu } from "./Elements/MenuContent";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useContext } from "../Context/ContextProvider";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { GetLikes, GetLibrary } from "../actions/Actions";
import { CreatePlaylist } from "./Elements/modals/CreatePlaylist";
import { CardBiblio } from "./Elements/CardBiblio";
import { ContainerMobile } from "./Container/ContainerMobile";
import { ContainerDesktop } from "./Container/ContainerDesktop";

function Biblio() {
  // responsive
  // creation playlist
  // page intermediaire
  const [responsive, setResponsive] = React.useState(window.innerWidth);
  const [Likes, setLikes] = React.useState([]);
  const [playlist, setPlaylist] = React.useState([]);
  const navigate = useNavigate();
  const { user } = useContext();
  React.useEffect(() => {
    const CheckResponsive = () => setResponsive(window.innerWidth);
    if (user) {
      GetLikes()
        .then((response) => setLikes(response?.data?.data))
        .catch((error) => console.log(error));
      GetLibrary()
        .then((response) => setPlaylist(response?.data?.data))
        .catch((error) => console.log(error));
    }
    window.addEventListener("resize", CheckResponsive);
    return () => window.removeEventListener("resize", CheckResponsive);
  }, [user]);


  return (
    <>
      {responsive <= 1024 ? (
        <ContainerMobile
          styles={{
            position: "relative",
            height: `${!user ? "100vh" : "auto"}`,
            backgroundColor: `${!user ? "#efeff1" : "white"}`,
            top: `7vh`,
            left: `0px`,
            padding: "3px 0px 120px 0px",
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "flex-start",
            flexWrap: "wrap",
            border: "none",
            color: "black",
            width: "100%",
          }}
        >
          {!user ? (
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
          ) : (
            <section
              style={{
                width: "100%",
                display: "flex",
                flexDirection: `${responsive <= 700 ? "column" : "row"}`,
                justifyContent: `${
                  responsive <= 700 ? "flex-start" : "space-evenly"
                }`,
                alignItems: `${responsive <= 700 ? "center" : "flex-start"}`,
                flexWrap: `${responsive <= 700 ? "nowrap" : "wrap"}`,
                gap: "15px",
              }}
            >
              <CardBiblio
                index={"blue"}
                logo={<AiFillLike color="blue" />}
                data={Likes}
                type="like"
                responsive={responsive}
              />
              <CardBiblio
                index={"red"}
                logo={<AiFillDislike color="red" />}
                data={Likes}
                type="dislike"
                responsive={responsive}
              />

              {!playlist.length ? (
                <div style={{ width: "100%", height: "25px" }}>
                  <CreatePlaylist responsive={responsive} />
                </div>
              ) : (
                <>
                  {playlist.map((data, index) => (
                    <CardBiblio
                      key={index}
                      index={index}
                      data={data}
                      setPlaylist={setPlaylist}
                      type="playlist"
                      responsive={responsive}
                    />
                  ))}
                  <div
                    style={{
                      width: "100%",
                      height: "25px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      flexDirection: "row",
                    }}
                  >
                    <CreatePlaylist responsive={responsive} />
                  </div>
                </>
              )}
            </section>
          )}
        </ContainerMobile>
      ) : (
        <ContainerDesktop
          Styles={{
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
          }}
        >
          {!user ? (
            <ContentSectionMenu
              Logo={<MdOutlineVideoLibrary fontSize={120} />}
              title="Regardez vos vidéos préférées"
              paragraphe={`Connectez-vous pour accéder aux vidéos pour lesquelles vous avez cliqué sur "J'aime" ou que vous avez enregistrées.`}
            />
          ) : (
            <section
              style={{
                width: "100%",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <CardBiblio
                index={"blue"}
                logo={<AiFillLike color="blue" />}
                data={Likes}
                type="like"
                responsive={responsive}
              />
              <CardBiblio
                index={"red"}
                logo={<AiFillDislike color="red" />}
                data={Likes}
                type="dislike"
                responsive={responsive}
              />

              {!playlist.length ? (
                <div style={{ width: "100%", height: "25px" }}>
                  <CreatePlaylist responsive={responsive} />
                </div>
              ) : (
                <>
                  {playlist.map((data, index) => (
                    <CardBiblio
                      key={index}
                      index={index}
                      data={data}
                      setPlaylist={setPlaylist}
                      type="playlist"
                      responsive={responsive}
                    />
                  ))}
                  <div
                    style={{
                      width: "100%",
                      height: "25px",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      flexDirection: "row",
                    }}
                  >
                    <CreatePlaylist responsive={responsive} />
                  </div>
                </>
              )}
            </section>
          )}
        </ContainerDesktop>
      )}
    </>
  );
}

export { Biblio };
