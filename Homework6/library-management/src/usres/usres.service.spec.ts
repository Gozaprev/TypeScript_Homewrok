import { Test, TestingModule } from '@nestjs/testing';
import { UsresService } from './usres.service';

describe('UsresService', () => {
  let service: UsresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsresService],
    }).compile();

    service = module.get<UsresService>(UsresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
