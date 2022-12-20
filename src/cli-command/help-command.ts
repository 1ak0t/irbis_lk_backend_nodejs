import {CliCommandInterface} from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(`
      Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                     # выводит номер версии
            --help:                        # печатает этот текст
            --import-orders <path> 
                            <db_login> 
                            <db_password> 
                            <db_host> 
                            <db_port> 
                            <db_name> 
                            <salt>:        # импортирует заказы из TSV
            --import-facades <path> 
                            <db_login> 
                            <db_password> 
                            <db_host> 
                            <db_port> 
                            <db_name>:     # импортирует доски из TSV
            --generator <n> <path> <url>   # генерирует произвольное количество тестовых данных
    `);
  }
}