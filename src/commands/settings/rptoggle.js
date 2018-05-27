const {Command} = require('discord.js-commando'),
  {oneLine} = require('common-tags'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class rptoggleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'rptoggle',
      memberName: 'rptoggle',
      group: 'settings',
      aliases: ['presencetoggle'],
      description: 'Configure whether you want a Rich Presence or normal presence',
      format: 'enable|disable',
      examples: ['rptoggle enable'],
      guildOnly: false,
      args: [
        {
          key: 'option',
          prompt: 'Enable or disable rich presences?',
          type: 'boolean',
          label: 'Option for toggling',
          validate: (bool) => {
            const validBools = ['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+', 'false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-'];

            if (validBools.includes(bool.toLowerCase())) {
              return true;
            }

            return `Has to be one of ${validBools.join(', ')}`;
          }
        }
      ]
    });
  }

  run (msg, args) {
    this.client.provider.set('global', 'rptoggle', args.option);

    deleteCommandMessages(msg, this.client);

    return msg.reply(oneLine`Rich Presence is now ${args.option
      ? 'enabled'
      : 'disabled'}. Run ${msg.guild
      ? msg.guild.commandPrefix
      : this.client.commandPrefix}rpreload to reload your presence.`);
  }
};