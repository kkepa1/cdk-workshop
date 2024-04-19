import {BlockPublicAccess, Bucket, BucketAccessControl, BucketEncryption, BucketProps} from 'aws-cdk-lib/aws-s3';
import {Construct} from 'constructs';
import {Key} from "aws-cdk-lib/aws-kms";
import {RemovalPolicy} from "aws-cdk-lib";

export class SecureBucket extends Construct {
    public bucket: Bucket;

    constructor(scope: Construct, id: string, props: BucketProps) {
        super(scope, id);

        let secureProps: BucketProps = {
            ...props,
            // Force encryption to use a Custom Managed Key
            encryption: props && props.encryption
                ? props.encryption
                : BucketEncryption.KMS,
            // Create the Encryption Key (when not given) on the fly, with Rotation enabled
            encryptionKey: props.encryptionKey ?? new Key(this, `${id}-key`, { enableKeyRotation: true }),
            bucketKeyEnabled: props.bucketKeyEnabled ?? true,
            versioned: props.versioned ?? true,
            enforceSSL: props.enforceSSL ?? true,
            blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
            removalPolicy: RemovalPolicy.RETAIN
        }

        this.bucket = new Bucket(this, `${id}-bucket`, secureProps);
    }
}
