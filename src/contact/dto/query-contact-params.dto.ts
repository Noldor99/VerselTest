import { IsOptional } from 'class-validator';

export class QueryContactParamsDto {
  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
