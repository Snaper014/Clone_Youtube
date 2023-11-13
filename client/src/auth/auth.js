import * as React from "react";
import { Link } from "react-router-dom";
import { BsYoutube } from "react-icons/bs";
import { GoogleLogin } from "@react-oauth/google";
import { ConnexionUser } from "../actions/decode";
import { useNavigate } from "react-router-dom";
import { useHref } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { GetSignIn, GetSignUp } from "../actions/Actions";
import { useContext } from "../Context/ContextProvider";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


const Auth = () => {
  const href = useHref();
  const isSignIn = href === "/login" ? true : false;
  const navigate = useNavigate();
  const { setUser } = useContext();
  const [showPassword, setShowPassword] = React.useState({
    first: false,
    second: false,
  });
  const [notification, setNotification] = React.useState({
      username: [false, ''],
      email: [false, ''],
      password: [false, ''],
      confirmpassword: [false, ''],
      existingName: [false, ''],
      existingUser: [false, ''],
      GoogleExistingName: [false, ''],
      GoogleExistingUser: [false, ''],
      LoginUsername: [false, ''],
      loginPassword: [false, '']
  })
  const [widthScreen, setWidthScreen] = React.useState(window.innerWidth);
  const [query, setQuery] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const handleParam = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // console.log("query", query)
  // console.log("mdp", showPassword);
  const handleKeyPress = (e) => {
    if (e.code === "Enter" || e.key === "Enter") {
      formSubmit(e);
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (isSignIn) {
      GetSignIn(query)
        .then((response) => ConnexionUser(response, navigate, setUser))
        .catch((error) => {
          const reason = error?.response?.data?.reason;
          const message = error?.response?.data?.message;
          if(reason === "No existingUser"){
            setNotification(prev => {
              return {...prev, LoginUsername: [true, message]}
            })
          }
          if(reason === "passwordIncorrect"){
            setNotification(prev => {
              return {...prev, loginPassword: [true, message]}
            })
          }
          console.log("error", error);
          console.log("Login failed");
        });

    } else {
      GetSignUp(query)
        .then((response) => ConnexionUser(response, navigate, setUser))
        .catch((error) => {
          const reason = error?.response?.data?.reason;
          const message = error?.response?.data?.message;
          if(reason === "username"){
            setNotification(prev => {
              return {...prev, username: [true, message]}
            })
          }
          if(reason === "email non valide"){
            setNotification(prev => {
              return {...prev, email: [true, message]}
            })
          }
          if(reason === "password"){
            setNotification(prev => {
              return {...prev, password: [true, message]}
            })
          }
          if(reason === "confirmpassword"){
            setNotification(prev => {
              return {...prev, confirmpassword: [true, message]}
            })
          }
          if(reason === "existingName"){
            setNotification(prev => {
              return {...prev, existingName: [true, message]}
            })
          }
          if(reason === "existingUser"){
            setNotification(prev => {
              return {...prev, existingUser: [true, message]}
            })
          }
          console.log("error", error);          
        });
    }
  };

  React.useEffect(() => {
    const Changes = () => setWidthScreen(window.innerWidth);
    window.addEventListener("resize", Changes);
    return () => window.removeEventListener("resize", Changes);
  }, [widthScreen]);


  return (
    <>
      <div
        style={{
          width: "100%",
          height: "10vh",
          position: "fixed",
          display: "flex",
          zIndex: "10",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0px 25px",
        }}
      >
        <Link
          to={"/"}
          style={{
            display: "flex",
            alignItems: "center",
            color: "black",
            textDecoration: "none",
            flexDirection: "row",
            flexWrap: "nowrap",
            fontWeight: "500",
            gap: "5px",
          }}
        >
          <BsYoutube fontSize={30} color="#DE1B1B" />
          {widthScreen <= 315 ? null : <p>Retour à l'Acceuil</p>}
        </Link>
        <Link
          to={`${isSignIn ? "/register" : "/login"}`}
          style={{
            color: "black",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "1.2em",
          }}
        >
          {isSignIn ? "S'inscrire" : "Se connecter"}
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          zIndex: "0",
          top: "11vh",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: `${widthScreen <= 500 ? "100%" : "400px"}`,
            height: "auto",
            border: `${
              widthScreen <= 500 ? "1px solid transparent" : "4px solid black"
            }`,
            borderRadius: `${widthScreen <= 500 ? "0px" : "15px"}`,
            boxShadow: `${widthScreen <= 500 ? "none" : "5px 5px"}`,
            display: "flex",
            marginBottom: "10px",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            padding: "25px",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                width: `${widthScreen <= 500 ? "100%" : "80%"}`,
                height: "50px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h1 style={{ fontSize: "20px", marginBottom: "5px" }}>
                {isSignIn ? "Se connecter" : "S'inscrire"}
              </h1>
              <p style={{ fontWeight: "500" }}>to continue to Youtube-Clone</p>
            </div>
            {widthScreen <= 500 ? null : (
              <div
                style={{
                  width: "20%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BsYoutube fontSize={40} color="#DE1B1B" />
              </div>
            )}
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "25px",
            }}
          >
            <button
              className="zoom"
              style={{
                width: "45px",
                backgroundColor: "white",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                borderRadius: "10px",
                marginBottom: `${widthScreen <= 500 ? "25px" : "0px"}`,
                boxShadow: "3px 3px",
              }}
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                  const decoded = jwtDecode(credentialResponse.credential);
                  console.log("jwt", decoded);
                  const { name, email, sub, picture } = decoded;
                  const SignUp = {
                    username: name,
                    email: email,
                    password: sub,
                    image: picture,
                    AuthByGoogle: true
                  }
                  console.log("SignUp", SignUp);
                  const SignIn = {
                    username: email,
                    password: sub
                  };
                  if(isSignIn){
                    GetSignIn(SignIn)
                      .then((response) => ConnexionUser(response, navigate, setUser))
                      .catch((error => console.log(error)))
                  }else{
                       GetSignUp(SignUp)
                       .then((response) => ConnexionUser(response, navigate, setUser))
                       .catch((error => {
                            const reason = error?.response?.data?.reason;
                            const message = error?.response?.data?.message;
                          if(reason === "ExistingName"){
                            setNotification(prev => {
                              return {...prev, GoogleExistingName: [true, message]}
                            })
                          }
                          if(reason === "ExistingUser"){
                            setNotification(prev => {
                              return {...prev, GoogleExistingUser: [true, message]}
                            })
                          }
                          console.log("error", error);
                          console.log("Login Failed");
                      }))
                  }
                }}
                onError={(error) => {
                  console.log("error", error);
                  console.log("Login Failed");
                }}
                type="icon"
                logo_alignment="center"
                size="large"
                text="signin_with"
                shape="square"
              />
            </button>
          </div>
          {notification?.GoogleExistingName?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification?.GoogleExistingName?.at(1)}
                  </span> 
              : null}
              {notification?.GoogleExistingUser?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification?.GoogleExistingUser?.at(1)}
                  </span> 
              : null}
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: "143px",
                height: "1px",
                backgroundColor: "black",
                marginBottom: "6px",
              }}
            ></div>
            <p style={{ fontWeight: "500" }}>ou</p>
            <div
              style={{
                width: "143px",
                height: "1px",
                backgroundColor: "black",
                marginBottom: "6px",
              }}
            ></div>
          </div>
          {isSignIn ? (
            <form
              onSubmit={formSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <label
                htmlFor="username"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                Le nom d'utilisateur ou adresse email :
              </label>
              <input
                id="username"
                name="username"
                required
                type="text"
                value={query.username}
                onChange={(e) => {
                  handleParam(e)
                  setNotification(prev => {
                    return {...prev, LoginUsername: [false, '']}
                  })
                }}
                aria-label="username"
                className="zoom"
                style={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  paddingLeft: "5px",
                  marginBottom: "6px",
                }}
              />
              {notification?.LoginUsername?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification?.LoginUsername?.at(1)}
                  </span> 
              : null}
              <label
                htmlFor="password"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                mot de passe :
              </label>
              <div
                className="zoom"
                onKeyDown={handleKeyPress}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "40px",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  marginBottom: "16px",
                }}
              >
                <input
                  id="password"
                  name="password"
                  required
                  value={query.password}
                  aria-label="password"
                  onChange={(e) => {
                    handleParam(e)
                    setNotification(prev => {
                      return {...prev, loginPassword: [false, '']}
                    })
                  }}
                  style={{
                    width: "90%",
                    height: "40px",
                    fontSize: "16px",
                    borderRight: "none",
                    borderRadius: "0.375rem 0rem 0rem 0.375rem",
                    fontWeight: "500",
                    paddingLeft: "5px",
                  }}
                  type={showPassword.first ? "text" : "password"}
                />
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => {
                      return { first: !prev.first, second: prev.second };
                    });
                  }}
                  style={{
                    width: "10%",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderWidth: "2px 2px 1.6px 0px",
                    borderStyle: "solid",
                    borderColor: "black black black transparent",
                    height: "40px",
                    display: "flex",
                    borderRadius: "0rem 0.375rem 0.375rem 0rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword.first ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </i>
              </div>
              {notification?.loginPassword?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification?.loginPassword?.at(1)}
                  </span> 
              : null}
              <input
                className="btn-submit-form zoom"
                type="submit"
                value="Se connecter"
              ></input>
            </form>
          ) : (
            <form
              onSubmit={formSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}
            >
              <label
                htmlFor="username"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                nom d'utilisateur :
              </label>
              <input
                id="username"
                name="username"
                required
                type="text"
                value={query.username}
                onChange={(e) => {
                  handleParam(e)
                  setNotification(prev => {
                    return {...prev, username: [false, '']}
                  })
                  setNotification(prev => {
                    return {...prev, existingName: [false, '']}
                  })
                }}
                aria-label="username"
                className="zoom"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "500",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  paddingLeft: "5px",
                  marginBottom: "16px",
                }}
              />
              {notification.username?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.username?.at(1)}
                  </span> 
              : null}
              {notification.existingName?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.existingName?.at(1)}
                  </span> 
              : null}
              <label
                htmlFor="username"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                Adresse email :
              </label>
              <input
                id="email"
                name="email"
                required
                value={query.email}
                onChange={(e) => {
                  handleParam(e)
                  setNotification(prev => {
                    return {...prev, email: [false, '']}
                  })
                  setNotification(prev => {
                    return {...prev, existingUser: [false, '']}
                  })
                }}
                type="text"
                aria-label="email"
                className="zoom"
                style={{
                  width: "100%",
                  height: "40px",
                  fontSize: "16px",
                  fontWeight: "500",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  paddingLeft: "5px",
                  marginBottom: "16px",
                }}
              />
              {notification.email?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.email?.at(1)}
                  </span> 
              : null}
              {notification.existingUser?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.existingUser?.at(1)}
                  </span> 
              : null}
              <label
                htmlFor="password"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                mot de passe :
              </label>
              <div
                className="zoom"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "40px",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  marginBottom: "16px",
                }}
              >
                <input
                  id="password"
                  name="password"
                  required
                  value={query.password}
                  aria-label="password"
                  onChange={(e) => {
                    handleParam(e)
                    setNotification(prev => {
                      return {...prev, password: [false, '']}
                    })
                  }}
                  style={{
                    width: "90%",
                    height: "40px",
                    fontSize: "16px",
                    borderRight: "none",
                    borderRadius: "0.375rem 0rem 0rem 0.375rem",
                    fontWeight: "500",
                    paddingLeft: "5px",
                  }}
                  type={showPassword.first ? "text" : "password"}
                />
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => {
                      return { first: !prev.first, second: prev.second };
                    });
                  }}
                  style={{
                    width: "10%",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderWidth: "2px 2px 1.6px 0px",
                    borderStyle: "solid",
                    borderColor: "black black black transparent",
                    height: "40px",
                    display: "flex",
                    borderRadius: "0rem 0.375rem 0.375rem 0rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword.first ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </i>
              </div>
              {notification.password?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.password?.at(1)}
                  </span> 
              : null}
              <label
                htmlFor="confirmpassword"
                style={{ marginBottom: "5px", fontWeight: "500" }}
              >
                confirmer le mot de passe :
              </label>
              <div
                className="zoom"
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  height: "40px",
                  borderRadius: "0.375rem",
                  boxShadow: "rgb(0, 0, 0) 3px 3px 0px",
                  marginBottom: "16px",
                }}
              >
                <input
                  id="confirmpassword"
                  name="confirmpassword"
                  required
                  onKeyDown={handleKeyPress}
                  value={query.confirmpassword}
                  aria-label="confirmpassword"
                  onChange={(e) => {
                    handleParam(e)
                    setNotification(prev => {
                      return {...prev, confirmpassword: [false, '']}
                    })
                  }}
                  style={{
                    width: "90%",
                    height: "40px",
                    fontSize: "16px",
                    borderRight: "none",
                    borderRadius: "0.375rem 0rem 0rem 0.375rem",
                    fontWeight: "500",
                    paddingLeft: "5px",
                  }}
                  type={showPassword.second ? "text" : "password"}
                />
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword((prev) => {
                      return { first: prev.first, second: !prev.second };
                    });
                  }}
                  style={{
                    width: "10%",
                    cursor: "pointer",
                    backgroundColor: "white",
                    borderWidth: "2px 2px 1.6px 0px",
                    borderStyle: "solid",
                    borderColor: "black black black transparent",
                    height: "40px",
                    display: "flex",
                    borderRadius: "0rem 0.375rem 0.375rem 0rem",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword.second ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </i>
              </div>
              {notification.confirmpassword?.at(0) ? 
                  <span style={{
                      marginBottom: "16px",
                      fontSize: "0.8em", 
                      fontWeight: "500", 
                      color: "#DE1B1B"
                    }}>
                      {notification.confirmpassword?.at(1)}
                  </span> 
              : null}
              <input
                type="submit"
                name="submit"
                aria-label="submit form"
                className="btn-submit-form zoom"
                value="S'inscrire"
              ></input>
            </form>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "6px",
              marginTop: "17px",
              fontSize: "13px",
              fontWeight: "500",
            }}
          >
            <p>
              {isSignIn
                ? "Pas encore de compte ?"
                : "Vous avez déjà un compte ?"}
            </p>
            <Link
              to={`${isSignIn ? "/register" : "/login"}`}
              style={{ color: "#DE1B1B" }}
            >
              {isSignIn ? "S'inscrire" : "Se connecter"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export { Auth };
