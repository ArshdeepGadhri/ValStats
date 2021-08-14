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
                console.log(args);

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


            }
        });    
    }
    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('val');
    }
};