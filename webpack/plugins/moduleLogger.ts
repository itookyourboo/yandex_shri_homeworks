import {Compiler} from 'webpack';
import * as fs from "fs";
import path from "path";

class ModuleLogger {
    apply(compiler: Compiler) {
        const used = new Set();
        const unused: string[] = [];

        compiler.hooks.normalModuleFactory.tap(
            'ModuleLogger',
            (normalModuleFactory) => {
                normalModuleFactory.hooks.module.tap('ModuleLogger', (_module, _createData, resolveData) => {
                    // @ts-ignore
                    console.log(_createData.resource);
                    // @ts-ignore
                    used.add(_createData.resource)
                    console.log(resolveData.context);
                    return _module;
                });
            }
        );

        const checkHtmlCopies = (check: string): void => {
            if (!used.has(check) && !check.endsWith('html')) {
                unused.push(check);
            }
        }

        const fillUnusedArray = async (directory: string) => {
            const dirFiles = await fs.promises.readdir(directory);
            await Promise.all(dirFiles.map(async (file) => {
                const next = path.resolve(directory, file);
                const isDirectory = (await fs.promises.stat(next)).isDirectory();
                if (isDirectory)
                    await fillUnusedArray(next);
                else checkHtmlCopies(next);
            }))
        }

        compiler.hooks.done.tap('Reading fs things', async () => {
            const srcPath = path.resolve(__dirname, '..', 'src');
            await fillUnusedArray(srcPath);
            fs.writeFile('./unused', JSON.stringify(unused), () => {});
        });
    }
}

export default ModuleLogger;