import React, { useState } from 'react';
import "./ScrollToTop.scss";
import { FaArrowCircleUp } from 'react-icons/fa';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > 400) {
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= 400) {
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop)

  return (
    <FaArrowCircleUp
      onClick={scrollTop}
      className="scrollTop"
      style={{ height: 75, width: 75, display: showScroll ? 'block' : 'none' }}
    />
  );
}

export default ScrollToTop;
