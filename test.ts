import {SerialPort} from "serialport";
import {GSM} from "./src";

(async () => {
    let SIM_PATH;
    await SerialPort.list().then((ports) => {
        const port = ports.find(p => (p.vendorId ==='1A86' && p.productId === '7523'));
        if (port) {
            console.log('Using SIM', port.path);
            SIM_PATH = port.path;
        }
    });
    console.log(SIM_PATH)
    if (SIM_PATH) {
        const gsm = new GSM(SIM_PATH);
        await gsm.ready();
         await gsm.sendMessage('+79951202011', 'Привет, Долбоеб' );
        console.log('Message sent');
        // gsm.on('newMessage', async (message) => {
        //     console.log('newMessage', message);
        //     try {
        //         gsm.deleteMessage(message).catch(console.warn);
        //     } catch (e) {
        //         console.warn(e)
        //     }
        // });
        process.exit(0)
    } else {
        throw new Error('No SIM found');
    }
})();