import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
	schema: 'public',
	name: 'patient',
})
export class Patient {
  @PrimaryGeneratedColumn({  type: 'bigint', name: 'patient_id'})
  id: number;

  @Column({ nullable: false })
  @MinLength(3)
  patientId: string;

  @MinLength(2)
  @Column({  nullable: false})
  firstName: string;

  @MinLength(2)
  @Column({  nullable: false})
  lastName: string;

  @MinLength(1)
  @Column({  nullable: false})
  gender: string;

  @MinLength(3)
  @Column({  nullable: false})
  enrolmentId: string;

  @MinLength(3)
  @Column({  nullable: false})
  location: string;

  @Column({  nullable: false})
  @MinLength(4)
  @MaxLength(4)
  year: string;

  @Column({  nullable: false})
  @MinLength(3)
  category: string;

  @Column({  nullable: true})
  addressLine1: string;

  @Column({  nullable: true})
  addressLine2: string;

  @Column({  nullable: false, default: ''})
  city: string;

  @Column({  nullable: false})
  zipCode: number;

  @Column({  nullable: false, default: ''})
  phoneNo: string;

}


 
 
  
