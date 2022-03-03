import { tokenGenerator } from './../uteis/tokenGenerator';
import { Request, Response } from "express"
import { User } from "../entities/User"
import { HashManager } from "../uteis/HashManager"

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        //VERIFICAÇÕES
        if (!email || !password) {
            res.status(422)
            throw new Error("Pârametros faltando. Verifique se 'email' 'password' estão preenchidos.")
        }

        //verifica se o email existe 
        const [checkUser] = await User.getUser(email)

        //se não existir jogar erro
        if (!checkUser) {
            res.status(404)
            throw new Error("Usuário ou email incorretos.")
        }

        //verifica se a senha está certa
        const checkPassword = HashManager.compare(password, checkUser.password)

        //se não estiver jogar erro
        if (!checkPassword) {
            res.status(404)
            throw new Error("Usuário ou email incorretos.")
        }

        //gera token
        const token = tokenGenerator.generate({ id: checkUser.id, email: checkUser.email, role: checkUser.role })

        //sucesso
        res.status(200).send({
            message: "Usuário logado com sucesso.",
            token
        })

    } catch (error: any) {
        res.send(error.message)
    }
}