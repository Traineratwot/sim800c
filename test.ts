import {SerialPort} from "serialport";
import {GSM} from "./src";

(async () => {
    let SIM_PATH;
    await SerialPort.list().then((ports) => {
        const port = ports.find(p => p.path.includes('COM3'));
        if (port) {
            console.log('Using SIM', port.path);
            SIM_PATH = port.path;
        }
    });

    if (SIM_PATH) {
        const gsm = new GSM(SIM_PATH);
        await gsm.ready();
        // await gsm.sendMessage('79253060575', 'Привет я долбоеб' );
        console.log('Message sent');
        gsm.on('newMessage', async (message) => {
            console.log('newMessage', message);
            try {
                gsm.deleteMessage(message).catch(console.warn);
            } catch (e) {
                console.warn(e)
            }
        });
    } else {
        throw new Error('No SIM found');
    }
})();