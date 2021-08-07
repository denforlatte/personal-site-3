import React from 'react';

const richTextToProse = (richText) => {
  let text = richText
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
    .replace(/\*(.*)\*/gim, '<i>$1</i>')
    .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
    .replace(/\[(.*?)\]\((.*?)\)/gim, "<a target=\"_blank\" href='$2'>$1</a>");

  const paragraphs = text.split('\n');
  const pTags = paragraphs.map((p, i) => {
    if (p.length > 0)
      return <p key={i} dangerouslySetInnerHTML={{__html: p}}></p>;
    else
      return null;
  });

  return <>{pTags}</>;
}

export default richTextToProse;
