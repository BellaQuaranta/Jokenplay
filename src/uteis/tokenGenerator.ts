import { Authenticator } from './../interface/Authenticator';
import * as jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export class tokenGenerator {
    static generate(input: Authenticator): string {
        const token = jwt.sign(input, process.env.JWT_KEY as string, {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as string
        })

        return token
    }

    static verifyToken(token: string): Authenticator {
        return jwt.verify(token, process.env.JWT_KEY as string) as Authenticator
    }
}