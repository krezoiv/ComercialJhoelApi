import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory, AppAbility, RequestUser } from '../index-shared -auth';
import {
  CHECK_POLICIES_KEY,
  PolicyHandler,
} from '../decorators/policies.decorator';
//import { RequestWithUser } from 'src/lib/auth/login/infrastructure/types/request-with-user.type';
import { RoleMapper } from '../mappers/rols.mapper';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: AbilityFactory,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const handlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (handlers.length === 0) return true;

    const request = context.switchToHttp().getRequest<{ user: RequestUser }>();

    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // 🔥 MAPEO REAL DEL ROL
    const ability: AppAbility = this.abilityFactory.createForUser({
      ...user,
      rol: RoleMapper.toDomain(user.rol),
    });

    const hasPermission = handlers.every((handler) => handler(ability));

    if (!hasPermission) {
      throw new ForbiddenException(
        'No tienes permisos para realizar esta acción',
      );
    }

    return true;
  }
}
