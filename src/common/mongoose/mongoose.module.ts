import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
console.log('conntected');
@Module({
  imports: [
    MongooseModule.forRoot(`mongodb://localhost:27017/firstNestProject`, {
      authSource: 'firstNestProject',
    }),
  ],
})
export class MongooseConfigModule {}
