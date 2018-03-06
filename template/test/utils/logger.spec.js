import { expect } from 'chai';
import logger from '../../src/utils/logger';

describe('Logger config test', () => {
  it('Debug level', () => {
    expect(logger.transports.console.level).to.equal('debug');
  });
});
