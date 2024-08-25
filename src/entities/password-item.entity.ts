import { PasswordItem } from "@prisma/client";
import { randomUUID } from "crypto";

export class PasswordItemEntity implements PasswordItem {
    public readonly id!: string;
    public readonly name: string;
    public readonly account: string;
    public readonly password: string;

    constructor(name: string, account: string, password: string) {
        this.id = randomUUID()
        this.name = name;
        this.account = account;
        this.password = this.encrypt(password);
    }

    public encrypt(password: string) {
        return btoa(password);
    }
}
