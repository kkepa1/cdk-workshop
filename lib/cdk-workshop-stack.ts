import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import {HitCounter} from "./hitcounter";
import {TableViewer} from "cdk-dynamo-table-viewer";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Lambda
    const hello = new lambda.Function(this, 'HelloHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'hello.handler'
    });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // API Gateway
    new apigw.LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

    // TableViewer
    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table,
      sortBy: '-hits'
    })
  }
}
