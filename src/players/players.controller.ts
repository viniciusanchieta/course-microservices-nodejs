import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/players.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private readonly playersService: PlayersService) { }

    @Post()
    async createUpdatePlayer(
        @Body() createPlayerDto: CreatePlayerDto
    ) {
        await this.playersService.createUpdatePlayer(createPlayerDto);
    }

    @Get()
    async getPlayers(@Query('email') email: string): Promise<IPlayer[] | IPlayer> {
        if (email) {
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getPlayers();
        }
    }

    @Delete()
    async deletePlayer(@Query('email') email: string): Promise<void> {
        await this.playersService.deletePlayer(email);
    }

}
