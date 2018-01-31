import { addUser, exist } from '../models/MUser'
import Joi from 'joi'

const USER_SCHEMA = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().required(),
    repeat_password: Joi.string().valid(Joi.ref('password')).required()
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