import fs from 'fs';
import { join } from 'path';
import { createPsIppServer } from './ipp-server/ps-ipp-server/create-ps-ipp-server';
import { setDB } from './db/db';

fs.mkdirSync(join(process.env.PWD as string, 'temp/'), { recursive: true });
fs.mkdirSync(join(process.env.PWD as string, 'db/'), { recursive: true });

setDB();
createPsIppServer();
