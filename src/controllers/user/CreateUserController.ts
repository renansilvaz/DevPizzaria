import { Request, Response, response } from 'express'
import { CreateUserServices } from '../../services/user/CreateUserService';

class CreateUserController{
    async handle(req: Request, res: Response){
        const {name, email, password} = req.body;

        const CreateUserService = new CreateUserServices();

        const user = await CreateUserService.execute({
            name,
            email,
            password
        });

        return res.json (user)
    }
}

export { CreateUserController }