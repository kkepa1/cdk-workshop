import {RemovalPolicy} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import {Construct} from 'constructs';

export interface HitCounterProps {
    downstream: lambda.IFunction
}

export class HitCounter extends Construct {
    public readonly handler: lambda.Function;
    public readonly table: dynamodb.Table;

    constructor(scope: Construct, id: string, props: HitCounterProps) {
        super(scope, id);

        this.table = new dynamodb.Table(this, 'Hits', {
            partitionKey: {
                name: 'path',
                type: dynamodb.AttributeType.STRING,
            },
            removalPolicy: RemovalPolicy.DESTROY
        });


        this.handler = new lambda.Function(this, 'HitCounterHandler', {
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: 'hitcounter.handler',
            code: lambda.Code.fromAsset('lambda'),
            environment: {
                DOWNSTREAM_FUNCTION_NAME: props.downstream.functionName,
                HITS_TABLE_NAME: this.table.tableName
            }
        })
        this.table.grantReadWriteData(this.handler);
        props.downstream.grantInvoke(this.handler);
    }
}
