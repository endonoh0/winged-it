import React from 'react';

import { BsArrowLeft, BsArrowUpRight, BsArrowRight, BsArrowUp, BsArrowDownRight, BsArrowUpLeft } from 'react-icons/bs';
import { FaFlagCheckered } from 'react-icons/fa';

const getDirections = (instructions) => {
  let words = instructions.split(' ');

  for (const word of words) {
    switch (word.replace(/,/g, "")) {
      case 'left':
        return (
          <BsArrowLeft size={20} />
        );
        break;
      case 'northeast':
        return (
          <BsArrowUpRight size={20} />
        );
        break;
      case 'southeast':
        return (
          <BsArrowDownRight size={20} />
        )
        break;
      case 'northwest':
        return (
          <BsArrowUpLeft size={20} />
        )
      case 'destination':
        return (
          <FaFlagCheckered size={20} />
        );
        break;
      case 'right':
        return (
          <BsArrowRight size={20} />
        );
        break;
      case 'straight':
        return (
          <BsArrowUp size={20} />
        );
    }
  }
}
export default getDirections;
