import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PatientController } from './patient/controllers/patient.controller';
import { PatientService } from './patient/services/app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PATIENT_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: ['nats://nats:4222'],
          queue: 'patients_queue',
        },
      },

    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
})
export class AppModule {}
