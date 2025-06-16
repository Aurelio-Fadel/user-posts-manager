import { UserService } from "../services/userService.js";
import { UserDto } from "../dtos/userDto.js";

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    register = async (req, res) => {
        try {
            const dto = UserDto.fromRequest(req.body);
            const newUser = await this.userService.register(dto);
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                user: new UserDto(newUser),
            })
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getAllUsers = async (req, res) => {
        try {
            const listUsers = await this.userService.getAllUsers();
            res.status(200).json(listUsers.map((user) => new UserDto(user)));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    getUserById = async (req, res) => {
        try {
            const userById = await this.userService.getUserById(req.params.id);
            if (!userById) {
                return res.status(404).send("Usuário não encontrado!");
            }
            res.status(200).json(new UserDto(userById));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    updateUser = async (req, res) => {
        try {
            const updateUser = await this.userService.updateUser(
                req.params.id,
                req.body, { new: true });
            if (!updateUser) {
                return res.status(404).send("Usuário não encontrado!");
            }
            res.status(201).json({
                message: "Usuário atualizado com sucesso!",
                user: new UserDto(updateUser),
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    deleteUser = async (req, res) => {
        try {
            await this.userService.deleteUser(req.params.id);

            res.status(200).json({
                message: "Usuário removido com sucesso!"
            });
        } catch (error) {
            res.status(500).send(error.message);
        }
    }

    searchUserByName = async (req, res) => {
        try {
            const { name } = req.params;
            const users = await this.userService.searchUserByName(name);
            if (users.length === 0) {
                return res.status(404).json({
                    message: "Nenhum usuário encontrado com o nome informado.",
                    name: name,
                });
            }
            res.status(200).json(users.map((user) => new UserDto(user)));
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
}

export default new UserController();