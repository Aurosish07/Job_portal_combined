const employer = async (req, resp) => {

    console.log("Employer Route hits");

    resp.json({ user: req.user });


}

export default employer;