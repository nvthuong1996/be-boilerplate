import { Injectable } from '@nestjs/common';
import { includes } from 'lodash';

@Injectable()
export class ValidatorService {
    public isImage(mimeType: string): boolean {
        const imageMimeTypes = ['image/jpeg', 'image/png'];

        // eslint-disable-next-line import/namespace
        return includes(imageMimeTypes, mimeType);
    }
}
