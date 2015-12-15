import https from 'https';
import crypto from 'crypto';
import { loadXML } from './parser';

const generateHmac = (data, key) => {
  return crypto.createHmac('sha1', key).update(data).digest('base64');
};

const fetch = options => {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', function(e) {
      console.error(e);
      reject(e);
    });

    req.end();
  });
};

const apiEndpoint = 'mechanicalturk.sandbox.amazonaws.com';
const apiVersion = '2014-08-15';
const apiService = 'AWSMechanicalTurkRequester';

class API {
  constructor(apiParams) {
    if (!apiParams.awsAccessKeyId || !apiParams.awsSecretAccessKey) {
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
    const options = {
      hostname: this.api.endpoint,
      port: 443,
      path: `/?{param}`,
      method: 'GET'
    };

    return fetch(options).then(text => {
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
};

export default API;
