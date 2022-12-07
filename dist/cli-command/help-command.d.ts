import { CliCommandInterface } from './cli-command.interface.js';
export default class HelpCommand implements CliCommandInterface {
    readonly name = "--help";
    execute(): Promise<void>;
}
