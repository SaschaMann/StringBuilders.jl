"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = require("@actions/core");
const exec = require("@actions/exec");
const os = require("os");
// Store information about the environment
const osPlat = os.platform(); // possible values: win32 (Windows), linux (Linux), darwin (macOS)
core.debug(`platform: ${osPlat}`);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const codecov = core.getInput('codecov');
            const coveralls = core.getInput('coveralls');
            // Test if Julia has been installed by showing versioninfo()
            yield exec.exec('julia', ['--color=yes', '--project', '-e', 'using Pkg; if VERSION >= v\"1.1.0-rc1\"; Pkg.build(verbose=true); else Pkg.build(); end']);
            yield exec.exec('julia', ['--color=yes', '--check-bounds=yes', '--project', '-e', 'using Pkg; Pkg.test(coverage=true)']);
            // if(codecov=='true') {
            //     await exec.exec('julia', ['--color=yes', '-e', 'using Pkg; Pkg.add("Coverage"); using Coverage; Codecov.submit(process_folder())'])
            // }
            // if(coveralls=='true') {
            //     await exec.exec('julia', ['--color=yes', '-e', 'using Pkg; Pkg.add("Coverage"); using Coverage; Coveralls.submit(process_folder())'])
            // }
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
