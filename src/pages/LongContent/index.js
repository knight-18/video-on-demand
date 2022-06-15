import Navbar from "../../atoms/Navbar";
import View from "./view";
import { Authenticator } from "@aws-amplify/ui-react";
import { Helmet } from "react-helmet";

function LongContent() {
  return (
    <>
      <Helmet>
        <title>OTT Streaming</title>
        <meta name="title" content="OTT Streaming" />
        <meta
          name="description"
          content="Streaming content to users directly over the web."
        />

        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://master.d3g104zlkuwyth.amplifyapp.com/"
        />
        <meta property="og:title" content="OTT Streaming" />
        <meta
          property="og:description"
          content="Streaming content to users directly over the web."
        />
        <meta property="og:image" content="/android-chrome-512x512.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://master.d3g104zlkuwyth.amplifyapp.com/"
        />
        <meta property="twitter:title" content="OTT Streaming" />
        <meta
          property="twitter:description"
          content="Streaming content to users directly over the web."
        />
        <meta property="twitter:image" content="/android-chrome-512x512.png" />
      </Helmet>
      <Navbar />
      <Authenticator>
        {({ signOut, user }) => <View signOut={signOut} user={user} />}
      </Authenticator>
    </>
  );
}

export default LongContent;
