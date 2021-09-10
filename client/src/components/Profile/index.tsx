import axios from "axios";
import React from "react";
import s from "./index.module.scss";
import { RouteComponentProps } from "react-router";
import Button from "../Button";
import { RiUserAddFill, RiUserFollowFill } from "react-icons/ri";
import { BiLink } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { useAuth } from "../../Firebase/AuthContext";
import { useStore } from "../../store/UIStore";
import { observer } from "mobx-react-lite";

type RouteParams = {
  username: string;
};

type UserData = {
  _id: string;
  uid: string;
  username: string;
  profile_picture: string;
  real_name: string;
  website: string;
  bio: string;
  email: string;
  following: [];
  posts: [];
};

const Page404: React.FC = () => {
  return <h2>Sorry this page is not available</h2>;
};

const Profile: React.FC<RouteComponentProps<RouteParams>> = (p) => {
  const [profileData, setProfileData] = React.useState<UserData>(
    {} as UserData
  );
  const { currentUserData } = useStore();

  const username = p.match.params.username;
  let { getCurrentUsername } = useAuth();

  async function getUser() {
    if (username) {
      let res = await axios.get(
        process.env.REACT_APP_SERVER + "api/user/get/" + username
      );
      setProfileData(res.data);
    }
  }

  React.useEffect(() => {
    getUser();
  }, [p.match.params.username]);

  const parseUrl = (url: string) => {
    let hname = new URL(url).hostname;
    return hname;
  };

  const isProfileMine = () => {
    if (currentUserData.following)
      return currentUserData.following.find(
        (e: any) => e.username === username
      );
  };

  return (
    <div className={s.main}>
      {!profileData.username ? (
        <Page404 />
      ) : (
        <div className={s.profileContainer}>
          <div className={s.profileHeader}>
            <div className={s.profileImage}>
              <img src={profileData.profile_picture}></img>
            </div>
            <section className={s.profileInfo}>
              <div className={s.section}>
                <h2>{profileData.username}</h2>
                <div className={s.headerButtons}>
                  {username === getCurrentUsername() ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FiSettings
                        size={22}
                        style={{ margin: "0 0 4px 12px" }}
                      />
                    </div>
                  ) : (
                    <>
                      {isProfileMine() ? (
                        <Button
                          type={"secondary"}
                          icon={
                            <RiUserFollowFill style={{ margin: "0 14px" }} />
                          }
                          style={{ marginRight: "6px" }}
                        />
                      ) : (
                        <Button
                          type={"primary"}
                          icon={
                            <RiUserAddFill
                              color="white"
                              style={{ margin: "0 14px" }}
                            />
                          }
                          style={{ marginRight: "6px" }}
                        />
                      )}
                      <Button
                        type={isProfileMine() ? "secondary" : "primary"}
                        icon={
                          <MdKeyboardArrowDown
                            color={isProfileMine() ? "black" : "white"}
                          />
                        }
                        style={{ marginRight: "6px" }}
                      />
                    </>
                  )}
                </div>
              </div>
              <ul className={s.list}>
                <li>
                  <span>{profileData.posts?.length + " "}</span> gonderi
                </li>
                <li>
                  <span>{profileData.following?.length}</span> takipci
                </li>
                <li>
                  <span>{profileData.following?.length}</span> takip
                </li>
              </ul>
              <div className={s.section} style={{ flexDirection: "column" }}>
                <h5>{profileData.real_name}</h5>
                <span style={{ marginTop: "6px" }}>{profileData.bio}</span>
                {profileData.website && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "6px",
                    }}
                  >
                    <BiLink
                      size="18"
                      color="rgb(1, 47, 109)"
                      style={{ marginRight: "2px" }}
                    />
                    <a href={profileData.website}>
                      {parseUrl(profileData.website)}
                    </a>
                  </div>
                )}
              </div>
            </section>
          </div>
          <div className={s.divider}></div>
        </div>
      )}
    </div>
  );
};

export default observer(Profile);
