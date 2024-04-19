import {Stack, StackProps} from 'aws-cdk-lib';
import {Construct} from 'constructs';
import {SecureBucket} from "./secure-bucket";

export class HdiWorkshopStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const secureBucket = new SecureBucket(this, 'secured-s3', {
            bucketName: 'secured-s3'
        });
    }
}
