#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStack } from '../lib/cdk-workshop-stack';
import {WorkshopPipelineStack} from "../lib/pipeline-stack";
import {HdiWorkshopStack} from "../lib/hdi-workshop-stack";

const app = new cdk.App();
// new CdkWorkshopStack(app, 'CdkWorkshopStack');
// new WorkshopPipelineStack(app, 'CdkWorkshopPipelineStack');
new HdiWorkshopStack(app, 'HdiWorkshopStack');
