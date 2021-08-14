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
                // Invalid arguements
                if (args.length < 1){
                    return {
                        username: "Valorant Stats",
                        avatar_url: "https://www.freeiconspng.com/uploads/orange-error-icon-0.png",
                        result: `Invalid arguments. Run \`${powercord.api.commands.prefix}val {Region} {Name} {Tag}\`.`
                    };
                }
                // Extra Arugments most likely usernames with spaces
                if (args.length > 3){
                    return {
                        username: "Valorant Stats",
                        avatar_url: "https://www.freeiconspng.com/uploads/orange-error-icon-0.png",
                        result: `Replace any spaces in the username with an underscore!`
                    };
                }
                // main body
                try {
                    const { body } = await get(`https://api.henrikdev.xyz/valorant/v1/mmr/${args[0]}/${args[1]}/${args[2]}`);
                    const rank = body.data.currenttierpatched;

                    // Rich embed image link
                    var img; 
                    switch(rank){
                        case "Iron 1":
                            img = "https://static.wikia.nocookie.net/valorant/images/7/7f/TX_CompetitiveTier_Large_3.png";
                            break;
                        case "Iron 2":
                            img = "https://static.wikia.nocookie.net/valorant/images/2/28/TX_CompetitiveTier_Large_4.png";
                            break;
                        case "Iron 3":
                            img = "https://static.wikia.nocookie.net/valorant/images/b/b8/TX_CompetitiveTier_Large_5.png";
                            break;
                        case "Bronze 1":
                            img = "https://static.wikia.nocookie.net/valorant/images/a/a2/TX_CompetitiveTier_Large_6.png";
                            break;
                        case "Bronze 2":
                            img = "https://static.wikia.nocookie.net/valorant/images/e/e7/TX_CompetitiveTier_Large_7.png";
                            break;
                        case "Bronze 3":
                            img = "https://static.wikia.nocookie.net/valorant/images/a/a8/TX_CompetitiveTier_Large_8.png";
                            break;
                        case "Silver 1":
                            img =  "https://static.wikia.nocookie.net/valorant/images/0/09/TX_CompetitiveTier_Large_9.png";
                            break;
                        case "Silver 2":
                            img =  "https://static.wikia.nocookie.net/valorant/images/c/ca/TX_CompetitiveTier_Large_10.png";
                            break;
                        case "Silver 3":
                            img =  "https://static.wikia.nocookie.net/valorant/images/1/1e/TX_CompetitiveTier_Large_11.png";
                            break;
                        case "Gold 1":
                            img = "https://static.wikia.nocookie.net/valorant/images/9/91/TX_CompetitiveTier_Large_12.png";
                            break;
                        case "Gold 2":
                            img = "https://static.wikia.nocookie.net/valorant/images/4/45/TX_CompetitiveTier_Large_13.png";
                            break;
                        case "Gold 3":
                            img = "https://static.wikia.nocookie.net/valorant/images/c/c0/TX_CompetitiveTier_Large_14.png";
                            break;
                        case "Platinum 1":
                            img = "https://static.wikia.nocookie.net/valorant/images/d/d3/TX_CompetitiveTier_Large_15.png";
                            break;
                        case "Platinum 2":
                            img = "https://static.wikia.nocookie.net/valorant/images/a/a5/TX_CompetitiveTier_Large_16.png";
                            break;
                        case "Platinum 3":
                            img = "https://static.wikia.nocookie.net/valorant/images/f/f2/TX_CompetitiveTier_Large_17.png";
                            break;
                        case "Diamond 1":
                            img = "https://static.wikia.nocookie.net/valorant/images/b/b7/TX_CompetitiveTier_Large_18.png";
                            break;
                        case "Diamond 2":
                            img = "https://static.wikia.nocookie.net/valorant/images/3/32/TX_CompetitiveTier_Large_19.png";
                            break;
                        case "Diamond 3":
                            img = "https://static.wikia.nocookie.net/valorant/images/1/11/TX_CompetitiveTier_Large_20.png";
                            break;
                        case "Immortal":
                            img = "https://static.wikia.nocookie.net/valorant/images/f/f9/TX_CompetitiveTier_Large_23.png";
                            break;
                        case "Radiant":
                            img = "https://static.wikia.nocookie.net/valorant/images/2/24/TX_CompetitiveTier_Large_24.png";
                            break;
                        default: 
                            img = "https://static.wikia.nocookie.net/valorant/images/8/80/Valorant_ranks.png";
                    }
                    // Rich embed to return
                    return {
                        username: "ValStats",
                        avatar_url: "https://images.squarespace-cdn.com/content/v1/604ca3ed000a5a493861d5b2/1615740688969-ERXFZMHFFU9MA8RFUWB4/VALORANT_Logo_square.png",
                        result: {
                            type: "rich",
                            fields: [
                                {
                                    name: `${stats.data.name}#${stats.data.tag}`, // username
                                    value: [
                                        `Rank: ${rank}`, // rank i.e Silver 3
                                        `Elo: ${stats.data.elo}` // elo i.e 800-900
                                    ].join("\n"),
                                    inline: false,
                                },
                            ],
                            image: {
                                url: img, // Rank Image 
                                width: 75,
                                height: 75,
                            }
                        },
                    };
                // Error handling
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