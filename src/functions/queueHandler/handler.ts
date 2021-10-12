import {SQSEvent} from 'aws-lambda';
import { middyfy } from '@libs/lambda';
// import { formatJSONResponse } from '@libs/apiGateway';

const queueHandler = async (event: SQSEvent) => {
    console.log(`Processing data from queue with records ${JSON.stringify(event.Records)}`)
  }


export const main = middyfy(queueHandler);