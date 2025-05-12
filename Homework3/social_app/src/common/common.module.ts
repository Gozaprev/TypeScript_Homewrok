// import { Module } from '@nestjs/common';

// @Module({})
// export class CommonModule {}


import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Module({
  providers: [CommonService],
  exports: [CommonService] // Exports the service to be available in another classes that are part of different modules. Only those services that are exported will be imported
})
export class CommonModule {}