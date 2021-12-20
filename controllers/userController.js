const register = (req, res) => {
    res.json(req.body);
};

const login = (req, res) => {
    res.json('login');
};

module.exports = {
    register,
    login
}