import { Authenticator } from "@aws-amplify/ui-react";
import { useEffect, useState } from "react";
import Navbar from "../../atoms/Navbar";
import { handleSignOut } from "../../utils/authentication";
import Home from "../Home";
export default function View() {
  return (
    <>
      <Navbar />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Authenticator>
          {({ user }) => {
            window.location.href = "/";
          }}
        </Authenticator>
      </div>
    </>
  );
}
