import {Configuration} from "../gene/Configuration";
import {Libg} from "../libs/Libg";
import {LogicDefines} from "../LogicDefines";

const LogicVersion_environment = Libg.offset(0x1176624, 0x0);
/*
3 - prod
5 - stage
 */

const LogicVersion_isChinaVersion = Libg.offset(0xBCF968, 0x0); // "Only global leaderboard available but fetching local" | or LogicVersion_isStage + 12
const LogicVersion_isDeveloperBuild = Libg.offset(0xBCF9A8, 0x0); // "LATENCY TESTS" | or LogicVersion_isChinaVersion + 8

const version = "65.165";
const scriptVersion = 88;

type ScriptEnvironment = "dev" | "prod";

export class LogicVersion {
    static readonly scriptEnvironment: ScriptEnvironment = process.env.SCRIPT_ENV as ScriptEnvironment;
    static iosVersion: number = 0;

    static isProd(): boolean {
        return this.scriptEnvironment == "prod";
    }

    static isDeveloperBuild(): boolean {
        return this.scriptEnvironment == 'dev';
    }
    static getScriptVersion(): number {
        return scriptVersion;
    }

    static areNewFeaturesAllowed(version: number): boolean {
        if (LogicDefines.isPlatformAndroid()) return true;
        if (LogicVersion.isDeveloperBuild()) return true;

        return LogicVersion.iosVersion >= version;
    }

    static patch() {
        this.updateEnvironment();

        Interceptor.replace(LogicVersion_isChinaVersion, new NativeCallback(function () {
            return Number(Configuration.isChinaVersion);
        }, 'bool', []));

        // for testing purposes
        Interceptor.replace(LogicVersion_isDeveloperBuild, new NativeCallback(function () {
            return 1;
        }, 'bool', []));
    }

    static updateEnvironment() {
        LogicVersion_environment.writeInt(Configuration.useStage ? 5 : 3);
    }

    static toString(): string {
        return `v${version} (script: ${scriptVersion})`;
    }

    static toDebugString(): string {
        return `${version}`; // don't add "v" prefix here
    }

    static getEnvironment(): string {
        return this.scriptEnvironment;
    }
}