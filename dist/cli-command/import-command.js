import TsvFileReader from '../common/file-reader/tsv-file-reader.js';
export default class ImportCommand {
    constructor() {
        this.name = '--import';
    }
    execute(filename) {
        const fileReader = new TsvFileReader(filename.trim());
        try {
            fileReader.read();
            console.log(fileReader.toArray());
        }
        catch (err) {
            if (!(err instanceof Error)) {
                throw err;
            }
            console.log('Не удалось импортировать данные');
        }
    }
}
//# sourceMappingURL=import-command.js.map