const notFound = (req, res , next)=> {
    res.status(200).send("Router doesn't exist");

    next();
}

export default notFound;