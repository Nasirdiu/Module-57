import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import app from "./firebase.init";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const auth = getAuth(app);
function App() {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [reg, setReg] = useState(false);
  const [name, setName] = useState("");

  const handelName = (event) => {
    setName(event.target.value);
  };

  const handlEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlecheekbox = (event) => {
    setReg(event.target.checked);
  };

  const handlefrom = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
      setError("password dont match error");
      return;
    }

    setValidated(true);
    setError("");

    if (reg) {
      signInWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
        })
        .catch((error) => {
          console.error(error);
          setError(error.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          const user = result.user;
          console.log(user);
          setEmail("");
          setPassword("");
          verifyEmail();
          setUserName();
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    }
    event.preventDefault();
  };
  //email veryfiy
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email veriyed send");
    });
  };

  //rest password

  const handlerestpassword = () => {
    sendPasswordResetEmail(auth, email).then(() => {
      console.log("email send");
    });
  };

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("update name");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <div>
      <div className="register mt-2 w-50 mx-auto">
        <h1 className="text-info">Please {reg ? "login" : "Resister"} !!</h1>
        <Form noValidate validated={validated} onSubmit={handlefrom}>
          {!reg && (
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                onBlur={handelName}
                type="text"
                placeholder="Enter text"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Name.
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onBlur={handlEmail}
              type="email"
              placeholder="Enter email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onBlur={handlePassword}
              type="password"
              placeholder="Password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid password.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check
              onChange={handlecheekbox}
              type="checkbox"
              label=" All Ready Reg"
            />
          </Form.Group>
          <p className="text-danger"> {error}</p>
          <Button onClick={handlerestpassword} variant="link">
            Forget Password?
          </Button>
          <br />
          <Button variant="primary" type="submit">
            {reg ? "login" : "Resister"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
