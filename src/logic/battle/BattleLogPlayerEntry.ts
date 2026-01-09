import {GradientNickname} from "../../gene/features/GradientNickname";
import {Libg} from "../../libs/Libg";
import {HashTagCodeGenerator} from "../../titan/logic/util/HashTagCodeGenerator";

const BattleLogPlayerEntry_ctor = new NativeFunction( // 15081 decode | 23458 decode -> BattleLogEntry -> BattleLogPlayerEntry
    Libg.offset(0xD24CA0, 0x0), 'void', ['pointer', 'pointer']
);

const BattleLogPlayerEntry_playerIdOffset = 8;
const BattleLogPlayerEntry_PlayerDisplayDataOffset = 96;

export class BattleLogPlayerEntry {
    static patch() {
        Interceptor.replace(BattleLogPlayerEntry_ctor, new NativeCallback(function (battleLogPlayerEntry, ByteStream) {
            BattleLogPlayerEntry_ctor(battleLogPlayerEntry, ByteStream);

            const playerId = battleLogPlayerEntry.add(BattleLogPlayerEntry_playerIdOffset).readPointer();
            const playerTag = HashTagCodeGenerator.toCode(playerId);

            const playerDisplayData = battleLogPlayerEntry.add(BattleLogPlayerEntry_PlayerDisplayDataOffset).readPointer();

            GradientNickname.setPlayerGradient(playerTag, playerDisplayData);
        }, 'void', ['pointer', 'pointer']));
    }
}