import { SetMetadata } from '@nestjs/common';

export const SetPublicKey = 'SetPublicKey';

export function SetPublic() {
  return SetMetadata(SetPublicKey, true);
}
