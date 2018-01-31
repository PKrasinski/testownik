import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../../../config.json'

export function getJWT (id) {
    return jwt.sign({ id }, SECRET_KEY);
}