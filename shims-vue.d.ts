declare module "*.vue" {
  import { DefineComponent } from "vue";

  const component: DefineComponent<
    {
      [key: string]: unknown; // Use unknown instead of any
    },
    {
      [key: string]: unknown; // Use unknown instead of any
    },
    unknown
  >; // Use unknown instead of any

  export default component;
}
