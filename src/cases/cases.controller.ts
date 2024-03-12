import { Controller, Get, Post, Body, /* Patch, */ Param, UseInterceptors, UploadedFile,/*  Delete */ } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from 'src/helper/fileFilter';
import { diskStorage } from 'multer';
import { fileNamer } from 'src/helper/fileNamer';
// import { UpdateCaseDto } from './dto/update-case.dto';

@Controller('cases')
export class CasesController {
  constructor(private readonly casesService: CasesService) { }

  @Post()
  @UseInterceptors(FileInterceptor('picture', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/casesPictures',
      filename: fileNamer
    })
  }
  ))
  create(@UploadedFile() file, @Body() createCaseDto: CreateCaseDto) {
    return this.casesService.create({ ...createCaseDto, image: file.filename });
  }

  @Get()
  findAll() {
    return this.casesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.casesService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
  //   return this.casesService.update(+id, updateCaseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.casesService.remove(+id);
  // }
}
