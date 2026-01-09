import {Libg} from "../../../libs/Libg";
import {Configuration} from "../../../gene/Configuration";

const TeamManager_resolveStatus = new NativeFunction(  // "Changed non-team status: %i, slot: %i"
    Libg.offset(0x5AC4BC, 0x0), 'int', []
);

const TeamManager_isPlayerReady = new NativeFunction( // func after TeamManager::instance (???? doesn't make sense wtf)
    Libg.offset(0x0, 0x0), 'int', ['pointer']
);

const TeamManager_checkIsReadyAndPrint = new NativeFunction( // TODO
    Libg.offset(0x0, 0x0), 'void', ['pointer']
);                  // maybe ^ (it was rewritten as i can say)

const TeamManager_openTeamChat = new NativeFunction(
    Libg.offset(0x0, 0x0), 'void', [] // "NEW_TEAM_CHAT"
);
// 4FD790
const TeamManager_instance = Libg.offset(0x115DC50, 0x0); // 1st dword after "HomePageTeamMember::onSpeechBubblePressed() missing chat entry"

export class TeamManager {
    static getInstance() {
        return TeamManager_instance.readPointer();
    }

    static patch(): void {
        Interceptor.replace(TeamManager_resolveStatus, new NativeCallback(function () {
            let status = TeamManager_resolveStatus();

            if (status == 1 && Configuration.hideBattleState)
                status = 3;
            else if (Configuration.preferredStatus != -1)
                status = Configuration.preferredStatus;

            return status;
        }, 'int', []));

        Interceptor.replace(TeamManager_isPlayerReady, new NativeCallback(function (teamManager) {
            return 0;
        }, 'int', ['pointer']));

        Interceptor.replace(TeamManager_checkIsReadyAndPrint, new NativeCallback(function (teamManager) {
            return 0;
        }, 'void', ['pointer']));
    }

    static openTeamChat() {
        TeamManager_openTeamChat(); // maybe rewrite function, so we can close chat on battleend?
    }

    static isCurrentlyInTeam() {
        return !TeamManager.getInstance().readPointer().isNull();
    }

    static shouldShowOpenChatButton() {
        return Configuration.showChatButton && TeamManager.isCurrentlyInTeam();
    }
}
