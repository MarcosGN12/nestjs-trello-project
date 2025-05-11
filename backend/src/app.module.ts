import { Module } from '@nestjs/common';
import { TasksModule } from './resources/tasks/tasks.module';
import { UsersModule } from './resources/users/users.module';
import { ColumnsModule } from './resources/columns/columns.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ColorsModule } from './resources/colors/colors.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ColumnsModule,
    CategoriesModule,
    ColorsModule,
    AuthModule,
  ],
  providers: [AuthService]
})
export class AppModule { }
