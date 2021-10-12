import type {AWS} from '@serverless/typescript';


export const queueResource: AWS['resources']['Resources'] = {
    DemoQueue:{
        Type: 'AWS::SQS::Queue',
        Properties:{
            QueueName: 'demo-queue',
            VisibilityTimeout: 60,
            MessageRetentionPeriod: 345600,
        }
    }
}