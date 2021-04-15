import DefaultLayout from "layouts/default";
import SetupPageView from "views/setup";
import { SetupProvider } from "hooks/use-setup";

const SetupPage = () => (
  <DefaultLayout>
    <SetupProvider>
      <SetupPageView />
    </SetupProvider>
  </DefaultLayout>
);

export default SetupPage;
