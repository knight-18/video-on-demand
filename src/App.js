import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "./aws-exports";
import Router from "./routes.jsx";
import Storage from '@aws-amplify/storage';
Amplify.configure(awsExports);
Amplify.configure({
  Storage: {
    bucket: process.env.REACT_APP_SOURCE_VIDEO_BUCKET_NAME,
    region: process.env.REACT_APP_VIDEO_BUCKET_REGION,
    identityPoolId: process.env.REACT_APP_COGNITO_IDENTITY_POOL_ID,
  },
})
function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;
