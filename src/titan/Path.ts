import {LogicDefines} from "../LogicDefines";
import {PackageInfo} from "../utils/PackageInfo";
import {Libc} from "../libs/Libc";
import ObjC from "frida-objc-bridge";

const DATA_PATH = LogicDefines.isPlatformAndroid() ?
        `/data/data/${PackageInfo.getPackageName()}/files/` : // Android
        Process.getHomeDir() + "/Documents/"; // iOS

const UPDATE_PATH = LogicDefines.isPlatformAndroid() ?
    `/data/data/${PackageInfo.getPackageName()}/update/` :
    Process.getHomeDir() + "/Documents/updated/";

export class Path {

    static getDataPath(): string {
        return DATA_PATH;
    }

    static getResourcePath(): string {
        if (ObjC.available) {
            var NSBundle = ObjC.classes.NSBundle;
            var mainBundle = NSBundle.mainBundle();
            var bundlePath = mainBundle.bundlePath().toString();
            return bundlePath + "/res/";
        } else {
            return "";
        }
    }

    static getUpdatePath(): string {
        return UPDATE_PATH;
    }

    static mkdir(directory: string) {
        Libc.mkdir(directory, 0o777);
    }
}