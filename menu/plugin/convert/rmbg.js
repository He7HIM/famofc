////recodee by : famofc
//// wa: 923350963366

































































require("../../../config");

module.exports = {
    type: 'convert',
    command: ['hdr', 'enhance', 'hd', 'remini'],
    operate: async (context) => {
        const { famofc, m, quoted, reaction, zreply, remini } = context;

        if (!m.quoted) {
            await zreply(`Reply to an image with the command to enhance it.`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            await reaction(m.chat, "⚡");

            let media = await quoted.download();
            let enhancedImage = await remini(media, "enhance");

            await famofc.sendMessage(m.chat, { 
                image: enhancedImage, 
                caption: '© 𝗙𝗮𝗺𝘇𝘆𝗰𝗿𝗮𝘀𝗵 - #ꜰᴀᴍᴢʏ-ᴍᴅ' 
            }, { quoted: m });

            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await zreply('Failed to enhance the image. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};




const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
require("../../../config");

module.exports = {
    type: 'convert',
    command: ['removebg', 'rmbg'],
    operate: async (context) => {
        const { famofc, m, q, prefix, command, reaction, zreply, sleep, quoted, toTelegra, mime } = context;

        if (!/image/.test(mime)) {
            await zreply(`Reply to a image with caption *${prefix + command}*`);
            return;
        }

        try {
            let dwnld = await famofc.downloadAndSaveMediaMessage(quoted);
            let bjirka = await toTelegra(dwnld);

            let formData = new FormData();
            formData.append('size', 'auto');
            formData.append('image_url', bjirka);

            let response = await axios({
                method: 'post',
                url: 'https://api.remove.bg/v1.0/removebg',
                data: formData,
                responseType: 'arraybuffer',
                headers: {
                    ...formData.getHeaders(),
                    'X-Api-Key': 'NvVp3ZfAFhtLEc1hpvWiJYfm',
                },
                encoding: null
            });

            if (response.status != 200) {
                console.error('Error:', response.status, response.statusText);
                await zreply('Failed to remove background. Please try again later.');
                await reaction(m.chat, "❌");
                return;
            }

            fs.writeFileSync('no-bekgron.png', response.data);
            await reaction(m.chat, "🔁");
            await sleep(1500);
            await famofc.sendMessage(m.chat, {
                image: { url: 'no-bekgron.png' },
                caption: 'Background removed successfully!'
            }, {
                quoted: m
            });
            await reaction(m.chat, "✅");
            fs.unlinkSync('no-bekgron.png');
        } catch (error) {
            console.error('Request failed:', error);
            await zreply('Failed to remove background. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};