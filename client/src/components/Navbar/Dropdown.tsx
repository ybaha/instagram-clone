import React from "react";
import { DDProfile, DDSaved, DDSettings, DDSwitch } from "../icons";
import { useAuth } from "../../Firebase/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dropdown({ style }: any) {
  const { logout, getCurrentUsername } = useAuth();
  const navigate = useNavigate();

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
        ...style,
      }}
    >
      <div
        className="dd-item"
        onClick={() => {
          navigate("/" + getCurrentUsername());
        }}
      >
        <DDProfile width={24} />
        Profil
      </div>
      <div className="dd-item">
        <DDSaved width={24} />
        Kaydedildi
      </div>
      <div className="dd-item">
        <DDSettings width={24} />
        Ayarlar
      </div>
      <div className="dd-item">
        <DDSwitch width={24} />
        Hesap Değiştir
      </div>

      <div className="hr w-[230px] h-px bg-gray-200 mt-2 mb-4"></div>

      <div className="dd-logout text-red-800" onClick={logout}>
        Çıkış Yap
      </div>
    </div>
  );
}
