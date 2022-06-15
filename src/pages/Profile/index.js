import Navbar from "../../atoms/Navbar";
import View from "./view";
import { Authenticator } from "@aws-amplify/ui-react";

function Profile() {
  return (
    <>
      <Navbar />
      <Authenticator>
        {({ signOut, user }) => <View signOut={signOut} user={user} />}
      </Authenticator>
    </>
  );
}

export default Profile;
