const express = require('express');
const fs = require('fs');
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const { uploadToMega } = require('./id');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const sock = makeWASocket({ auth: state });

    sock.ev.once('connection.update', async (update) => {
      const { qr, connection, lastDisconnect } = update;
      if (qr) {
        return res.send(`<pre>Scan this QR to pair:

${qr}</pre>`);
      }

      if (connection === 'open') {
        await saveCreds();
        const url = await uploadToMega('session');
        await sock.logout();
        return res.send(`<pre>✅ Session uploaded:
${url}

© Vinnie MD</pre>`);
      }

      if (lastDisconnect?.error) {
        return res.send(`<pre>❌ Disconnected: ${lastDisconnect.error.message}</pre>`);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(`<pre>Error: ${err.message}</pre>`);
  }
});

module.exports = router;
