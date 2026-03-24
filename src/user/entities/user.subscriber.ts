import {
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
} from "typeorm";
import { Logger, Injectable, OnModuleInit } from "@nestjs/common";
import { DataSource } from "typeorm";
import { User } from "./user.entity";
import { ProfileService } from "src/profile/profile.service";


@Injectable()
export class UserSubscriber
  implements EntitySubscriberInterface<User>, OnModuleInit
{
  private readonly logger = new Logger(UserSubscriber.name);

  constructor(
    private readonly dataSource: DataSource,
    private readonly profileService: ProfileService
  ) {}

  onModuleInit() {
    this.dataSource.subscribers.push(this);
    this.logger.debug("OrderProductSubscriber attached to DataSource");
  }

  listenTo() {
    return User;
  }

  async afterInsert(event: InsertEvent<User>) {
    const user = event.entity;
    if (!user) return;

    this.logger.log(`User created with ID=${user.name}`);

    try {
      await this.profileService.create(
        user, 
        {
            first_name: '',
            last_name: '',
            age: 0,
        },
        event.queryRunner
    );
      this.logger.log(`Profile automatically created for User ID=${user.id}`);
    } catch (err) {
      this.logger.error(
        `Failed to create profile for User ID=${user.id}: ${err.message}`
      );
    }
  }

  
  afterRemove(event: RemoveEvent<User>) {
    const entity = event.databaseEntity;
    this.logger.log(`User deleted with ID=${entity?.id}`);
  }
}
