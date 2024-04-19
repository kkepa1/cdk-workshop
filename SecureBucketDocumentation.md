# SecureBucket Construct

## Description
The `SecureBucket` class is a custom AWS Cloud Development Kit (CDK) construct used to create an S3 bucket with enhanced security features.

## Usage
```typescript
import { SecureBucket } from './path/to/secure-bucket';
import { RemovalPolicy } from 'aws-cdk-lib';

const secureBucket = new SecureBucket(stack, 'MySecureBucket', {
    // BucketProps object with optional parameters
});
```

## Features

- **Encryption**:
    - By default, encryption is enforced using a Custom Managed Key (KMS).
    - The encryption key is automatically created on-the-fly if not provided, with key rotation enabled.
    - Bucket key encryption is enabled by default (`bucketKeyEnabled: true`). This feature enhances data security by encrypting the keys used to store objects in the bucket.

- **Block Public Access**:
    - Public access to the bucket and its objects is blocked using `BlockPublicAccess.BLOCK_ALL`.

- **Versioning**:
    - Versioning is enabled for the bucket (`versioned: true`).

- **SSL Enforcement**:
    - SSL (Secure Sockets Layer) is enforced for all requests (`enforceSSL: true`).

- **Deletion Policy**:
    - When the stack is deleted, the S3 bucket is retained in the AWS account but orphaned from the stack (`removalPolicy: RemovalPolicy.RETAIN`).

