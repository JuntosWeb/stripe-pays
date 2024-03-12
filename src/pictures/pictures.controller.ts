import { Controller, Get, Param, Res } from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Response } from 'express';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) { }

  @Get(':id')
  findOne(
    @Res() res: Response,
    @Param('id') id: string
  ) {
    const path = this.picturesService.getStaticProductFile(id)
    res.sendFile(path)
  }
}
