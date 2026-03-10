import { Module } from '@nestjs/common';
import { UserRequestCredentialsService } from './user-request-credentials.service';

@Module({
  providers: [UserRequestCredentialsService],
  exports: [UserRequestCredentialsService],
})
export class HttpClientModule {}
