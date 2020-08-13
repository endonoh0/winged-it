import React from 'react'
import { useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { motion } from 'framer-motion';
import variants from './animations'
import className from 'classnames';

const SearchWrapper = ({isOpen, buttonHanlder, searchbar}) => {
    let location = useLocation();
    let searchWrapper = className("search_wrapper", {
        "column-rev": location.pathname === '/results'
      });
      
    return(
        <motion.div
        className={searchWrapper}
        animate={isOpen ? "exit" : "enter"}
        variants={variants}
        >
            <Button
                id="btn"
                variant="primary"
                size="lg"
                className="btn btn-primary waves-effect waves-light"
                onClick={buttonHanlder}
            >
                Recipe Search
            </Button>
            {searchbar}
        </motion.div>
    );
};

export default SearchWrapper;