import React from "react";

import Home from "@/components/home-5";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-5 || sentryspot - Job Borad ReactJs Template",
  description: "sentryspot - Job Borad ReactJs Template",
};

const HomePage5 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage5;
