const {Command} = require('discord.js-commando'),
  {oneLine, stripIndents} = require('common-tags'),
  {deleteCommandMessages} = require('../../util.js');

module.exports = class webhooktoggleCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'webhooktoggle',
      memberName: 'webhooktoggle',
      group: 'settings',
      aliases: ['wht', 'hooktoggle'],
      description: 'Configure whether you want a the Webhook Notification System (WNS)',
      format: 'enable|disable',
      examples: ['webhooktoggle {option}', 'webhooktoggle enable'],
      guildOnly: false,
      args: [
        {
          key: 'option',
          prompt: 'Enable or disable Webhook Notification System?',
          type: 'boolean',
          label: 'Option for toggling',
          validate: (bool) => {
            const validBools = ['true', 't', 'yes', 'y', 'on', 'enable', 'enabled', '1', '+', 'false', 'f', 'no', 'n', 'off', 'disable', 'disabled', '0', '-'];

            if (validBools.includes(bool.toLowerCase())) {
              return true;
            }

            return stripIndents`Has to be one of ${validBools.map(val => `\`${val}\``).join(', ')}
            Respond with your new selection or`;
          }
        }
      ]
    });
  }

  run (msg, {option}) {
    this.client.provider.set('global', 'webhooktoggle', option);

    deleteCommandMessages(msg, this.client);

    return msg.reply(oneLine`Webhook Notification System is now ${option 
      ? `enabled. Make sure to set up your keywords with \`${msg.guild 
        ? msg.guild.commandPrefix : this.client.commandPrefix}webhookkeywords\` and optionally word exclusions with \`${msg.guild 
        ? msg.guild.commandPrefix : this.client.commandPrefix}webhookexclusions\`.` 
      : 'disabled.'}`);
  }
};