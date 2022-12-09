import { CliCommandInterface } from './cli-command.interface.js';
export default class VersionCommand implements CliCommandInterface {
    readonly name = "--version";
    private readVersion;
    execute(): Promise<void>;
}
