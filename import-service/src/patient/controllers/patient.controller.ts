import {
  Controller,
  Inject,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PatientService } from '../services/app.service';
import { diskStorage } from 'multer';
import { ClientProxy, EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class PatientController {
  private readonly logger = new Logger(PatientController.name);
  constructor(private readonly appService: PatientService){}

  /* Multipart file upload post endpoint */
  @Post('uploadFile')
  @UseInterceptors(
    FileInterceptor('file_name', {
      storage: diskStorage({
        destination: './file',
      }),
    }),
  )
  async uploadMultipart(@UploadedFile() file: Express.Multer.File) {
    this.logger.log('File upload begin');
    return await this.appService.multipartUpload(file);
  }

  @EventPattern('patient_res')
  async handleUserCreated(data: any) {
    console.log('  patient_res');
    this.logger.log('hii test fun'+data);
  }

 
}
