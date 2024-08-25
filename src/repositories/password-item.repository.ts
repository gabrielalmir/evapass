import { PrismaClient } from "@prisma/client";
import { PasswordItemEntity } from "../entities/password-item.entity";
import { err, ok } from "../utils/result.util";

export class PasswordItemRepository {
    constructor(private readonly db: PrismaClient) { }

    async add(item: PasswordItemEntity) {
        const { id, name, account, password } = item;
        return await this.db.passwordItem.create({ data: { id, name, account, password } })
    }

    async list() {
        return await this.db.passwordItem.findMany({
            select: { name: true, account: true }
        })
    }

    async show(name: string) {
        if (!await this.exists(name)) {
            return err(new Error(`Service ${name} doesn't exists`));
        }
        const item = await this.db.passwordItem.findFirst({ where: { name } })
        return ok(item!);
    }

    async delete(name: string) {
        if (!await this.exists(name)) {
            return err(false);
        }

        const item = await this.db.passwordItem.findFirst({ where: { name } })
        await this.db.passwordItem.delete({ where: { id: item?.id } })

        return ok(item!)
    }

    async exists(name: string) {
        const count = await this.db.passwordItem.count({ where: { name } });
        return count > 0;
    }
}
