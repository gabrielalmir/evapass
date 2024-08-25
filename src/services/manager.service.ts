import { PasswordItem } from "@prisma/client";
import { PasswordItemEntity } from "../entities/password-item.entity";
import { PasswordItemRepository } from "../repositories/password-item.repository";
import { err, ok, Result } from "../utils/result.util";

export class ManagerService {
    constructor(private readonly passwordItemRepository: PasswordItemRepository) { }

    async addPasswordItem(name: string, account: string, password: string): Promise<Result<PasswordItem, unknown>> {
        const item = new PasswordItemEntity(name, account, password);
        const created = await this.passwordItemRepository.add(item);
        return ok(created);
    }

    async listPasswordItems(): Promise<Result<boolean, unknown>> {
        const items = await this.passwordItemRepository.list();
        console.table(items);
        return ok(true);
    }

    async showPasswordItem(serviceName: string): Promise<Result<boolean, unknown>> {
        const result = await this.passwordItemRepository.show(serviceName);

        if (!result.ok) return err(result.error);

        const { name, account, password } = result.value;
        const mapped = [{ name, account, password: atob(password) }]
        console.table(mapped)

        return ok(true);
    }

    async deletePasswordItem(name: string): Promise<Result<PasswordItem, boolean>> {
        return await this.passwordItemRepository.delete(name)
    }
}
