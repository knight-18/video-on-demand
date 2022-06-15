import { Auth } from "aws-amplify";
export async function fetchCurrentUser() {
  try {
    let userData = await Auth.currentAuthenticatedUser();
    return userData;
  } catch (error) {
    return null;
  }
}

export async function handleSignOut (){
  await Auth.signOut()
  window.location.href = "/"
}