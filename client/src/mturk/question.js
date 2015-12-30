import Config from '../config';

const defaultQuestion = (taskSetId) => {
  const taskPoolerAddress = Config.get('taskPoolerAddress');
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="${taskPoolerAddress}/static/css/app.css" />
</head>
<body>
  <div id="content"></div>

  <script src="https://s3.amazonaws.com/mturk-public/externalHIT_v1.js"></script>
  <script>
window.finishTaskAssginment = function() {
  turkSetAssignmentID();

  document.getElementById('mturk_form').addEventListener('submit', function() {
    finishTask();
  });
};
  </script>

  <script>
window.taskPoolerAddress = "${taskPoolerAddress}";
window.taskSetId = "${taskSetId}";
  </script>
  <script src="${taskPoolerAddress}/static/js/app.js"></script>
  <script src="${taskPoolerAddress}/algorithm/${taskSetId}.js"></script>
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
`
};

export { defaultQuestion, generateQuestionXML };
