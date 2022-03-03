import { User } from './../entities/User';
import { Request, Response } from "express"
import { tokenGenerator } from "../uteis/tokenGenerator"

export const updateXP = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization
        const xp = req.body.xp

        //VERIFICAÇÕES
        if (!token) {
            res.status(422)
            throw new Error("Token de autorização não enviado.")
        }


        //verifica se xp existe, se não joga erro
        if (!xp) {
            res.status(422)
            throw new Error("Pârametro faltando. Verifique se 'xp' está preenchido.")
        }

        //verifica se xp é um number
        if (typeof xp !== "number") {
            res.status(422)
            throw new Error("Verifique se 'xp' é um número.")
        }
        //verifica token e retorna info do usuário
        const checkToken = tokenGenerator.verifyToken(token)

        await User.updateXP(checkToken.id, xp)

        res.status(200).send("XP atualizado.")

    } catch (error: any) {
        res.send(error.message)
    }
}