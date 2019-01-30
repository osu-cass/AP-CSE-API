import { Request } from 'express';
import { InsertWriteOpResult } from 'mongodb';
import { importDbEntries } from '../../dal/import';
import { applyTracing } from '../../utils/tracer';
import { CSEResponse } from '../../server';
import { IClaim } from '../../models/claim';
import image2base64 from 'image-to-base64';
import { IImageResponse, IImageParams } from '../../models/image/index';

export const handler = async (req: Request, res: CSEResponse): Promise<void> => {
  const { url }: IImageParams = <IImageParams>req.query;
  let imageString: string | undefined;
  const imageResponse: IImageResponse = {image: undefined, error: undefined};
  if(!url) {
    res.status(400);
  } else {
    imageString = await image2base64(url);
    if(!imageString) {
      imageResponse.error = 'Could not find image';
      res.status(404);
    } else {
      imageResponse.image = imageString;
      res.status(200);
    }

    res.contentType('application/json');
  }

  res.send();
};

export const image = applyTracing('/image', handler);
