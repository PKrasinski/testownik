import { addUser, exist, getUser } from '../models/MUser'
import Joi from 'joi'
import md5 from 'md5'

const USER_SCHEMA = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
    repeat_password: Joi.string().valid(Joi.ref('password')).required(),
    questions: Joi.array()
})

export function CREATE_USER (req, res) {
    const userData = req.body;
    
    USER_SCHEMA.validate(userData, err => {
        if(err) {
            res.status(400).json(err);
            return;
        }
        exist(userData, result => {
            if(result) {
                res.status(400).json({ error: 'A user with this name already exists' });
                return;
            }
            userData.password = md5(userData.password);
            addUser(userData, (err, user) => {
                if (err) {
                    res.status(400).json({ error: 'Error of writing data to the database' });
                    return;
                }
                res.status(201).json(user);
            })
        })
    })
}

export function AUTH_USER(req, res) {
    const userData = req.body;
    if(userData.password)
        userData.password = md5(userData.password)
    getUser(userData, (err, user) => {
        if (err) {
            res.status(400).json({ error: 'User don\'t exist' });
            return;
        }
        if(userData.token)
            res.status(200).json(user.getToResponse());
        else if (userData.password == user.password)
            res.status(200).json(user.getToResponse());
        else
            res.status(400).json({ error: 'Bad password' });
    })
}

export function UPDATE_USER(req, res) {
    const userData = req.body;

    getUser({token: userData.token}, (err, user) => {
        if (err) {
            res.status(400).json({ error: 'User don\'t exist' });
            return;
        }
        if (user) {
            user.set({
                settings: userData.settings,
                stats: userData.stats,
                questions: userData.questions
            })
            user.save(function (err, user) {
                if(err)
                    res.status(400).json({error: 'Database error'});
                else 
                    res.status(200).send();
            })
        }
    })
}