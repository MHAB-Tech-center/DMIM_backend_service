import { v2 } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: (): any => {
    return v2.config({
      cloud_name: 'dclubb6gk',
      api_key: '566599111944157',
      api_secret: 't1cI-UEL7kzMphS_8VVjieH5fiE',
    });
  },
};
