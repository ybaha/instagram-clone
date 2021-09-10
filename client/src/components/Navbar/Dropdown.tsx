import React from "react";
import { DDProfile, DDSaved, DDSettings, DDSwitch } from "../icons";
import { useAuth } from "../../Firebase/AuthContext";
import { useHistory } from "react-router-dom";

export default function Dropdown() {
  const { logout, getCurrentUsername } = useAuth();
  const history = useHistory();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "230px",
        height: "194px",
        backgroundColor: "white",
        marginLeft: "-200px",
        marginTop: "10px",
        boxShadow: "0px 0px 5px 1px rgba(204,204,204,1)",
        borderRadius: "10px",
      }}
    >
      <div
        className="dd-item"
        onClick={() => {
          history.push("/istekram/" + getCurrentUsername());
        }}
      >
        <DDProfile />
        Profil
      </div>
      <div className="dd-item">
        <DDSaved />
        Kaydedildi
      </div>
      <div className="dd-item">
        <DDSettings />
        Ayarlar
      </div>
      <div className="dd-item">
        <DDSwitch />
        Hesap Değiştir
      </div>

      <div className="hr" style={{ width: "230px", marginTop: "4px" }}></div>

      <div className="dd-logout" onClick={logout}>
        Çıkış Yap
      </div>
    </div>
  );
}
