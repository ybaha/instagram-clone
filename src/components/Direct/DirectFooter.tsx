import React from "react";
import NavbarButtons from "../Navbar/NavbarButtons";

type Props = {
  button?: any;
  input?: any;
  contactClicked?: any;
};

const DirectFooter: React.FC<Props> = ({ button, input, contactClicked }) => {
  const Button = button;
  const Input = input;
  const isContactClicked = contactClicked;
  return (
    <div className="direct-footer">
      {isContactClicked ? <Input></Input> : ""}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          minWidth: "220px",
          height: "60px",
        }}
      >
        <NavbarButtons button={Button} />
      </div>
    </div>
  );
};
export default DirectFooter;
