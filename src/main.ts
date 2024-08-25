import { Command } from 'commander';
import { env } from './config/env.config';
import { db, PrismaService } from './db/db';
import { PasswordItemRepository } from './repositories/password-item.repository';
import { ManagerService } from './services/manager.service';

async function main() {
    PrismaService.migrate();

    const cmd = new Command(env.APP_NAME);
    const repository = new PasswordItemRepository(db);
    const manager = new ManagerService(repository);

    cmd.description(env.APP_DESCRIPTION).version(env.APP_VERSION)
    cmd.command('add')
        .argument('-n, --name <name>', 'Your service name (ex: Gmail, Outlook, Facebook, TikTok, etc.)')
        .argument('-a, --account <account>', 'Your account alias (ex: username, email, etc.)')
        .argument('-p, --password <password>', "Your super secret password (I won't tell anyone 😉)")
        .action(async (name, account, password) => {
            const result = await manager.addPasswordItem(name, account, password);
            if (!result.ok) console.error(`Error while processing command 'add':`, result.error);
        });

    cmd.command('list')
        .action(async () => {
            const result = await manager.listPasswordItems();
            if (!result.ok) console.error(`Error while processing command 'list':`, result.error);
        });

    cmd.command('show')
        .argument('-n, --name <name>', 'Your service name (ex: Gmail, Outlook, Facebook, TikTok, etc.)')
        .action(async (name) => {
            const result = await manager.showPasswordItem(name);
            if (!result.ok) console.error(`Error while processing command 'show':`, result.error);
        });

    cmd.command('delete')
        .argument('-n, --name <name>', 'Your service name (ex: Gmail, Outlook, Facebook, TikTok, etc.)')
        .action(async (name) => {
            const result = await manager.deletePasswordItem(name);
            if (!result.ok) console.error(`Error while processing command 'delete':`, result.error);
        });

    cmd.parse(process.argv);
}

void main()
    .catch(console.error)

