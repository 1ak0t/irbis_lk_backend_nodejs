import { CliCommandInterface } from './cli-command.interface.js';
export default class GenerateCommand implements CliCommandInterface {
    readonly name = "--generate";
    private initialData;
    execute(...parameters: string[]): Promise<void>;
}
