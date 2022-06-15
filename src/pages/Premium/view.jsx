import { useEffect, useState } from "react";
import { queryDB } from "../../utils/api";
import { fetchSubscriptionStatus } from "../../utils";
import Subscribed from "./subscribed";
import Unsubscribed from "./unsubscribed";
import { Backdrop, CircularProgress } from "@mui/material";
const View = ({ user }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionEndTimestamp, setSubscriptionEndTimestamp] =
    useState(null);
  const updateSubsciptionStatus = async () => {
    // API CALL TO FIGURE OUT CURRENT SUBSCIPTION STATUS
    let subscriptionStatus = await fetchSubscriptionStatus(user.attributes.sub);
    if (subscriptionStatus.active) {
      setSubscriptionEndTimestamp(subscriptionStatus.subscriptionEndTimestamp);
      setIsSubscribed(true);
    }
    setIsLoading(false);
    return;
  };
  useEffect(() => {
    updateSubsciptionStatus();
  }, []);
  return (
    <div>
      {isLoading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      {isSubscribed ? (
        <Subscribed
          user={user}
          subscriptionEndTimestamp={subscriptionEndTimestamp}
        />
      ) : (
        <Unsubscribed user={user} />
      )}
    </div>
  );
};

export default View;
