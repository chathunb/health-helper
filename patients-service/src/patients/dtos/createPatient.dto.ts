import { IsInt, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

/* Dto class used to do validation and data transactions */
export class CreatePatientDto {

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  patientId: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @MinLength(2)
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @MinLength(1)
  @IsString()
  gender: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  enrolmentId: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  location: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(4)
  @IsInt()
  year: string;

  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  category: string;

  @IsString()
  addressLine1: string;

  @IsString()
  addressLine2: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  city: string;

  @IsNotEmpty()
  @IsInt()
  zipCode: number;
  
  @IsNotEmpty()
  @IsString()
  phoneNo: string;

}
