import React from 'react';
import { RichText, Pagination, Gallery, ProseText } from '../components/bodyComponents';

const parseComponent = (component, location) => {
  switch (component.strapi_component) {
    case "body-components.rich-text":
      return <RichText key={component.id} component={component} />
    case "body-components.prose-text":
      return <ProseText key={component.id} component={component} />
    case "body-components.gallery":
      return <Gallery  key={component.id} component={component} />
    case "body-components.pagination":
      return <Pagination key={component.id} component={component} location={location}/>
    default:
      console.error(`No React component found for Strapi component: ${component.strapi_component}`);
      return null;
  }
}

export default parseComponent;