import { Request, Response } from "express"
import { User } from "../entities/User"
import { tokenGenerator } from "../uteis/tokenGenerator"

export const getRanking = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization

        //VERIFICAÇÕES
        if (!token) {
            res.status(422)
            throw new Error("Token de autorização não enviado.")
        }

        //verifica token e retorna info do usuário
        tokenGenerator.verifyToken(token)

        const rankingUsers = await User.getUser("%")

        res.status(200).send(rankingUsers)

    } catch (error: any) {
        res.send(error.message)
    }
}