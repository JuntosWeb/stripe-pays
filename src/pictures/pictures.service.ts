import { BadRequestException, Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class PicturesService {

  getStaticProductFile(imageName: string) {
    /* check if in static products imageName exist */
    const path = join(__dirname, '../../static/casesPictures/', imageName);
    if (!existsSync(path))
      throw new BadRequestException("Product file doesn't exist");

    return path;

  }
}
