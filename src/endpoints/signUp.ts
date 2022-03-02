import { validateDate } from './../uteis/validateDate';
import { verificateBirthDate } from '../uteis/verificateBirthDate';
import { validateEmail } from './../uteis/validateEmail';
import { tokenGenerator } from './../uteis/tokenGenerator';
import { SignUp } from './../entities/SignUp';
import { idGenerator } from './../uteis/idGenerator';
import { Request, Response } from "express";
import { User } from '../entities/User';
import { HashManager } from '../uteis/HashManager';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, nickname, birth_date, email, password } = req.body
        const role = req.body.role as string || "NORMAL"
        const id = idGenerator()

        //VERIFICAÇÕES
        if (!id || !name || !email || !password || !nickname) {
            res.status(422)
            throw new Error("Pârametros faltando. Verifique se 'name' 'nickname' 'birth_date' 'email' 'password' estão preenchidos.")
        }

        //se nickname tiver mais de 15 caracteres jogar erro
        if (nickname.length > 15) {
            res.status(422)
            throw new Error("Nickname deve ter no máximo 15 caracteres")
        }

        //se data estiver no formato errado jogar erro
        if (validateDate(birth_date) === false) {
            res.status(422)
            throw new Error("'birth_date' inválido. A data deve estar no padrão DD/MM/YYYY .")
        }

        //se a data for maior que a atual então 
        if (verificateBirthDate(birth_date) === false) {
            res.status(422)
            throw new Error("Data inválida. Coloque uma data que seja menor que a atual.")
        }

        //se o email não estiver no formato jogar erro
        if (validateEmail(email) === false) {
            res.status(422)
            throw new Error("Email inválido. Precisa estar no padrão string@string.string .")
        }

        //se a senha tiver menos de 8 caracteres jogar erro
        if (password.length < 8) {
            res.status(422)
            throw new Error("A senha deve ter no min. 8 caracteres.")
        }

        //se o role for diferente de ADMIN e NORMAL jogar erro
        if (role !== "ADMIN" && role !== "NORMAL") {
            res.status(422)
            throw new Error("Valor de 'role' inválido. Valores aceitos: ADMIN | NORMAL.")
        }

        // checa se já existe 
        const checkUser = await User.getUser(email)

        //se existe jogar erro
        if (checkUser.length) {
            res.status(409)
            throw new Error("Esse email já está sendo usado. Faça login ou redefina sua senha.")
        }

        //criptografar senha
        const cipherPassword = HashManager.generator(password)

        //enviar para a tabela
        await SignUp.createUser(id, name, nickname, birth_date, email, cipherPassword, role)

        //gerar token
        const token = tokenGenerator.generate({ id, email, role })

        //sucesso
        res.status(201).send({
            message: "Usuário criado com sucesso.",
            token
        })

    } catch (error: any) {
        res.send(error.sql || error.message)
    }
}