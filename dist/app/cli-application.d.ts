import { CliCommandInterface } from '../cli-command/cli-command.interface.js';
export default class CliApplication {
    private commands;
    private defaultCommand;
    private parseCommand;
    registerCommands(commandList: CliCommandInterface[]): void;
    getCommand(commandName: string): CliCommandInterface;
    processCommand(argv: string[]): void;
}
