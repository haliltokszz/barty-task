import React from "react";
import AuthService from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

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