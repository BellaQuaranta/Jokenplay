import { Request, Response } from "express"
import { User } from "../entities/User"
import { tokenGenerator } from "../uteis/tokenGenerator"

export const getFeed = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization

        //VERIFICAÇÕES
        if (!token) {
            res.status(422)
            throw new Error("Token de autorização não enviado.")
        }

        //verifica token e retorna info do usuário
        tokenGenerator.verifyToken(token)

        //pega os usuarios online
        const feed = await User.getFeed()

        //se não houver usuários online jogar erro
        if (!feed.length) {
            res.status(404)
            throw new Error("Sem usuários online.")
        }

        //sucesso
        res.status(200).send(feed)
    } catch (error: any) {
        res.send(error.message)
    }
}