import {Libg} from "../../../libs/Libg";
import {StreamItemList} from "./StreamItemList";

const TeamStream_update = new NativeFunction(
    Libg.offset(0x0, 0x0), 'void', ['pointer', 'float'] // "TID_CLAN_CHAT_JUMP_TO_NEW"
);

const TeamStream_instance = Libg.offset(0x115DC58, 0xEC2958);

const TeamStream_StreamItemListOffset = 136;

export class TeamStream {
    static getInstance() {
        return TeamStream_instance.readPointer();
    }

    static update(time: number) {
        TeamStream_update(TeamStream.getInstance(), time);
    }

    static getLastItem() {
        if (TeamStream.getInstance().isNull()) return NULL;

        return StreamItemList.getLastItem(TeamStream.getInstance().add(TeamStream_StreamItemListOffset).readPointer());
    }
}
