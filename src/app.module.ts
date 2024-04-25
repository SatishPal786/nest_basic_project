import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseConfigModule } from './common/mongoose/mongoose.module';
import { UserModule } from './application/user/user.module';

@Module({
  imports: [MongooseConfigModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
