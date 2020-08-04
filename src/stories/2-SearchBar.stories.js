import React from 'react';
import { action } from '@storybook/addon-actions';
import SearchBar from '../comps/SearchByIngredient/SearchBar'

export default {
  title: 'SearchBar',
  component: SearchBar,
};

export const Bar = () => <SearchBar onKeyUp={action("Pressed")}/>;
