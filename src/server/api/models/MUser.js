import { MONGODB_URI } from '../../../../config.json';
import { getJWT, getId } from '../auth/'

const mongoose = require('mongoose');
mongoose.connect(MONGODB_URI);

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    questions: [],
    stats: {
        type: Object,
        default: {
            correct: 0,
            wrong: 0
        }
    },
    settings: {
        type: Object,
        default: {
            multiplyAfterMistake: 3
        }
    }
})

userSchema.methods.getToResponse = function () {
    return {
        username: this.username,
        questions: this.questions,
        stats: this.stats,
        settings: this.settings,
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
        cb( user ? true : false );
    })
}

export function getUser({ username, id, token }, cb) {
    if(username)
        User.findOne({ username }, (err, user) => {
            if(err) cb(true)
            else cb(false, user);
        })
    else if(id)
        User.findById(id, (err, user) => {
            if (err) cb(true)
            else cb(false, user);
        })
    else if(token)
        User.findById(getId(token), (err, user) => {
            if (err) cb(true)
            else cb(false, user);
        })
}