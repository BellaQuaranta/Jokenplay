import { BaseDataBase } from './../data/BaseDataBase';
export class User extends BaseDataBase {
    constructor(protected email: string, protected password: string) {
        super()
    }

    static async getUser(email: string) {
        try {
            return await User.connection("jokenplay_users")
                .where("email", "LIKE", `%${email}%`)
                .orderBy("xp", "desc")

        } catch (error: any) {
            throw new Error(error.sql || error.message)
        }
    }

    static async getFeed() {
        try {
            return await User.connection("jokenplay_connections")
                .select("jokenplay_connections.id", "jokenplay_connections.id_user", "jokenplay_users.nickname", "jokenplay_users.xp", "jokenplay_connections.status")
                .join("jokenplay_users", "jokenplay_connections.id_user", "jokenplay_users.id")
                .where("status", "online")
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async updateXP(id: string, xp: number) {
        try {
            return await User.connection("jokenplay_users")
                .update({xp})
                .where({ id })

        } catch (error: any) {
            throw new Error(error.sql || error.message)
        }
    }

}