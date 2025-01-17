////recodee by : famofc
//// wa: 923350963366

require("../../../config");

module.exports = {
    type: 'convert',
    command: ['attp'],
    operate: async (context) => {
        const { famofc, m, q, prefix, command, reaction, zreply } = context;

        if (!q) {
            await zreply(`Add input, Example: *${prefix + command} I am gay*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            const lubangtile = `https://widipe.com/attp?text=${encodeURIComponent(q)}`;

            await reaction(m.chat, "🔁");
            await famofc.sendVideoAsSticker(m.chat, lubangtile, m, {
                packname: global.packname,
                author: global.author
            });

            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await zreply('Failed to generate meme. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};