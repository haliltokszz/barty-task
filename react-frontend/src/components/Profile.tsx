import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/auth.service";
import IUser from "../types/user.type";

const Profile: React.FC = () => {
  const initialValues: IUser = {
    username: "",
    email: "",
    name: "",
    surname: "",
    age: 0,
    bornAt: new Date(),
    password: "",
  };

  const [currentUser, setCurrentUser] = useState<IUser>(initialValues);

  useEffect(() => {
    getCurrentUser().then((user) => {
      console.log(user);
      if(user) {
        setCurrentUser(user);
      }
    });
  }, [])

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser?.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Email:</strong> {currentUser?.email}
      </p>
      <p>
        <strong>Name:</strong> {currentUser?.name}
      </p>
      <p>
        <strong>Surname:</strong> {currentUser?.surname}
      </p>
      <p>
        <strong>Age:</strong> {currentUser?.age}
      </p>
      <p>
        <strong>Birthday:</strong> {currentUser?.bornAt?.toDateString()}
      </p>
    </div>
  );
};

export default Profile;
