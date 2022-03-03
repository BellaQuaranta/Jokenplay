import { User } from './../entities/User';
import { tokenGenerator } from './../uteis/tokenGenerator';
import { Request, Response } from "express"

export const getProfile = async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization

        //VERIFICAÇÕES
        if (!token) {
            res.status(422)
            throw new Error("Token de autorização não enviado.")
        }

        //verifica token e retorna info do usuário
        const checkToken = tokenGenerator.verifyToken(token)

        //pega o usuário
        const [checkUser] = await User.getUser(checkToken.email)

        //sucesso
        res.status(200).send({
            id: checkUser.id,
            name: checkUser.name,
            nickname: checkUser.nickname,
            birth_date: checkUser.birth_date,
            email: checkUser.email,
            xp: checkUser.xp,
            role: checkUser.role
        })

    } catch (error: any) {
        res.send(error.message)
    }
}