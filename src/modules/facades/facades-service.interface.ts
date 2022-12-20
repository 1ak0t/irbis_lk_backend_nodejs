import CreateFacadeDto from './dto/create-facade.dto.js';
import {DocumentType} from '@typegoose/typegoose';
import {FacadesEntity} from './facades.entity.js';

export interface FacadesServiceInterface {
  create(dto: CreateFacadeDto): Promise<DocumentType<FacadesEntity>>;
}