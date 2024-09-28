import { Test, TestingModule } from '@nestjs/testing';
import { StudentCoursesController } from './student-courses.controller';

describe('StudentsCoursesController', () => {
  let controller: StudentCoursesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentCoursesController],
    }).compile();

    controller = module.get<StudentCoursesController>(StudentCoursesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
