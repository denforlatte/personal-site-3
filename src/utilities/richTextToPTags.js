import React, { createElement } from 'react';
const richTextToProse = (richText) => {
  const paragraphs = richText.split('\n');
  const pTags = paragraphs.map((p, i) => {
    if (p.length > 0)
      return createElement('p', {key: i}, p)
    else
      return null;
  });

  return <>{pTags}</>;
}

export default richTextToProse;
