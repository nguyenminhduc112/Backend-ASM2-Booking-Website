const User = require("../models/user")

exports.getUser = async (req, res, next) => {
    try {
        const email = req.params.email
        const user = await User.findOne({ email: email })
        const data = {
            fullName: user.fullName,
            email: user.email,
            phone: user.phoneNumber,
        }
        res.status(200).send(data)
    } catch (error) {
        res.status(404).send(error)
    }
}