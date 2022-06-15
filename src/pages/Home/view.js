import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import Landing from "./Landing";
import Navbar from "../../atoms/Navbar";

const View = ({ user }) => {
  return (
    <>
      <Landing user={user}/>
    </>
  );
};

export default View;
