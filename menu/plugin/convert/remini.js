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