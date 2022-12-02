import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/typeorm/entities';
import { PatientsController } from './controllers/patient.controller';
import { PatientsService } from './services/patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([Patient]),
  ClientsModule.register([     
    {
      name: 'PATIENT_SERVICE',
      transport: Transport.NATS,
      options: {
        servers: ['nats://127.0.0.1:4222'],
        queue: 'gateway_queue',
      },
    },
  ])],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
