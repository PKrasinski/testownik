import { MONGODB_URI } from '../../../../config.json';
import { getJWT } from '../auth/'

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    tasks: [Number]
})

userSchema.methods.getToResponse = function () {
    return {
        username: this.username,
        tasks: this.tasks,
        token: getJWT(this._id)
    }
}

const User = mongoose.model('User', userSchema);

export function addUser (data, cb) {
    var user = new User(data)

    user.save((err, user) => {
        if(err) { console.log(err); cb(true); }
        else cb(false, user.getToResponse());
    })
}

export function exist({ username }, cb) {
    User.findOne({ username }, (err, user) => {
        console.log(user);
        cb( user ? true : false );
    })
}