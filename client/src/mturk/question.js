import Config from '../config';

const defaultQuestion = (algorithm, taskSetId) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title></title>
  <link rel="stylesheet" href="${Config.get('taskPoolerAddress')}/static/css/app.css" />
</head>
<body>
  <div id="content"></div>
  <script>
window.taskPoolerAddress = "${Config.get('taskPoolerAddress')}";
window.taskSetId = "${taskSetId}";
  </script>
  <script src="${Config.get('taskPoolerAddress')}/static/js/app.js"></script>
  <script src="${Config.get('taskPoolerAddress')}/algorithm/${taskSetId}.js"></script>
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
