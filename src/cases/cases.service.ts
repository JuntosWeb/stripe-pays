import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
// import { UpdateCaseDto } from './dto/update-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentsService } from 'src/payments/payments.service';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Case } from './entities/case.entity';

@Injectable()
export class CasesService {

  constructor(
    @InjectRepository(Case)
    private readonly casesRepository: Repository<Case>,
    @Inject(forwardRef(() => PaymentsService))
    private readonly paymentService: PaymentsService
  ) { }

  async create(createCaseDto: CreateCaseDto) {
    /* TODO: CREATE UNIQUE KEY FOR each case */
    const uniqueKey = uuidv4();
    /* Create paymentlink based on cases */
    const { paymentLink, product } = await this.paymentService.create({
      campaniaKey: uniqueKey,
      name: createCaseDto.nombre,
      descripcion: createCaseDto.descripcion
    })
    const caseCreated = this.casesRepository.create({
      ...createCaseDto,
      image: createCaseDto.image,
      campaniaKey: uniqueKey,
      stripe_product_id: product.id,
      paymentlink: paymentLink.url,
      active: true
    })
    await this.casesRepository.save(caseCreated);
    return caseCreated;
  }

  async findAll() {
    /* TODO: can be improved using pagination */
    const allCases = await this.casesRepository.find({
      where: {
        active: true
      }
    })
    return allCases;
  }

  async findOne(id: string) {
    const campania = await this.casesRepository.findOneBy({ campaniaKey: id })
    return campania;
  }

  update(id: number, /* updateCaseDto: UpdateCaseDto */) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
}
