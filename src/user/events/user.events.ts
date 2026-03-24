export class UserDeletedEvent {
  constructor(
    public readonly userId: number,
    public readonly email: string,
    public readonly username: string,
  ) {}
}

export const USER_EVENTS = {
  DELETED: 'user.deleted',
  CREATED: 'user.created',
} as const;
