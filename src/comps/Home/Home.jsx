import React from 'react';


import BottomSection from "./BottomSection/BottomSection";
// import NavbarTop from "./NavbarTop/NavbarTop";
import MainSection from './MainSection/MainSection';
import Footer from './Footer/Footer';

const Home = () => {

  return (
    <div>
      {/* <NavbarTop /> */}
      <MainSection />
      <BottomSection />
      <Footer />
    </div>
  );
}

export default Home;
