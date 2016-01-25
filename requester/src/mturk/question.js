import config from '../config';

const questionTemplate = (taskGroupId, assignmentProgramUrl) => {
  const taskPoolerAddress = config.get('taskPoolerAddress');
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
</head>
<body>
  <div id="content"></div>

  <script src="https://s3.amazonaws.com/mturk-public/externalHIT_v1.js"></script>
  <script>
window.taskPoolerAddress = "${taskPoolerAddress}";
window.taskGroupId = "${taskGroupId}";
window.platformType = 'MTurk';
  </script>
  <script src="${assignmentProgramUrl}"></script>
</body>
</html>
`;
};

const generateQuestionXML = (content, frameHeight = 450) => {
  return `
<HTMLQuestion xmlns="http://mechanicalturk.amazonaws.com/AWSMechanicalTurkDataSchemas/2011-11-11/HTMLQuestion.xsd">
  <HTMLContent><![CDATA[ ${content} ]]></HTMLContent>
  <FrameHeight>${frameHeight}</FrameHeight>
</HTMLQuestion>
`;
};

export { questionTemplate, generateQuestionXML };
