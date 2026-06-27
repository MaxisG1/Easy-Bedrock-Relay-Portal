process.env.DEBUG = 'bedrock-portal*'

const { BedrockPortal, Modules, Joinability } = require('bedrock-portal')
const { Authflow, Titles } = require('prismarine-auth')

let portal;

const main = async () => {
  const auth = new Authflow('example', './', { authTitle: Titles.MinecraftNintendoSwitch, deviceType: 'Nintendo', flow: 'live' })

  portal = new BedrockPortal(auth, {
    ip: '',
    port: ,
    joinability: Joinability.FriendsOfFriends,

    world: {
      hostName: '',
      name: '',
      version: '',
      memberCount: ,
      maxMemberCount: ,

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
      realmInvite: 'Your-realm-code'
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
   portal.on('playerJoin', (player) => {
      setTimeout(() => {
        portal.invitePlayer(player.username);
      }, 2000);
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
