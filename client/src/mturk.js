import crypto from 'crypto';
import { loadXML } from './mturk-parser';

const generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

const apiEndpoint = 'https://mechanicalturk.sandbox.amazonaws.com';
const apiVersion = '2014-08-15';
const apiService = 'AWSMechanicalTurkRequester';

class MTurk {
  constructor(apiParams) {
    if (!awsAccessKeyId || !awsSecretAccessKey) {
      console.error('set awsAccessKeyId and awsSecretAccessKey');
    }

    this.api = Object.assign({
      endpoint: apiEndpoint,
      version: apiVersion,
      serviceName: apiService
    }, apiParams);
  }

  request(params) {
    params = Object.assign({
      Service: this.api.serviceName,
      AWSAccessKeyId: this.api.awsAccessKeyId,
      Version: this.api.version,
      Timestamp: (new Date()).toISOString()
    }, params);
    params.Signature = generateHmac(`${params.Service}${params.Operation}${params.Timestamp}`,
      this.api.awsSecretAccessKey);
    const param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${this.api.endpoint}/?${param}`, {})
      .then(res => res.text())
      .then(text => {
        console.log(text); // TODO: use general logger
        return loadXML(text);
      });
  }

  createHIT(params) {
    return this.request(Object.assign({
      Operation: 'CreateHIT'
    }, params));
  }

  getHIT(hitId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetHIT',
      HITId: hitId
    }, params));
  }

  getAssignment(assignmentId, params = {}) {
    return this.request(Object.assign({
      Operation: 'GetAssignment',
      AssignmentId: assignmentId
    }, params));
  }

  generateQuestionXML(content, frameHeight = 450) {
    return `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[ ${content} ]]></HTMLContent>
  <FrameHeight>${frameHeight}</FrameHeight>
</HTMLQuestion>
`
  }
};

export default MTurk;
