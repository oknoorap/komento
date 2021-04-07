/// <reference types="next" />
/// <reference types="next/types/global" />

declare module "*.doc.md" {
  const content: string;
  export default content;
}
