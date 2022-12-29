import {getRandomItem} from '../../utils/rundom.js';
import {FacadeGeneratorInterface} from './facade-generator.interface.js';
import {MockFacadeType} from '../../types/mock-facade.type.js';

export default class FacadeGenerator implements FacadeGeneratorInterface {
  constructor(private readonly mockData: MockFacadeType) {}

  public generate(): string {
    const type = getRandomItem<string>(this.mockData.type);
    const milling = getRandomItem<string>(this.mockData.milling);
    const direction = getRandomItem<string>(this.mockData.direction);
    const views = getRandomItem<string>(this.mockData.views);
    const cutter = getRandomItem<string>(this.mockData.cutter);
    const thickness = getRandomItem<string>(this.mockData.thickness);

    return [
      type,
      direction,
      milling,
      views,
      cutter,
      thickness
    ].join('\t');
  }
}