
import Buycoin from "@/components/dashboard-pages/employers-dashboard/buycoin";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Packages || Abroadium - Job Borad ReactJs Template",
  description: "Abroadium - Job Borad ReactJs Template",
};

const BuycoinDBPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Buycoin/>
      
    </>
  );
};

export default BuycoinDBPage
