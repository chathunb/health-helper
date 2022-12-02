import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { CreatePatientEvent } from '../events/patient.events';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import _ from 'lodash';
import { count } from 'console';
import { firstValueFrom } from 'rxjs';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000','http://localhost:3006', 'http://localhost:8000'],
  },
})
export class PatientService implements OnModuleInit {
  private readonly logger = new Logger(PatientService.name);

  @WebSocketServer()
  webSocketServer: Server;

  /* websocket server initialization */
  onModuleInit() {
    this.webSocketServer.on('connection', (socket) => {
      console.log(socket.id);
      this.logger.log('webSocketServer connected');
    });
  }
  /* Inject  client proxy */
  constructor(
    @Inject('PATIENT_SERVICE') private readonly patientService: ClientProxy,
  ) {}

  async multipartUpload(file: any) {
    let row = 0;
    let errors = 0;
    let patient;

    const startTime: any = new Date();

    try {
      const filename = 'file/' + file.filename;
      /* User read  stream to import  CSV data*/
      fs.createReadStream(filename)
        .pipe(csv())
        .on('data', async (data) => {
          row++;

          /*  CSV fields*/
          patient = new CreatePatientEvent();
          patient.rowId = row;
          patient.firstName = patient.firstName = data['First Name'];
          patient.lastName = data['Last Name'];
          patient.patientId = data['NPI'];
          patient.gender = data['Gender'];
          patient.enrolmentId = data['Enrollment ID'];
          patient.location = data['Location'];
          patient.year = data['Year'];
          patient.category = data['Category'];
          patient.addressLine1 = data['Line 1 Street Address'];
          patient.addressLine2 = data['Line 2 Street Address'];
          patient.city = data['City'];
          patient.zipCode = data['Zip Code'];
          patient.phoneNo = data['Phone Number'];

          this.logger.log('patient row ' + row);

          // const deleteTaskResponse: any = await firstValueFrom(
          //   this.patientService.emit('patient_create', patient),
          // );
      
          // console.log(deleteTaskResponse);

          this.patientService
            .send('patient_create', patient)
            .subscribe((patientResponse) => {
              /* Response  from patient service */
              if (
                patientResponse.valid !== undefined &&
                !patientResponse.valid
              ) {
               
                patientResponse.errors.forEach((responseError) => {
                  errors++;

                  let errorFields = responseError.constraints;

                  /* Get error fields */
                  Object.keys(errorFields).forEach((element1) => {
                    /* Emit error response to React front-end */
                    this.webSocketServer.emit('onMessage', {
                      rowId: patientResponse.data.rowId,
                      id: patientResponse.data.rowId,
                      error: errorFields[element1],
                    });
                  });
                });
              }
            });
           
           
        })
        .on('end', () => {
          this.logger.log('CSV read completed');
          const endTime: any = new Date();

          /* Calculate CSV read time  */
          const difference = (endTime - startTime) / 1000;
          this.logger.log('You waited: ' + difference + ' seconds');

          /*  Emit final result to React frontend */
          this.webSocketServer.emit('onFinal', {
            totalRows: row,
            info: 'You waited: ' + difference + ' seconds',
            errorCount: errors,
          });

          // Delete file file
          this.deleteFileAfterRead(filename);
        })
        .on('error', function (error) {
          this.logger.log(`error: ${error.message}`);
        });

    
    } catch (error) {
      this.logger.log(`error: ${error.message}`);
    }
    return patient;
  }

  deleteFileAfterRead(filePath: string) {
    fs.unlink(filePath, (error: any) => {
      if (error) return console.log(error);
      console.log('file deleted successfully');
    });
  }

}
