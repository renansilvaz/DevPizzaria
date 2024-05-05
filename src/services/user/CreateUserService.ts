import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserRequest{
    name: String;
    email: string;
    password: string;
}

class CreateUserServices{
    async execute({name, email, password}: UserRequest){
        
        // verificar se ele enviou o email
        if(!email)
            throw new Error("Email incorrect")

        // Verificar se o email ja esta cadastrado
        const userAlreadyExist = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(userAlreadyExist){
            throw new Error("User already exists")
        }

        const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.create({
            data:{
                name: name,
                email: email,
                password: passwordHash,
            },
            select:{
                id: true,
                name: true,
                email: true,
            }
        })

        return user;
    }
}

export { CreateUserServices }