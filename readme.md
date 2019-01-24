# Demonstrating a Secure Serverless Reference Architecture for a WebApp, using AWS.
The goal of the repo is to illustrate how one can deploy a single page web application (SPA) with a serverless backend.

This project illustrates how to leverage existing AWS services to build a scalable, robust and secure SPA that is easy to setup and deploy.

Some technology choices made:
- Frontend:
  - React
  - AWS Amplify (sdk and react components only, not using the cli)
- Backend:
  - nodejs runtime (AWS offers other runtimes too)
- Toolchain:
  - serverless framework (www.serverless.com)

To deploy this demo application, you'll need first install nodejs 8.10 for your platform.

Once node installed, install the serverless framework globally

```bash
npm install serverless -g
```

You'll need to have an AWS account with appropriate permissions to deploy the application (i.e. with permissions to create IAM roles, cognito user pools, etc. Please refer to https://serverless.com/framework/docs/providers/aws/guide/credentials/ for details)

Then, install the dependancies for both the api (the backend) and the frontend.

```bash
cd api
npm i
cd ../frontend
npm i
```

Once this is done, go to the api directory and run sls deploy -v

```bash
sls deploy -v
```
This command (sls is shorthand for serverless) will look into the serverless.yml file that describes the infrastructure needed for the application and will generate and run cloudformation templates to do the deployment. These cloudformation templates will deploy

- an AWS Cognito User Pool to store the users for your application
- an AWS Cognito Identity Pool so that the application can request temporary access tokens to access AWS resources (in our case, the API REST endpoints)
- permissions so that authenticated and unauthenticated users can call the REST api's that they are entitled to call
- a S3 bucket to contain our javascript, html and css code for the frontend
- an API Gateway with some endpoints
- Lambda functions that implement the backend application logic
- a cloudfront cdn distribution

Note that the first time you deploy this setup, deployment might take up to 20-30 minutes. This is because of the initial setup of the cloudfront distribution. Subsequent deploys will go much faster. 

The output of the sls deploy -v command will contain info on the deployment, "Cloudfront domain name" will contain the url for your webapp.

There is no user signup functionality in the application, only signin. You can create your first user via the AWS console. Navigate to your cognito user pool and add the user manually. 

The application itself is a simple note-taking app (thanks www.serverless-stack.com) for inspiration. Requirements are that both authenticated and unauthenticated users can view notes, but only authenticated users can create notes.