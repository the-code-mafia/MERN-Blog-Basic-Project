const mongoose = require('mongoose');

const dbUrl = process.env.DB_URL || 'mongodb://localhost/blog'

const connect = async () => {
    try {
        const response = await mongoose.connect(dbUrl); 
        console.log({
            msg: 'DB Connected',
            db_name: 'blog'
        });
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = connect;