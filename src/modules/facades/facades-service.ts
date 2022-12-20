import {FacadesServiceInterface} from './facades-service.interface.js';
import {inject, injectable} from 'inversify';
import {Component} from '../../types/component.types.js';
import {DocumentType, types} from '@typegoose/typegoose';
import {FacadesEntity} from './facades.entity.js';
import CreateFacadeDto from './dto/create-facade.dto.js';

@injectable()
export class FacadesService implements FacadesServiceInterface {
  constructor(
    @inject(Component.FacadeModel) private readonly facadeModel: types.ModelType<FacadesEntity>
  ) {}

  public async create(dto: CreateFacadeDto): Promise<DocumentType<FacadesEntity>> {
    return await this.facadeModel.create(dto);
  }
}