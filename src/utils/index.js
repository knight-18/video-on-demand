import { Auth } from "aws-amplify";
import Amplify from "@aws-amplify/core";
import { queryDB } from "./api";
export const isLoggedIn = async () => {
  try {
    await Auth.currentAuthenticatedUser();
    return true;
  } catch (error) {
    return false;
  }
};

export const configureAmplify = () => {
  Amplify.configure({
    Auth: {
      identityPoolId: "us-east-1_Cz1RYFJ0o",
      region: "us-east-1",
      userPoolId: "us-east-1_Cz1RYFJ0o",
      userPoolWebClientId: "1gliob4qcs9h3u6cmdn3fe711d",
    },
    Storage: {
      bucket: "upload-test-bucket-vod",
      region: "us-east-1",
      identityPoolId: "us-east-1_Cz1RYFJ0o",
    },
  });
};

export const getShortVideoRenderUrl = (keyPath) => {
  return `${process.env.REACT_APP_CLOUDFRONT_DOMAIN}/public/shortVideos${
    keyPath.split("shortVideos")[1]
  }`;
};
export const getLongVideoRenderUrl = (keyPath) => {
  return `${process.env.REACT_APP_CLOUDFRONT_DOMAIN}/public/longVideos${
    keyPath.split("longVideos")[1]
  }`;
};

export const fetchSubscriptionStatus = async (userId) => {
  let params = {
    keyConditions: [
      {
        attributeName: "userId",
        comparisonOperator: "EQ",
        attributeValueList: [userId],
      },
    ],
    tableName: process.env.REACT_APP_SUBSCRIPTION_TABLE_NAME,
  };
  let response = await queryDB(params);
  // console.log("THIS LOG:", response)
  if (response.Items.length) {
    let subscriptionData = response.Items[0];
    let currentTimestamp = Date.now();
    if (subscriptionData.subscriptionEndTimestamp > currentTimestamp) {
      return {
        active: true,
        subscriptionEndTimestamp: subscriptionData.subscriptionEndTimestamp,
      };
    }
  }
  return {
    active: false,
    subscriptionEndTimestamp: null,
  };
};
