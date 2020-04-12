import { Logger, Property } from '../decorator/log.decorator';

export class Calculator {
  @Property
  target:string; 

  @Logger
  calculate(n: number) {
    return n * n;
  }
}
