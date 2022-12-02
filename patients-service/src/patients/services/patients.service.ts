import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/typeorm/entities';
import { Repository } from 'typeorm';
import { CreatePatientDto } from '../dtos/createPatient.dto';

@Injectable()
export class PatientsService {
  private readonly logger = new Logger(PatientsService.name);

  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
    @Inject('PATIENT_SERVICE') private readonly importService: ClientProxy,
  ) {}

  /*  Create a new patients with received data from import service,
      handle transaction to prevent data errors 
   */
  async createPatients(createPatientDto: CreatePatientDto) {
    let patient: Patient;
    //this.importService.
  
    try {
      this.importService.emit("patient_res",patient);
      
      await this.patientRepository.manager.transaction(
        async (transactionalEntityManager) => {
          patient = new Patient();
          Object.assign(patient, createPatientDto);
          patient = await transactionalEntityManager.save(patient);
        },
      );
    } catch (error) {
      console.error(error); 
      this.logger.log(' Patient DB insert failed: ' + error);
    }

    /* With this native query insert can  archive  more efficiency  data import */
    /*
    const newPatient = await this.patientRepository.query(
      ' INSERT INTO public.patient ("patientId", "firstName", "lastName")  VALUES( $1 , $2 , $3) ',
      [
        createPatientDto.patientId,
        createPatientDto.firstName,
        createPatientDto.lastName,
      ],
    );
    */
    return patient;
  }

}
