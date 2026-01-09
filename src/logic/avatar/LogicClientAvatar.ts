import {Libg} from "../../libs/Libg";
import {Configuration} from "../../gene/Configuration";
import {HashTagCodeGenerator} from "../../titan/logic/util/HashTagCodeGenerator";
import {GradientNickname} from "../../gene/features/GradientNickname";

export const tutorialsCompletedCountOffset = 360;

const PlayerDisplayData_PlayerDisplayData = new NativeFunction( // player %i (under string) (LogicDataTables::createDefaultDisplayData)
    Libg.offset(0xD21D50, 0x488D48), 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']
);

const PlayerDisplayData_decode = new NativeFunction( // check below normal ctor in disasm (only ByteStream arg)
    Libg.offset(0xD21EC0, 0x0), 'void', ['pointer', 'pointer']
);

const nameOffset = 56;
const accountIdOffset = 28;

export class LogicClientAvatar {
    instance: NativePointer;

    constructor(instance: NativePointer) {
        this.instance = instance;
    }

    static patch(): void {
        Interceptor.replace(PlayerDisplayData_PlayerDisplayData, new NativeCallback(function (instance, name, legendaryLevel, nameColor, playerThumbnail, brawlPassSeason) {
            if (!Configuration.showName) {
                name.scptr("");
            }

            return PlayerDisplayData_PlayerDisplayData(instance, name, legendaryLevel, nameColor, playerThumbnail, brawlPassSeason);
        }, 'pointer', ['pointer', 'pointer', 'pointer', 'pointer', 'pointer', 'pointer']));

        Interceptor.replace(PlayerDisplayData_decode, new NativeCallback(function (instance, byteStream) {
            PlayerDisplayData_decode(instance, byteStream);
            if (!Configuration.showName) {
                instance.scptr("");
            }

            return instance;
        }, 'pointer', ['pointer', 'pointer']));
    }

    shouldGoToFirstTutorialBattle(): boolean {
        return LogicClientAvatar.shouldGoToFirstTutorialBattle(this.instance);
    }

    shouldGoToSecondTutorialBattle(): boolean {
        return LogicClientAvatar.shouldGoToSecondTutorialBattle(this.instance);
    }

    static shouldGoToFirstTutorialBattle(self: NativePointer): boolean {
        return self.add(tutorialsCompletedCountOffset).readInt() == 0;
    }

    static shouldGoToSecondTutorialBattle(self: NativePointer): boolean {
        return self.add(tutorialsCompletedCountOffset).readInt() == 1;
    }

    getAccountId(): number[] {
        return this.instance.add(accountIdOffset).accountId();
    }

    getAccountIdPtr(): NativePointer {
        return this.instance.add(accountIdOffset);
    }

    getName(): string {
        return this.instance.add(nameOffset).fromsc();
    }

    setName(name: string) {
        this.instance.add(nameOffset).scptr(name);
    }

    changeNameIfDeveloper() {
        let hashtag = HashTagCodeGenerator.toCode(this.instance.add(accountIdOffset));

        GradientNickname.setPlayerGradient(hashtag, this.instance.add(nameOffset));
    }
}