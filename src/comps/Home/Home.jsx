import React from 'react';

import BottomSection from "./BottomSection/BottomSection";
import MainSection from './MainSection/MainSection';
import Footer from './Footer/Footer';

//This is the root page "/"
const Home = () => {

  return (
    <div>
      <MainSection />
      <BottomSection />
      <Footer />
    </div>
  );
}

export default Home;
