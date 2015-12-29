import _ from 'lodash';

const imageTemplate = (image) => `
<div>
  <img src="${image.url}">
  <input type="text" name="result.${image.id}">
</div>
`;

const taskTemplate = (images) => `
<div>
  <ul>
    <ol>Please estimate the age of the photo.</ol>
    <ol></ol>
  </ul>
</div>
<div>
  <form name="mturk_form" id="mturk_form">
    <input type="hidden" name="assignmentId" id="assignmentId">

    ${ _.map(images, (image) => imageTemplate(image)).join('') }

    <input type="submit" id="submitButton">
  </form>
</div>
`;

export default taskTemplate;
