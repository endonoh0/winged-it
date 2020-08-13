const variants = {
    enter: {
        transitionEnd: {
            display: "flex",},
        opacity: 1,
        transition: { duration: .5 },
    },
    exit: { opacity: 0,
        transitionEnd: {
        display: "none",}
    },

    slideExit: {
        x:300,
        opacity: 0,
    },

    slideEnter: {
        x:0,
        opacity: 1,
    }
}

export default variants;