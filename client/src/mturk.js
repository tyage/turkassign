import Config from './config';
import crypto from 'crypto';
import fetch from 'node-fetch';
import { loadXML } from './mturk-parser';

const generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

class MTurk {
  constructor(awsAccessKeyId, awsSecretAccessKey) {
    if (!awsAccessKeyId || !awsSecretAccessKey) {
      console.error('set awsAccessKeyId and awsSecretAccessKey');
    }

    this.awsAccessKeyId = awsAccessKeyId;
    this.awsSecretAccessKey = awsSecretAccessKey;
  }

  request(params) {
    params = Object.assign({
      Service: 'AWSMechanicalTurkRequester',
      AWSAccessKeyId: this.awsAccessKeyId,
      Version: '2014-08-15',
      Timestamp: (new Date()).toISOString()
    }, params);
    params.Signature = generateHmac(`${params.Service}${params.Operation}${params.Timestamp}`,
      this.awsSecretAccessKey);
    const param = Object.keys(params).map((k) => `${k}=${encodeURIComponent(params[k])}`).join('&');

    return fetch(`${Config.get('apiEndpoint')}/?${param}`, {})
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
