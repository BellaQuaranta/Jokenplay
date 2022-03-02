import { BaseDataBase } from './../data/BaseDataBase';
export class User extends BaseDataBase {
    constructor(protected email: string, protected password: string) {
        super()
    }

    static async getUser(email: string) {
        try {
            return await User.connection("jokenplay_users")
                .where({ email })
        } catch (error: any) {
            throw new Error(error.sql || error.message)
        }
    }
}