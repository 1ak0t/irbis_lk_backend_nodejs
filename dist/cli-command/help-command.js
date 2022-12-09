export default class HelpCommand {
    constructor() {
        this.name = '--help';
    }
    async execute() {
        console.log(`
      Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                   # выводит номер версии
            --help:                      # печатает этот текст
            --import <path>:             # импортирует данные из TSV
            --generator <n> <path> <url> # генерирует произвольное количество тестовых данных
    `);
    }
}
//# sourceMappingURL=help-command.js.map