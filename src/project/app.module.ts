import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './project.models';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://name1:ErmadtEzq1GyparF@ksu.uz3zfw8.mongodb.net/endnipro?retryWrites=true&w=majority'),
    MongooseModule.forFeature([{
      name: 'project', schema: ProjectSchema
    }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
