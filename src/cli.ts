#!/usr/bin/env node

import 'reflect-metadata';
import CliApplication from './app/cli-application.js';
import HelpCommand from './cli-command/help-command.js';
import VersionCommand from './cli-command/version-command.js';
import ImportOrdersCommand from './cli-command/import-orders-command.js';
import GenerateCommand from './cli-command/generate-command.js';
import ImportFacadesCommand from './cli-command/import-facades-command.js';

const myManager = new CliApplication();
myManager.registerCommands([
  new HelpCommand, new VersionCommand, new ImportOrdersCommand,new ImportFacadesCommand, new GenerateCommand
]);
myManager.processCommand(process.argv);