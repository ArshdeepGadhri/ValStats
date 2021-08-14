// Default imports
const { Plugin } = require("powercord/entities");
const { get } = require("powercord/http");

module.exports = class valorantStats extends Plugin {
    startPlugin(){
        powercord.api.commands.registerCommand({
            command: 'val',
            description: 'Get Valorant Stats',
            usage: '{c} [region] [name] [tag]',
            executor: async (args) => {
                if (args.length < 1){
                    console.log(args.length);
                    return {
                        username: "Valorant Stats",
                        avatar_url: "https://www.freeiconspng.com/uploads/orange-error-icon-0.png",
                        result: `Invalid arguments. Run \`${powercord.api.commands.prefix}val {Region} {Name} {Tag}\`.`
                    };
                }
                if (args.length > 3){
                    console.log(args.length);
                    return {
                        username: "Valorant Stats",
                        avatar_url: "https://www.freeiconspng.com/uploads/orange-error-icon-0.png",
                        result: `Replace any spaces in the username with an underscore!`
                    };
                }

                try {
                    const { body } = await get(`https://api.henrikdev.xyz/valorant/v1/mmr/${args[0]}/${args[1]}/${args[2]}`);
                    const rank = body.data.currenttierpatched;

                    console.log(rank);
                } catch (err) {
                    return {
                        username: "Valorant Stats",
                        avatar_url: "https://www.freeiconspng.com/uploads/orange-error-icon-0.png",
                        result: `Error: ${err.message}`
                    };
                }
            }
        });    
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('val');
    }
};