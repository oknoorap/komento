import { NextSeo } from "next-seo";

import DefaultLayout from "layouts/default";
import SetupPageView from "views/setup";
import { SetupProvider } from "hooks/use-setup";

const SetupPage = () => (
  <>
    <NextSeo
      title="Setup Script"
      titleTemplate="%s - Komento"
      description="Add komento script to website."
    />
    <DefaultLayout>
      <SetupProvider>
        <SetupPageView />
      </SetupProvider>
    </DefaultLayout>
  </>
);

export default SetupPage;
