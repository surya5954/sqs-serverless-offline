import type { AWS } from '@serverless/typescript';

import hello from '@functions/hello';
import queueHandler from '@functions/queueHandler';

// import {queueResource} from './src/resource/queues/serverless'

const serverlessConfiguration: AWS = {
  service: 'sqs-serverless-offline',
  frameworkVersion: '2',
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
    'serverless-offline-sqs':{
        autoCreate: true,
        apiVersion: '2012-11-05',
        endpoint: 'http://0.0.0.0:9324',
        region: 'eu-east-1',
        accessKeyId: 'root',
        secretAccessKey: 'root',
        skipCacheInvalidation: false,
    }
  },
  plugins: ['serverless-esbuild', 'serverless-offline', 'serverless-offline-sqs'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { hello, queueHandler },
  resources:{
      Resources:{
        DemoQueue:{
            Type: 'AWS::SQS::Queue',
            Properties:{
                QueueName: 'demo-queue',
                VisibilityTimeout: 60,
                MessageRetentionPeriod: 345600,
            }
        }
      }
  }
};

module.exports = serverlessConfiguration;
