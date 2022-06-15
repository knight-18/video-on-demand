import View from "./view";
import { Authenticator } from "@aws-amplify/ui-react";
import Navbar from "../../atoms/Navbar";
import { Helmet } from "react-helmet";
function ShortContent() {
  return (
    <>
      <Helmet>
        <title>Social Media Streaming</title>
        <meta name="title" content="Social Media Streaming" />
        <meta
          name="description"
          content="Short, entertaining videos. Interact with the videos and express your creativity."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://master.d3g104zlkuwyth.amplifyapp.com/"
        />
        <meta property="og:title" content="Social Media Streaming" />
        <meta
          property="og:description"
          content="Short, entertaining videos. Interact with the videos and express your creativity."
        />
        <meta property="og:image" content="/android-chrome-512x512.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://master.d3g104zlkuwyth.amplifyapp.com/"
        />
        <meta property="twitter:title" content="Social Media Streaming" />
        <meta
          property="twitter:description"
          content="Short, entertaining videos. Interact with the videos and express your creativity."
        />
        <meta property="twitter:image" content="/android-chrome-512x512.png" />
      </Helmet>
      <Navbar />
      <div>
        <Authenticator>
          {({ signOut, user }) => <View signOut={signOut} user={user} />}
        </Authenticator>
      </div>
    </>
  );
}

export default ShortContent;
