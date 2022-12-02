import { Controller, Get, Logger, Param, ParseIntPipe } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { validate, ValidationError } from 'class-validator';
import { CreatePatientDto } from '../dtos/createPatient.dto';
import { PatientsService } from '../services/patients.service';

@Controller('patients')
export class PatientsController {
  private readonly logger = new Logger(PatientsController.name);

  constructor(private readonly patientService: PatientsService) {}

  /* This receive  the emit message from   import service and  call  
      the patient service   */

  @EventPattern('patient_create')
  async handleUserCreated(data: any) {
    /* Validate Patient details received from import service */

    this.logger.log('patient_create event received');
    
    let createPatientDto = new CreatePatientDto();
    Object.assign(createPatientDto, data);

    const validationResponse: ValidationError[] = await validate(
      createPatientDto,
    );

    /* If patient validation  is failed validation response return to import service */
    if (validationResponse.length > 0) {
      this.logger.log('validation error ');
      return {
        valid: false,
        data: data,
        errors: validationResponse,
      };
    } else {
      this.logger.log('validation success ');
      return {
        valid: true,
        data: await this.patientService.createPatients(data),
      };
    }
  }
}
