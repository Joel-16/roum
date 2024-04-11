import { IsEmail, IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";
import { ServiceList } from "./constants";


export type JwtPayload = {
  id: string;
  admin: boolean;
  sessionID: string;
};

export class SigninDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

}


export class BookingDto {
  @IsInt()
  population: number;

  @IsIn(ServiceList)
  service: string;
}

export class ParamDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
