import ShortContentUploader from "../../atoms/ShortContentUploader";
export default function View({ signOut, user }) {
  return <ShortContentUploader signOut={signOut} user={user} />;
}
