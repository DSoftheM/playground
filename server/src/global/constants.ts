import path, { dirname as _dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// @ts-ignore
const globalFolderPath = _dirname(fileURLToPath(import.meta.url));
export const serverRoot = path.resolve(globalFolderPath, '..', '..');

export const PATH = {
  static: {
    image: (id: number) => `/static/image/${id}.jpg`,
  },
};
