//import { GetSignIn, GetSignUp } from "./Actions";
import { jwtDecode } from "jwt-decode";

const createOrGetUser = (response) => {
  //isLogin
  const decoded = jwtDecode(response.credential);
  console.log("jwt", decoded);
  const { name, email, sub, picture } = decoded;
  const user = {
    _id: sub,
    username: name,
    email: email,
    image: picture,
  };
  localStorage.setItem("jwt-auth", JSON.stringify(user));
  //    GetSignUp(user)
  //    .then((data) => {
  //         console.log(data);
  //         // back-end va confirmer oui ou non l'inscrption de l'utilisateur
  //         // dans ce cas si il y a un problème on traite l'erreur
  //         //en cas de succès on rajoute les infos renvoyer par le back-end
  //         // à user du useContext
  //    })
  //    .catch((error => console.log(error)))
  //    if(isLogin){
  //     GetSignIn(user)
  //     .then((data) => {
  //          console.log(data);
  //          // meme chose que l'inscription
  //     })
  //     .catch((error => console.log(error)))
  //    }
};

const ConnexionUser = (response, navigate, setUser) => {
  const token = response?.data?.token;
  const decoded = jwtDecode(token);
  const { email, username, id ,color} = decoded;
  const user = {
    email,
    username,
    id,
    token,
    color
  };
  localStorage.setItem("jwt-auth", JSON.stringify(user));
  setUser(JSON.parse(localStorage.getItem("jwt-auth")));
  navigate("/");
};

export { createOrGetUser, ConnexionUser };
