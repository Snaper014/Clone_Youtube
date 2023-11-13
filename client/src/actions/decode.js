import { jwtDecode } from "jwt-decode";

const ConnexionUser = (response, navigate, setUser) => {
  const token = response?.data?.token;
  const decoded = jwtDecode(token);
  const { email, username, id, color, image } = decoded;
  const user = {
    email,
    username,
    id,
    token,
    color,
    image
  };
  localStorage.setItem("jwt-auth", JSON.stringify(user));
  setUser(JSON.parse(localStorage.getItem("jwt-auth")));
  navigate("/");
};

export { ConnexionUser };
