import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/players.interface';
import * as uuid from 'uuid';

@Injectable()
export class PlayersService {

    private players: IPlayer[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(CreatePlayerDto: CreatePlayerDto): Promise<void> {
        const { email } = CreatePlayerDto;

        const playerFound = this.players.find(player => player.email === email);

        if (playerFound) {
            await this.update(playerFound, CreatePlayerDto);
        } else {
            await this.create(CreatePlayerDto);
        }


    }

    async getPlayers(): Promise<IPlayer[]> {
        return await this.players;
    }

    async getPlayerByEmail(email: string): Promise<IPlayer> {
        const playerFound = this.players.find(player => player.email === email);

        if (!playerFound) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }
        return playerFound;
    }

    async deletePlayer(email: string): Promise<void> {
        const playerFound = this.players.find(player => player.email === email);

        if (!playerFound) {
            throw new NotFoundException(`Player with email ${email} not found`);
        }else{
            this.players = this.players.filter(player => player.email !== playerFound.email);
        }
    }

    private create(CreatePlayerDto: CreatePlayerDto): void {
        const { name, phoneNumber, email } = CreatePlayerDto;

        const player: IPlayer = {
            id: uuid.v4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            positionRanking: 1,
            urlAvatar: 'https://github.com/viniciusanchieta.png'
        };
        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
        this.players.push(player);
    }

    private update(playerFound: IPlayer, createPlayerDto: CreatePlayerDto): void {
        const { name } = createPlayerDto;

        playerFound.name = name;
    }
}
