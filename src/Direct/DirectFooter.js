import React from 'react'
import NavbarButtons from '../Navbar/NavbarButtons'

export default function DirectFooter(p) {
  const Button = p.button
  const Input = p.input
  const contactClicked = p.contactClicked
  return (
    <div className="direct-footer">
      {contactClicked ? <Input></Input> : ""}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"row",
        minWidth: "220px",
        height: "60px",
      }}>
        <NavbarButtons button={Button} />
      </div>
    </div >
  )
}
