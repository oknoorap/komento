/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.svg?sprite" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare module "*.doc.md" {
  const content: string;
  export default content;
}
