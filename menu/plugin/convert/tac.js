////recodee by : famofc
//// wa: 923350963366

































































module.exports = {
    type: 'convert',
    command: ['tocharcode', 'tcrc', 'tocc', 'toascii', 'toasciicode', 'tac'],
    operate: async (context) => {
        const { q: text, m, prefix, command, zreply, reaction, sleep } = context;

        if (!text) {
            await zreply(`Example: *${prefix + command} hi, i'm straight and you're gay*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            await reaction(m.chat, "🔁");
            await sleep(500);
            await zreply(`Character codes/Ascii:\n\n${Array.from(text, char => char.charCodeAt(0)).join(', ')}`);
            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await zreply('Failed to convert text to character codes. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};