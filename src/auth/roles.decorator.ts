import { SetMetadata } from '@nestjs/common/decorators/core/set-metadata.decorator';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
