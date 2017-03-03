import FabaCoreMediator from "@fabalous/core/FabaCoreMediator";
import FabaEvent from "@fabalous/core/FabaEvent";
import FabaCoreCommand from "@fabalous/core/FabaCoreCommand";
/**
 * Created by creativecode on 26.02.17.
 */

export default class FabaNativeMobileMediator extends FabaCoreMediator{

    addCommand(event: typeof FabaEvent, command: typeof FabaCoreCommand): void {
        super.addCommand(event, command);
    }
}