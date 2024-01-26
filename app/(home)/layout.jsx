/* eslint-disable react/no-children-prop */
import { HomeLayout } from "../../components/layout/HomeLayout";

export default async function HomePageLayout({ children }) {

  return (
    <>
      <HomeLayout children={children} />
    </>
  );
}
