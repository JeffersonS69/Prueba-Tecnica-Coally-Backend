import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://Jefferson:2n4pJwkxOq1yyIgD@cluster0.t0omy.mongodb.net/nest',
    ),
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
