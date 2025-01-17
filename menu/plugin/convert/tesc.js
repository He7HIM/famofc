////recodee by : famofc
//// wa: 923350963366

































































module.exports = {
    type: 'convert',
    command: ['toescape', 'toescapeseq', 'tesc'],
    operate: async (context) => {
        const { q: text, m, prefix, command, zreply, reaction, sleep } = context;

        if (!text) {
            await zreply(`Example: *${prefix + command} hi, i'm straight and you're gay*`);
            await reaction(m.chat, "❗");
            return;
        }

        try {
            let escapeSequences = Array.from(text, char => {
                let code = char.charCodeAt(0);
                return `\\u${code.toString(16).padStart(4, '0')}`;
            }).join('');
            await reaction(m.chat, "🔁");
            await sleep(500);
            await zreply(`Escape sequences:\n\n${escapeSequences}`);
            await reaction(m.chat, "✅");
        } catch (error) {
            console.error('Error:', error);
            await zreply('Failed to convert text to escape sequences. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
};