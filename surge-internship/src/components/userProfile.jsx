import axios from "axios";
import { useEffect, useState } from "react";
import "./register.css";
import { useParams } from "react-router-dom";
import validator from "validator";

function UserProfile(props) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const id = useParams();

  useEffect(() => {
    const fetchData = () => {
      axios
        .get("http://localhost:3001/api/User/profile/" + id.id)
        .then((res) => {
          //console.log(res.data);
          setFullName(res.data.fName);
          setEmail(res.data.email);
          setOldPassword(res.data.password);
          setNewPassword(res.data.password);
          setUserName(res.data.userName);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let authenticate = prompt(
      "Please enter ur old password to continue.",
      "xxx"
    );

    if (authenticate != oldPassword) {
      alert("password incorrect");
    } else {
      let hit = 0;
      if (!/^[A-Za-z\s]{5,}$/.test(fullName)) {
        alert("wronge name input");
        hit = 1;
      }
      if (!/^[A-Za-z\s]{5,}$/.test(userName)) {
        alert("wronge username input");
        hit = 1;
      }
      if (!validator.isEmail(email)) {
        alert("wrong email");
        hit = 1;
      }
      if (
        !validator.isEmpty(newPassword) &&
        !validator.isStrongPassword(newPassword)
      ) {
        alert(
          "password must contain min 8 characters, 1 or more uppercase, 1 or more lowercase, 1 or more number, 1 or more symbol"
        );
        hit = 1;
      }

      if (hit == 0) {
        const data = {
          fullName,
          email,
          userName,
          newPassword,
        };

        console.log(data);

        axios
          .post("http://localhost:3001/api/User/updateUser/" + id.id, data)
          .then((e) => {
            console.log("Update Successful");

            window.location = "/";
          })
          .catch((err) => {
            alert(err);
          });
      }
    }
  };
  return (
    <div className="container regcon">
      <center>
        <h1>Profile</h1>
      </center>
      <br />
      <br />
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label
          htmlFor="exampleFormControlInput1"
          className="form-label text-muted fw-bold"
        >
          Full Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
          }}
          placeholder="John Doe"
        />
        <br />
        <br />
        <label
          htmlFor="exampleFormControlInput2"
          className="form-label text-muted fw-bold"
        >
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput2"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="John Doe"
        />
        <br />
        <br />
        <label
          htmlFor="exampleFormControlInput3"
          className="form-label text-muted fw-bold"
        >
          User Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput3"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          placeholder="John Doe"
        />
        <br />
        <br />

        <div className="mb-3 form-group">
          <label
            htmlFor="exampleFormControlInput4"
            className="form-label text-muted fw-bold"
          >
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleFormControlInput4"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            placeholder="Password"
          />

          <br />
          <br />
          <input type="submit" className="form-control regbtn" value="Update" />
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
