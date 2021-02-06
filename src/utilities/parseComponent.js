import React from 'react';
import { RichText, Pagination } from '../components/bodyComponents';

const parseComponent = (component) => {
  switch (component.strapi_component) {
    case "body-components.rich-text":
      return <RichText key={component.id} component={component} />
    // case "body-components.prose-text":
    // case "body-components.gallery":
    case "body-components.pagination":
      return <Pagination key={component.id} component={component} />
    default:
      console.error(`No React component found for Strapi component: ${component.strapi_component}`);
      return null;
  }
}

export default parseComponent;