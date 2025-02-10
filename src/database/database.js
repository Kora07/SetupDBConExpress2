const {connect} = require("mongoose");

const connectDatabase = async(url) => {
    try {
        await connect(url);
        console.log("Connected to database")
    }
    catch(error) {
        console.log("Error connecting to database")
    }
}

module.exports = connectDatabase;