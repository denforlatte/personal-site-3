const parseComponent = (component) => {
  switch (component.strapi_component) {
    case "body-components.pagination":
      return null;
    case "body-components.prose-text":
      return null;
    default:
      console.error(`No React component found for Strapi component: ${component.strapi_component}`);
      return null;
  }
}

export default parseComponent;