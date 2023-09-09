const { readdir, mkdir, writeFile, opendir } = require('node:fs/promises');
const path = require('path');
const name = process.argv[2];

const { execSync } = require('child_process');
execSync('cd ..');

async function initPuzzle(puzzleName)
{
    try
    {
        for (const file of await readdir(__dirname))
        {
            if (file === puzzleName)
                process.exit(0);
        }

        const createdDir = await mkdir(path.resolve(__dirname, puzzleName), { recursive: true });

        const openDir = await opendir(createdDir);
        writeFile('coucou.txt');
    }
    catch (err)
    {
        console.error(err);
    }
}

initPuzzle(name);
