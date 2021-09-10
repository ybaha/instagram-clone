import axios from "axios";
import React from "react";
import { RouteComponentProps } from "react-router";

type RouteParams = {
  username: string;
};

const Profile: React.FC<RouteComponentProps<RouteParams>> = (p) => {
  const [userData, setUserData] = React.useState<any>({});
  let username = p.match.params.username;

  React.useEffect(() => {
    async function getUser() {
      if (username) {
        let res = await axios.get(
          process.env.REACT_APP_SERVER + "api/user/get/" + username
        );
        setUserData(res.data);
      }
    }
    getUser();
  }, []);

  return <div style={{ marginTop: "123px" }}>{JSON.stringify(userData)}</div>;
};

export default Profile;
