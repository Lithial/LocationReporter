import React from "react";
import TimezoneFinder from "../components/TimezoneFinder";
import ProfileElements from "../components/Profile/ProfileElements";


const Profile = () => {

  return (
    <div>
      <div>
          <TimezoneFinder />
          <ProfileElements/>
      </div>
    </div>
  );
};

export default Profile;