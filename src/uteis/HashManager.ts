import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

export class HashManager {
    static generator(plainText: string): string {
        const rounds = Number(process.env.HASH_COST)
        const salt = genSaltSync(rounds)

        return hashSync(plainText, salt)
    }

    static compare(plainText: string, hash: string): boolean {
        return compareSync(plainText, hash)
    }
}