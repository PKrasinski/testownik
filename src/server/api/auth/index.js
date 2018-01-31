import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config.json'

export function getJWT (id) {
    return jwt.sign({ id }, SECRET_KEY);
}

export function getId(token) {
    return jwt.verify(token, SECRET_KEY).id;
}