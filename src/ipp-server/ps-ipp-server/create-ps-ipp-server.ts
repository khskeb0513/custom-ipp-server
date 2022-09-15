import { PSPrinterName } from '../../config/config';
import { v4 as uuidV4 } from 'uuid';
import { createWriteStream } from 'fs';
import { join } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Printer = require('ipp-printer');

export function createPsIppServer() {
  const PsIppServer = new Printer(PSPrinterName);
  console.log('[PS_IPP] PS IPP server started.');

  PsIppServer.on('job', (job: any) => {
    const queueId = uuidV4();
    const filename = join(process.env.PWD as string, 'temp/', queueId + '.ps');
    const file = createWriteStream(filename);

    job.on('end', () => {
      console.log(`[PS_IPP] ${queueId}.ps`);
    });

    job.pipe(file);
  });
}
