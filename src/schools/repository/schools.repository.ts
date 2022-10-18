import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/decorators/typeorm-ex.decorators";
import { DataSource, Repository } from "typeorm";
import { School} from "../entity/Schools.entity";

export const schoolsRepository = [
  {
      provide: 'SCHOOLS_REPOSITORY',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(School),
      inject: ['DATA2_SOURCE'],
  },
];

// @CustomRepository(School)
// export class SchoolRepository extends Repository<School> {}