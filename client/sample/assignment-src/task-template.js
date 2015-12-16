import _ from 'lodash';

const imageTemplate = (image) => `
<div>
  <img src="${image.url}">
  <input type="radio" name="result.${image.id}"> 1-9
  <input type="radio" name="result.${image.id}"> 10-19
  <input type="radio" name="result.${image.id}"> 20-29
  <input type="radio" name="result.${image.id}"> 30-39
  <input type="radio" name="result.${image.id}"> 40-49
  <input type="radio" name="result.${image.id}"> 50-59
  <input type="radio" name="result.${image.id}"> 60-
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
  <form>
    ${ _.each(images, (image) => imageTemplate(image)).join('') }

    <input type="submit">
  </form>
</div>
`;

export default taskTemplate;
