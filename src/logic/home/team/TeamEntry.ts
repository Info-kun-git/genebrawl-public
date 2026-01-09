import {Libg} from "../../../libs/Libg";

const TeamEntry_decode = new NativeFunction( // 24124 decode
    Libg.offset(0x0, 0x0), 'void', ['pointer', 'pointer']
);

const TeamEntry_TeamMemberArrayOffset = 48;

export class TeamEntry {
    static patch() {

    }
}