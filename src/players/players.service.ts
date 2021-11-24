import { Injectable, Logger } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { IPlayer } from './interfaces/players.interface';
import * as uuid from 'uuid';

@Injectable()
export class PlayersService {

    private players: IPlayer[] = [];

    private readonly logger = new Logger(PlayersService.name);

    async createUpdatePlayer(CreatePlayerDto: CreatePlayerDto): Promise<void> {
        this.logger.log(`createPlayerDto: ${CreatePlayerDto}`);
        await this.create(CreatePlayerDto);
    }

    private create(CreatePlayerDto: CreatePlayerDto): void {
        const {name, phoneNumber, email} = CreatePlayerDto;

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
}
