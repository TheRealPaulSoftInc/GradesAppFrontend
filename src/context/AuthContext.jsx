import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiUrlContext } from "./ApiUrlContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let { apiUrl } = useContext(ApiUrlContext);

  let [authToken, setAuthToken] = useState(() => {
    let authTokenStorage = localStorage.getItem("authToken");
    return authTokenStorage ? JSON.parse(authTokenStorage) : null;
  });
  let [user, setUser] = useState(() => {
    let userStorage = localStorage.getItem("user");
    return userStorage ? JSON.parse(userStorage) : null;
  });
  let [isUserCreated, setIsUserCreated] = useState(false);
  let [loginErrors, setLoginErrors] = useState({});
  let [registerErrors, setRegisterErrors] = useState({});

  const didMount = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (didMount.current) {
      if (authToken) getAuthUser();
    } else didMount.current = true;
  }, [authToken]);

  let logoutUser = (isTokenExpired = false) => {
    if (isTokenExpired)
      toast.info(
        <>
          Your session has expired.
          <br />
          Please relogin.
        </>,
        {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  let loginUser = async (e) => {
    e.preventDefault();
    fetch(`${apiUrl}accounts/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: e.target.password.value,
      }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            data["status"] = res.status;
            setLoginErrors(data);
            throw new Error(JSON.stringify(data));
          });
        else return res.json();
      })
      .then((response) => {
        setAuthToken(response.token);
        localStorage.setItem("authToken", JSON.stringify(response.token));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  let registerUser = async (e) => {
    e.preventDefault();
    let password1 = e.target.password1.value;
    let password2 = e.target.password2.value;
    fetch(`${apiUrl}accounts/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
        password: password1 == password2 ? password1 : "",
      }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            data["status"] = res.status;
            setRegisterErrors(data);
            throw new Error(JSON.stringify(data));
          });
        else return res.json();
      })
      .then((response) => {
        setIsUserCreated(true);
        toast.success("Account Created!", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.info("A verification email was send", {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => console.log(error.message));
  };

  let getAuthUser = async () => {
    if (authToken != null) {
      fetch(`${apiUrl}accounts/auth-user/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authToken),
        },
      })
        .then((res) => {
          if (!res.ok)
            return res.json().then((data) => {
              data["status"] = res.status;
              logoutUser(true);
              throw new Error(JSON.stringify(data));
            });
          else return res.json();
        })
        .then((response) => {
          setUser(response);
          localStorage.setItem("user", JSON.stringify(response));
          navigate("/");
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  let resendActivationLink = async (email) => {
    fetch(`${apiUrl}accounts/resend/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((data) => {
            data["status"] = res.status;
            throw new Error(JSON.stringify(data));
          });
        else return res.json();
      })
      .then((response) => {
        toast.info("The verification email was resend", {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        toast.error("An error occurred", {
          position: "top-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(error.message);
      });
  };

  let contextData = {
    authToken: authToken,
    user: user,
    isUserCreated: isUserCreated,

    getAuthUser: getAuthUser,
    loginUser: loginUser,
    logoutUser: logoutUser,
    registerUser: registerUser,
    resendActivationLink: resendActivationLink,

    loginErrors: loginErrors,
    registerErrors: registerErrors,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
