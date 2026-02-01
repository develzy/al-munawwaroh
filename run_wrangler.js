const { execSync } = require('child_process');

const token = 'YK7ICFBOti9aeO_0gm3pL3z_Nhk9ECccRbf5Ysma';
const accountId = 'a0f3d107629ceea7d9be272872685921';
const dbName = 'al-munawwaroh-db';

try {
    console.log('Running wrangler with environment account ID...');
    const output = execSync(`node node_modules/wrangler/bin/wrangler.js d1 execute ${dbName} --remote --file schema.sql -y`, {
        env: {
            ...process.env,
            CLOUDFLARE_API_TOKEN: token,
            CLOUDFLARE_ACCOUNT_ID: accountId
        },
        encoding: 'utf-8'
    });
    console.log(output);
} catch (error) {
    console.error('Error:', error.stdout || error.message);
    if (error.stderr) console.error('Stderr:', error.stderr);
}
