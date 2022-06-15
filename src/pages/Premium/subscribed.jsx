import moment from "moment";
const Subscribed = ({ user, subscriptionEndTimestamp }) => {
  let subscriptionEndDate = new Date(subscriptionEndTimestamp);

  return (
    <div className="container">
      <div className="header">
        <h2>
          Your premium membership is expiring on <br />
          {moment(subscriptionEndDate).format("MMMM Do YYYY, h:mm a")}
        </h2>
      </div>
    </div>
  );
};

export default Subscribed;
