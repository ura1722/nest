import { IsInt, IsNotEmpty, IsString, Min } from "class-validator";

export class CreateProfileDto {

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsInt()
  age: number;

}
