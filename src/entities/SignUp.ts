import { User } from './User';

export class SignUp extends User {
    static async createUser(id: string, name: string, nickname: string, birth_date: string, email: string, password: string, role: string) {
        try {
            const dateSplit = birth_date.split("/")
            const newBirthDate = `${dateSplit[2]}-${dateSplit[1]}-${dateSplit[0]}`

            await SignUp.connection("jokenplay_users")
                .insert({
                    id,
                    name,
                    nickname,
                    birth_date: newBirthDate,
                    email,
                    password,
                    role
                })
                .then(() => this.createConnection(id))

        } catch (error: any) {
            throw new Error(error.sql || error.message)
        }
    }

    static async createConnection(id_user: string) {
        try {
            await SignUp.connection("jokenplay_connections")
                .insert({
                    id: id_user + "connection",
                    id_user
                })

        } catch (error: any) {
            throw new Error(error.sql || error.message)
        }
    }
}