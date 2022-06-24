# Media Streaming Platform

This solution provides a reference architecture and implementation steps to build a platform either for short form videos for a social app, or long form videos for a streaming service on AWS which is highly available and delivers video content with low latency in a secured way.

The solution includes a video processing pipeline to store, process and deliver the videos to the end user along with a serverless API layer to handle the dynamic calls from client-side application. The solution also provides a payment gateway integration to manage payments.

## Architecture Overview
<img src="https://firebasestorage.googleapis.com/v0/b/ombre-data-extraction.appspot.com/o/MSP_Serverless.drawio.png?alt=media&token=a8fdd342-f48f-48aa-8b3a-2282b8d9753d"  
     alt="Markdown Monster icon"  
     style="float: left; " />

Figure 1. Media Streaming Platform Architecture

The architecture includes the following components:

- [Amazon S3](https://aws.amazon.com/s3/) Buckets (source and destination) to store the uploaded and processed videos.
- [AWS Elemental Mediaconvert](https://aws.amazon.com/mediaconvert/) to transcode the videos into HLS adaptive bitrate files.
- [Amazon Cloudwatch](https://aws.amazon.com/cloudwatch/) to track the mediaconvert job and invoke the required lambda function.
- [Amazon Cloudfront](https://www.amazonaws.cn/en/cloudfront/) to distribute the video content.
- [Amazon API Gateway](https://aws.amazon.com/api-gateway/) to route the incoming HTTP requests from client side to Lambda function.
- [AWS Lambda](https://aws.amazon.com/lambda/) functions to handle the triggers for video processing and HTTP requests from API Gateway.
- [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) tables to store the user and video metadata.
- [Amazon Opensearch](https://aws.amazon.com/opensearch-service/the-elk-stack/what-is-opensearch/) Service to provide real-time search.
- [AWS Amplify](https://aws.amazon.com/amplify/) for hosting client side web application and managing authentication using [Amazon Cognito](https://aws.amazon.com/cognito/).
- [Razorpay](https://razorpay.com/) for managing payments. (Razorpay service is provided by third party vendor)

## Security

### IAM Roles

AWS Identity and Access Management (IAM) provides fine-grained access control to the services in the AWS cloud. The solution creates multiple IAM roles to allow access to specific services to achieve least-privilege permission.

### Amazon Cognito

Amazon Cognito adds the authentication and authorization to the client-side application. The end users need to authenticate themselves to upload or access the available content.

### Amazon Cloudfront

To help reduce latency and improve security, this solution includes an Amazon CloudFront distribution with an origin access identity, which is a special CloudFront feature that helps restrict access to the solution&#39;s website bucket contents.

## Source Code and Deployment

Before you launch the automated deployment, review the architecture discussed in this guide. Follow the step-by-step instructions in this section to configure and deploy the Media Streaming Platform solution into your account.

You are responsible for the cost of the AWS services used while running this solution on your AWS account.

### Prerequisites
- Download the automated Cloudformation template, Lambda functions and the source code for client side application which is available on the [Github Repository.](https://github.com/knight-18/video-on-demand)
 AWS Employees having Workdocs access can download the code from [here](https://amazon.awsapps.com/workdocs/index.html#/folder/7aba507e1166045d51df9fa6fe03b2a57c7ee71427f8540a020ebe5d30f8b686).
 This repository contains the source code for the following assets:
  - AWS Cloudformation template ( **CFTemplates/media-streaming- platform.json** ) to deploy the AWS resources in your AWS account.
  - AWS Lambda functions( **LambdaFunctions** ) for client side application to interact with the AWS resources.
  - An implementation of a client side application to host the Media Streaming Platform which can be used as a reference to build application as per your requirements.
  - IAM Policy ( **IAM-Policies/Cognito-Auth-Role.json** ) to provide access to S3 bucket to upload files to S3.
- Download zip files for all the Lambda Functions ( **LambdaFunctions** ) from Github repository and upload them to an Amazon S3 Bucket ( **vod-lambda-functions** ) in your AWS account. You can create a new Amazon S3 Bucket to store the Lambda functions by following the steps mentioned [here](https://docs.aws.amazon.com/AmazonS3/latest/userguide/creating-bucket.html).

### Deployment

#### Launch Stack

The automated AWS CloudFormation template deploys the components of the Media Streaming platform on the AWS Cloud.

The template deploys a number of resources. Therefore you must select the AWS region in which all the services are available. You can refer to[AWS Regional Service List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

1. Download the Cloudformation template.
2. Go to AWS Console and open Cloudformation.
3. On the **Create stack** page, verify that the correct template shows in the **Amazon S3 URL** text box and choose **Next**.
4. On the **Specify stack details** page, assign a name to your solution stack.
5. Under **Parameters** , review the parameters for the template, and modify them as necessary. This solution uses the following default values.


| Parameter Name | Default Value | Description |
| --- | --- | --- |
| lambdaFunctionsS3Bucket | vod-lambda-functions | S3 Bucket Name in which the Lambda functions are stored |
| region | us-east-1 | AWS region in which the resources are launched |

1. Choose **Next**.
2. On the **Options** page, choose **Next**.
3. On the **Review** page, review and confirm the settings. Be sure to check the box acknowledging that the template will create AWS Identity and Access Management (IAM) resources.
4. Choose **Create** to deploy the stack.
 You can view the status of the stack in the AWS CloudFormation console in the **Status** column. You should receive a **CREATE\_COMPLETE** status in approximately five minutes.
5. The values in the output tabs would be required in configuring the client-side application.
6. Go to AWS Console and Open **Lambda**.
7. Select the **opensearchIndexing** function created by cloudformation.
8. Select Configuration.
9. Select Environment Variables.
10. Update the **OPENSEARCH\_DOMAIN** value from the Outputs tab of Cloudformation Stack.
11. Follow steps 12-15 for **opensearchFetch** function.

#### Payment Gateway API Keys Setup (Optional)

This section can be skipped if you do not want to integrate a payment gateway using Razorpay in client-side application.

Razorpay is used to integrate the payment gateway in the client-side application. You need to visit[Razorpay](https://razorpay.com/) to generate the API keys.

Follow these steps to generate API keys:

1. Log into your[Dashboard](https://dashboard.razorpay.com/signin?screen=sign_in) with appropriate credentials.
2. Select the mode ( **Test** or **Live** ) for which you want to generate the API key.
  1. **Test Mode** : The test mode is a simulation mode that you can use to test your integration flow. **Your customers will not be able to make payments in this mode**.
  2. **Live Mode** : When your integration is complete, switch to live mode and generate live mode API keys. **Replace test mode keys with live mode keys in the integration** to accept payments from customers.
3. Navigate to **Settings** → **API Keys** → **Generate Key** to generate keys for the selected mode. The Key Id and Key Secret appear on a pop-up page.
4. Go to AWS Console and open Lambda in AWS Console.
5. Select **createPaymentOrder** function.
6. Select **Configuration**
7. Select **Environment Variables**
8. Update the following environment variables with the Razorpay Key Id and Razorpay Key Secret generated in step 3.
 A. RAZORPAY\_KEY\_ID = \&lt;RAZORPAY\_KEY\_ID\&gt;
 B. RAZORPAY\_KEY\_SECRET = \&lt;RAZORPAY\_KEY\_SECRET\&gt;

#### Client Side Application

1. Clone[Github Repository](https://github.com/knight-18/video-on-demand).
_git clone https://github.com/knight-18/video-on-demand.git_
2. Enter into the root directory
_cd msp_
3. Install the required modules for client-side application
 _npm install_
4. To initialize a new Amplify project, run the following command from the root directory.
_amplify init_
  1. Enter name for the project
  2. Setup basic configuration and authentication method
  3. Select AWS region
5. To add authentication services, run the following command
_amplify add auth_
6. Select **default configuration**
7. Select **email** for signin method.
8. Select **No I&#39;m done** for advanced settings. (Amazon Cognito provides a number of features to provide more security to your application. You can also configure advanced security methods according to your requirements.)
9. To update the cloud resources
_amplify push_
10. Create a file **.env** in the root directory.
 MacOS, linux users can use the following command the create an empty file:
_touch .env_
11. Copy contents of **.env.example** to **.env**.
12. Copy the values from the output tab of Cloudformation stack and update in the **.env** file.
13. The _REACT\_APP\_COGNITO\_IDENTITY\_POOL\_ID_ variable can be found in the file _aws-exports.js_ as _aws\_cognito\_identity\_pool\_id_inside _src_ folder.

#### Configuring Bucket Access and Trigger

1. Go to AWS Console and open Amazon Cognito.
2. Select the user pool created by the cloudformation template.
3. Go to **user pool properties**.
4. Click **add Lambda Trigger**.
5. Select **Pre-Signup Trigger**.
6. Select **onCognitoUserCreate** function.

When you create an Identity Pool, two roles will be created for you by Cognito. One for &quot;Unauthenticated Role&quot; and another for &quot;Authenticated Role&quot; as shown in the image above. We will need to modify the _Authenticated Role_ roles using the IAM console. We will edit the roles using the policy editor and use the policy json below.

1. Go to AWS Console and open IAM.
2. Select **Roles**.
3. Search for **&quot;authRole&quot;** created by Amplify.
4. Select **Add Permission**.
5. Select **Create Inline Policy**
6. Select **JSON Tab**.
 Copy the downloaded policy ( **IAM-Policies/Cognito-Auth-Role.json** ) from [Github Repository](https://github.com/knight-18/video-on-demand) and replace the bucket name (my-test-bucket-amplify) with the name of the SourceBucket resource generated in Cloudformation outputs.

7. Select **Review Policy**.
8. Enter name (Source-Bucket-Access-Policy) and select **Create Policy**.

#### Running Application

For running application on you local machine, use the following command from the root directory:

_npm start_

#### Hosting Application

##### Prerequisites

You need to create(if you already have an account you can use that) and[setup a github account](https://docs.github.com/en/get-started/quickstart/set-up-git) on your local machine before using for the following steps.

1. Create a github repository and push your code.
  1. Sign in to GitHub and create a new empty repository page.
  2. Give a name (Media-Streaming-Platform) to the repository and select the public repository type. Leave other things to default and select Create Repository.
  3. Go to the root directory of the client-side application in your terminal on your local machine.
  4. Add the files to Git index
_git add ._
  5. Commit Added Files
_git commit -m &quot;Added my project&quot;_
  6. Add new remote origin (in this case, GitHub)
_git remote add origin git@github.com:__username/Media-Streaming-Platform.git_
 Replace the highlighted bits above with your username and repository name.
  7. Push to GitHub
_git push -u origin master_
2. Go to AWS Console and open AWS Amplify.
3. Select the deployed project.
4. Select **&quot;Hosting environments&quot;**.
5. Select **&quot;Github&quot;** and click **&quot;connect branch&quot;** to allow access to your repository.
6. Select **Media-Streaming-Platform** repository from the dropdown list.
7. Select branch **&quot;master&quot;** and click **&quot;next&quot;**.
8. Select an environment for the application.
9. Select role or create new if it doesn&#39;t exist already.
  1. To create a new role, click **create new role**.
  2. Select **next:Permissions**.
  3. Select **next:Tags**.
  4. Review the role and select **create role**.

1. Click on **&quot;advanced settings&quot;** and add all environment variables added in the _.env_ file.
2. Click **&quot;next&quot;**.
3. Review the details and click **save and deploy**.

## Resources

### DynamoDB Tables

1. usersTable - Table to store users data
2. shortVideosTable - Table to store short video data
3. longVideosTable - Table to store long video data
4. shortVideoLikesTable - Table to store short video likes data
5. genrewiseVideosTable - Table to store long videos data with mapping to genre
6. languagewiseVideosTable - Table to store long videos data with mapping to language
7. longVideosRatingTable - Table to store long videos rating data
8. subscriptionTable - Table to store users subscription status information

### Lambda Functions

1. onCognitoUserCreate - Updates user info to usersTable when new user sign up
2. onShortVideoUpload - Updates short video data in shortVIdeosTable on short video upload
3. onLongVideoUpload - Updates long video data in longVIdeosTable, genrewiseVideosTable and languagewiseVideosTable
4. getShortContent - Fetch short videos from database
5. getLongContent - Fetch long videos from database
6. likeShortVideos - Function to like short videos
7. rateLongVideo - Function to rate long videos
8. queryDB - function to query database tables
9. createPaymentOrder - Function to create payment order for Razorpay
10. premiumSubscription - Function to update subscription details in database
11. CustomResource - Function to manage video processing with AWS Elemental MediaConvert
12. JobSubmit - Function submits the job to AWS Elemental MediaConvert
13. JobComplete - Function to update video information after getting processed

### API

1. HTTP API - HTTP API to call lambda function from front end application

### API Routes

1. uploadShortContentRoute - _PUT /short-content/upload_ - Route to upload short videos
2. uploadLongContentRoute - PUT /long-content/upload - Route to upload long videos
3. getShortContentRoute - POST _/short-content/get_ - Route to fetch short videos
4. getLongContentRoute - POST _/long-content/get -_ Route to fetch long videos
5. likeShortContentRoute - POST _/short-content/like_ - Route to like short videos
6. rateLongContentRoute - POST _/long-content/rating_ - Route to rate long videos
7. dbQueryRoute - POST _/query_ - Route to query database
8. createPaymentOrderRoute - POST _/premium/payment_ - Route to create payment order
9. premiumSubscriptionRoute - POST _/premium/confirm_ - Route to update subscription details
10. opensearchFetchRoute - GET _/opensearch_ - Route to fetch search results
11. opensearchIndexingRoute - POST _/opensearch_ - Route to index video in opensearch

### Amazon S3 Buckets

1. Source Bucket - Bucket to store uploaded videos by users
2. Destination Bucket - Bucket to store videos converted into multiple formats
3. Cloudfront Logging Bucket

### Amazon Cloudfront

1. CloudFrontCloudFrontDistribution824F3346 - Cloudfront distribution to server content from destination bucket

### AWS Elemental Mediaconvert

1. MediaConvertRole - MediaConvert transcodes the video into HLS Adaptive Bitrate files.

### Amazon Opensearch Service

1. Opensearch Domain - OpenSearch enables you to easily ingest, secure, search, aggregate, view, and analyze data.
