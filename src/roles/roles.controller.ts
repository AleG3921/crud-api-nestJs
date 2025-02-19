import { Body,Controller, Delete ,Get,Param, Patch, Post,} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
    constructor ( private readonly rolesService: RolesService ) {}

    @Post()
    create(@Body() CreateRoleDto: CreateRoleDto) {
        return this.rolesService.create(CreateRoleDto);
    }

    @Get()
    findAll() {
        return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.rolesService.findOne(id)
    }

    @Patch (':id')
     update(@Param(':id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        return this.rolesService.update(id, updateRoleDto);
     }

     @Delete('id')
     remove(@Param('id') id: number) {
        return this.rolesService.remove(id);
     }
}
