import React, { createElement } from 'react';
const richTextToProse = (richText) => {
  const sections = richText.split('\n\n');

  const htmlContent = sections.map((section, i) => addPTags(section, i));

  return <article>{htmlContent}</article>;
}

const addPTags = (section, i) => {
    const paragraphs = section.split('\n');
    const pTags = paragraphs.map((p, i) => createElement('p', {key: i}, p));

    const htmlSection = createElement('section', {key: i, className: 'prose-section'}, pTags);
    return htmlSection;
  }

export default richTextToProse;
