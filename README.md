# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Media Streaming Platform
This solution provides a reference to build a scalable video-on-demand platform on AWS which is highly available and delivers video content with low latency in a secured way. 

The solution includes a video processing pipeline to store, process and devlier the videos to the end user along with a serverless API layer to handle the dynamic HTTP/HTTPS calls from client-side application. 

## Architecture Overview
<img src="https://firebasestorage.googleapis.com/v0/b/ombre-data-extraction.appspot.com/o/VOD-Serverless.drawio.png?alt=media&token=c6ca1726-752f-4d64-9a0f-a290f2e836d7"  
     alt="Markdown Monster icon"  
     style="float: left; " />
     
**Figure 1. Media Streaming Platform Architecture**
The architecture includes the following infrastructure:
1. [Amazon S3](https://aws.amazon.com/s3/) Buckets (source and destination) to store the uploaded and processed videos.
2. [AWS Elemental Mediaconvert](https://aws.amazon.com/mediaconvert/) to transcode the videos into HLS adaptive bitrate files.
3. AWS Cloudwatch to track the mediaconvert job and invoke required lambda function.
4. Amazon Cloudfront to distribute the video content.
5. [Amazon API Gateway](https://aws.amazon.com/api-gateway/) to route the incoming HTTP requests from client side to Lambda function.
6. AWS Lambda functions to handle the triggers for video processing and HTTP requests from API Gateway. Gateway.
7. [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) tables to store the user and video metadata.
8. [Amazon Opensearch Service](https://aws.amazon.com/opensearch-service/) to provide real-time search.
9. [AWS Amplify](https://aws.amazon.com/amplify/) for hosting client side web application and managing authentication using [Amazon Cognito](https://aws.amazon.com/cognito).


## Security
### IAM Roles
AWS Identity and Access Management (IAM) provides fine-grained access control to the services in the AWS cloud. The solution creates multiple IAM roles to allow access to specific services according to achieve least-privilege permission.
### Amazon Cognito
Amazon Cognito adds the access control to the client-side application. The end users need to authenticate themselves to upload or access the available content. 
### Amazon Cloudfront
To help reduce latency and improve security, this solution includes an Amazon CloudFront distribution with an origin access identity, which is a special CloudFront user that helps restrict access to the solution’s website bucket contents.

## Source Code
The complete source code for client-side application is available on the [Github Repository](https://github.com/knight-18/msp).

## Deployment
### Launch Stack
This automated AWS CloudFormation template deploys the Live Streaming on AWS with Amazon S3 solution on the AWS Cloud. 
The template deploys a number of resources. Therefore you must select the region in which all the services are available. You can refer to [AWS Regional Service List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).
1. Download the Cloudformation template.  
2. On the **Create stack** page, verify that the correct template shows in the **Amazon S3 URL** text box and choose **Next**.
3. On the **Specify stack details** page, assign a name to your solution stack.
4. Under **Parameters**, review the parameters for the template, and modify them as necessary. This solution uses the following default values.
| Parameter Name | Default Value  | Description |
|lambdaFunctionsS3Bucket|vod-lambda-functions| Bucket Name in which the Lambda functions are stored |
| region | us-east-1  | Region in which the resources are launched |
5. Choose **Next**.
6. On the **Options** page, choose **Next**.
7. On the **Review** page, review and confirm the settings. Be sure to check the box acknowledging that the template will create AWS Identity and Access Management (IAM) resources.
8. Choose **Create** to deploy the stack.
    You can view the status of the stack in the AWS CloudFormation console in the **Status** column. You should receive a **CREATE_COMPLETE** status in approximately five minutes.
 9. The values in the output tabs would be required in configuring the client-side application.
### Launching Client Side Application
1. Clone [Github Repository](https://github.com/knight-18/msp).
    `git clone https://github.com/knight-18/msp.git`
2. Enter into the root directory
    `cd msp`
3. Run the following commands
    `npm install`
   ` amplify init`
    * Enter name for the project
    * Setup basic configuration and authentication method
    * Select region
    
    `amplify add auth`
    * Select **default configuration**
    * Select **email** for signin method. 
    * Select **No I'm done** for advanced settings.
    
    `amplify push`
4. Create a file **.env** in the root directory. Copy contents of **.env.sample** to **.env**.
5. Copy the values from the output tab of Cloudformation stack and update in the **.env** file.
The *REACT_APP_COGNITO_IDENTITY_POOL_ID* variable can be found in the file *aws-exports.js* as *aws_cognito_identity_pool_id*inside *src* folder.
### Configuring Bucket Access and Trigger
1. Go to AWS Console and open Amazon Cognito.
2. Select the created user pool.
3. Go to user pool properties.
4. Click add Lambda Trigger.
5. Select Pre-Signup Trigger.
6. Select onCognitoUserCreate function.
When you create an Identity Pool, two roles will be created for you by Cognito. One for “Unauthenticated Role” and another for “Authenticated Role” as shown in the image above. We will need to modify the *Authenticated Role* roles using IAM console.
We will edit the roles using the policy editor and use the policy `json` below.

<script src="https://gist.githubusercontent.com/annjawn/742272662a9c383b4d63af9cb78e1cde/raw/2991a6c7140ca4441006bb20a9063e711f29ddb8/authpermission.json"></script>

### Running Application
`npm start`
### Hosting Application
1. Create a github repository and push your code.
2. Go to AWS Console and open AWS Amplify.
3. Select the deployed project.
4. Select Hosting environments.
5. Connect repository.
6. Select Github and allow access to your repository.
7. Select a branch to deploy.
8. Add the environment variables.
9. Access the website through the URL.

## Resources
#### Dynamo DB Tables

-   usersTable - Table to store users data
-   shortVideosTable - Table to store short video data
-   longVIdeosTable - Table to store long video data
-   shortVideoLikesTable - Table to store short video likes data
-   genrewiseVideosTable - Table to store long videos data with mapping to genre
-   languagewiseVideosTable - Table to store long videos data with mapping to language
-   longVideosRatingTable - Table to store long videos rating data

#### Lambda Functions

-   onCognitoUserCreate - Updates user info to usersTable when new user sign up
-   onShortVideoUpload - Updates short video data in shortVIdeosTable on short video upload
-   onLongVideoUpload - Updates long video data in longVIdeosTable, genrewiseVideosTable, languagewiseVideosTable
-   getShortContent - Fetch short videos from database
-   getLongContent - Fetch long videos from database
-   likeShortVideos - Function to like short videos
-   rateLongVideo - Function to rate long videos
-   queryDB - function to query database tables
-   CustomResource
-   JobSubmit
-   JobComplete

#### API

-   HTTPAPI - HTTP API to call lambda function from front end application

##### API Routes

-   uploadShortContentRoute -  _PUT /short-content/upload_ - Route to upload short videos
-   uploadLongContentRoute - PUT /long-content/upload - Route to upload long videos
-   getShortContentRoute - _GET /short-content/get_ - Route to fetch short videos
-   getLongContentRoute -  _GET /long-content/get - Route to fetch long videos_
-   likeShortContentRoute - POST /short-content/like - Route to like short videos
-   rateLongContentRoute - POST /long-content/rating - Route to rate long videos
-   dbQueryRoute - POST /query - Route to query database

### S3 Buckets

-   Source71E471F1 - Bucket to store uploaded videos by users
-   Destination920A3C57 - Bucket to store videos converted into multiple formats
-   CloudfrontLoggingBucket

### Cloudfront

-   CloudFrontCloudFrontDistribution824F3346 - Cloufront distribution to server content from destination bucket

### Mediaconvert

-   MediaConvertRole
## Cost 
