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

        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}