import {client as workflowClient} from '@upstash/workflow';
import {QSTASH_URL, QSTASH_TOKEN} from '../config/env.js';


export const workflow = workflowClient({url: QSTASH_URL, token: QSTASH_TOKEN});