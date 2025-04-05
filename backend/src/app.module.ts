import { Module } from '@nestjs/common';
import {GameApiModule} from "./modules/gameApiModule";
import {databaseConnection} from "./configs/databaseConfig";

@Module({
  imports: [GameApiModule, databaseConnection],
  controllers: [],
  providers: [],
})
export class AppModule {}
