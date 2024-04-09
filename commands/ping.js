module.exports = {
    name: 'ping',
    execute: async (interaction) => {

        const msg = await interaction.reply({
            content: '正在計算延遲...',
            fetchReply: true,
        });

        const ping = msg.createdTimestamp - interaction.createdTimestamp;


        interaction.editReply(`機器人延遲：${ping} ms`);
    },
};