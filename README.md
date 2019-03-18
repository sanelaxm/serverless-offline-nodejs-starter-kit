# Serverless Offline Node.js Starter Kit

A Serverless starter kit with a node.js runtime that supports serverless offline, environment variables, function warmup (optimized cold starts), ES7 syntax, linting, authorizers, and RESTful endpoint support. Built with AWS in mind. 

> This repo uses the [serverless framework](https://serverless.com/), an open source toolkit for deploying and operating serverless architectures.
This starter kit is assuming the use of AWS Lambda to run event-driven compute services. 
Additional documentation is available at [https://serverless.com/framework/docs/providers/aws/guide/intro/](https://serverless.com/framework/docs/providers/aws/guide/intro/).

### Prerequisites 
1. [Install the Serverless Framework](https://serverless.com/framework/docs/providers/aws/guide/quick-start/)
2. [Install and configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)

### Installation

This requires [Node.js](https://nodejs.org/) v8+ to run.

Install the dependencies and start the server.

```bash
npm install 
npm start
```

##### Testing the example endpoint

Open your terminal and paste in the following:

```bash
curl -X POST \
  http://localhost:3000/api/v1/handler \
  -H 'Authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6MTIzLCJuYW1lIjoiSm9uIERvZSIsInJvbGUiOiJVU0VSIn19.aNR5NIfzYQ5SJTlO4Pxef87V0dpc2TU8Z4mle_smM9Q' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{	
	"name": "Test"
}'
```

#### Deployment (Command Line)

```sh
serverless deploy --stage $STAGE_NAME
```

##### When Deploying

If your functions are being deployed to a VPC, in order for warmUp to properly work:
1. Go to https://console.aws.amazon.com/lambda.
2. Add VPCs that allow outgoing internet access to the warmup function.  

If this is not done, your functions will not stay warm! 

### To lint files
```bash
npm run lint:fix
```

### Todos
 - Support unit tests
 - Environment configuration support
