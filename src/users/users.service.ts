import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from './users.module';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Role) private readonly rolRepository: Repository<Role>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }
  async create(createRoleDto: CreateUserDto) {
    try {
      const role = await this.rolRepository.findOne({ where: { id: createRoleDto.rol } })

      const user = new User()
      user.rol = role
      await this.userRepository.save(user);

      return {
        ok: true,
        message: 'Usuario creado correctamente',
        status: 201,
      };
    } catch (error) {
      return {
        ok: false, message: 'Ocurrio un error al guardar el Usuario',
        status: 500,
      };
    }
  }


  async findAll() {
    try {
      const roles = await this.userRepository.find({
        where: { isActive: true },

      });

      if (roles.length > 0) {
        return { ok: true, roles, status: 200 };
      }
      return { ok: false, message: 'No se encontraron roles', status: 404 };
    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al obtener los roles',
        status: 500,
      };
    }
  }

  async findOne(id: number) {
    try {

      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        return { ok: false, message: 'User no encontrado', status: 404 };
      }

      return { ok: true, user, status: 200 };
    } catch (error) {
      return { ok: false, message: 'Ocurrio un error', status: 500 };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      user.userName = updateUserDto.userName;
      await this.userRepository.save(user);

      return {
        ok: true,
        message: 'User actualizado correctamente',
        status: 200,
      };
    } catch (error) {
      return { ok: false, message: 'Ocurrio un error', status: 500 };
    }
  }


  async remove(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      user.isActive = false;

      await this.userRepository.save(user);

      return {
        ok: true,
        message: 'Usuario eliminado correctamente',
        status: 200,
      };

    } catch (error) {
      return {
        ok: false,
        message: 'Ocurrio un error al eliminar el usuario',
        status: 500,
      };
    }
  }
}
