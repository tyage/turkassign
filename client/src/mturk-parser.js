import cheerio from 'cheerio';

const loadXML = xml => cheerio.load(xml, { xmlMode: true });

const recursiveParse = root => {
  if (root.children().length === 0) {
    return root.text();
  } else {
    const data = {};
    root.children().each((i, elem) => {
      const key = elem.tagName;
      const value = recursiveParse(cheerio(elem));
      if (data[key] !== undefined) {
        // duplicated data will be array
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });
    return data;
  }
};

const parseQuestionForm = $ => {
  return recursiveParse($('QuestionForm'));
};

const parseHIT = $ => {
  const data = recursiveParse($('HIT'));
  if (data.Question !== undefined) {
    data.Question = parseQuestionForm(loadXML(data.Question));
  }
  return data;
};

const parseQuestionFormAnswers = $ => {
  return recursiveParse($('QuestionFormAnswers'));
};

const parseAssignment = $ => {
  const data = recursiveParse($('Assignment'));
  if (data.Answer !== undefined) {
    data.Answer = parseQuestionFormAnswers(loadXML(data.Answer));
  }
  return data;
};

const parseGetAssignmentResult = $ => {
  return recursiveParse($('GetAssignmentResult'));
};

export {
  loadXML,
  parseHIT,
  parseAssignment,
  parseGetAssignmentResult
};
