import { UserRepository } from "../repositories/userRepository.js";
import { UserDto } from "../dtos/userDto.js";
import bcrypt from "bcryptjs";

const { hash } = bcrypt;

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // createUser = async (userData) => {
    //     const user = UserDto.fromRequest(userData);
    //     return await this.userRepository.create(user);
    // }

    register = async(userData) => {
        const userExists = await this.userRepository.findByEmail(userData.email);

        if (userExists) {
            throw new Error("Usuário já cadastrado!");
        }

        const passwordHash = await hash(userData.password, 8);

        const userToCreate = {
            name: userData.name,
            email: userData.email,
            password: passwordHash,
        };

        const createdUser = await this.userRepository.create(userToCreate);
        return new UserDto(createdUser);
    }

    getAllUsers = async () => {
        return await this.userRepository.findAll();
    }

    getUserById = async (id) => {
        const foundUser = await this.userRepository.findById(id);
        if (!foundUser) {
            throw new Error("Usuário não encontrado.");
        }
        return foundUser;
    }

    updateUser = async (id, userData) => {
        const updateUser = await this.userRepository.update(id, userData);

        if (!updateUser) {
            throw new Error("Usuário não encontrado.");
        }
        return updateUser;
    }

    deleteUser = async (id) => {
        const deletedUser = await this.userRepository.delete(id);
        if (!deletedUser) {
            throw new Error("Usuário não encontrado.");
        }
        return deletedUser;
    }

    searchUserByName = async (name) => {
        if (!name || name.trim() === "") {
            throw new Error("Informar o nome do Usuário para busca.");
        }
        return await this.userRepository.searchByName(name);
    }
}