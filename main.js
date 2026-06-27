process.env.DEBUG = 'bedrock-portal*'

const { BedrockPortal, Modules, Joinability } = require('bedrock-portal')
const { Authflow, Titles } = require('prismarine-auth')

let portal;

const main = async () => {
  const auth = new Authflow('example', './', { authTitle: Titles.MinecraftNintendoSwitch, deviceType: 'Nintendo', flow: 'live' })

  portal = new BedrockPortal(auth, {
    ip: '51.89.166.254',
    port: 19132,
    joinability: Joinability.FriendsOfFriends,

    world: {
      hostName: 'HCV KitPvP',
      name: 'discord.gg/Pxp3XgBxTW',
      version: '1.21.51',
      memberCount: 14,
      maxMemberCount: 20,

    },
  })
    
  portal.use(Modules.AutoFriendAdd, {
    inviteOnAdd: true,
    conditionToMeet: (player) => player.presenceState === 'Online' || player.presenceState === 'Offline',
    checkInterval: 10000,
    addInterval: 2000,
    removeInterval: 3000,
  })
    
  portal.use(Modules.RedirectFromRealm, {
  clientOptions: {
    realms: {
      realmInvite: 'i8ffRzYiABo'
    }
  },
  chatCommand: {
    enabled: true,
    message: 'invite',
    cooldown: 60000,
  }
})

  portal.use(Modules.InviteOnMessage, {
    command: 'invite',
    checkInterval: 10000,

  })
/*
  portal.on('playerJoin', (player) => {
    console.log('Player Join: ', player)
  })
*/
   portal.on('playerJoin', (player) => {
       /*
      setTimeout(() => {
        portal.invitePlayer(player.username);
      }, 2000);
       */
    });

  portal.on('playerLeave', (player) => {
    console.log('Player Leave: ', player)
  })

  portal.on('friendAdded', (player) => {
    console.log('Friend Added: ', player)
  })

  portal.on('friendRemoved', (player) => {
    console.log('Friend Removed: ', player)
  })

  await portal.start()
}

main()
