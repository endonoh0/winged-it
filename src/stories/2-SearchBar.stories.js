import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchBar from '../comps/SearchByIngredient/SearchBar'
import Submit from '../comps/SearchByIngredient/Submit'

export default {
  title: 'SearchBar',
  component: SearchBar,
};

export const Bar = () => <SearchBar onKeyUp={action("Pressed")}/>;

export const Button = () => {
  return(
    <Submit onClick={action("Submitted")}/>
  )
}

