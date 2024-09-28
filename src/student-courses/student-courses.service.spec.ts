import { Test, TestingModule } from '@nestjs/testing';
import { StudentCoursesService } from './student-courses.service';

describe('StudentsCoursesService', () => {
  let service: StudentCoursesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentCoursesService],
    }).compile();

    service = module.get<StudentCoursesService>(StudentCoursesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
