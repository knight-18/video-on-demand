import { Authenticator } from "@aws-amplify/ui-react";
import View from "./view";
import Navbar from "../../atoms/Navbar";

export default function Upload() {
  return (
    <div>
      <Navbar />
      <Authenticator>
        {({ signOut, user }) => <View signOut={signOut} user={user} />}
      </Authenticator>
    </div>
  );
}
