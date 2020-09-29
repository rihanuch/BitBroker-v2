/*
ctx.update format
{
    update_id: <id>,
    message: {
        message_id: <id>,
        from: {
            id: <id>,
            is_bot: false,
            first_name: <name>,
            last_name: <name>,
            username: <name>,
            language_code: 'es'
        },
        chat: {
            id: <id>,
            first_name: <name>,
            last_name: <name>,
            username: <name>,
            type: 'private'
        },
        date: <timestamp (universal)>,
        text: <text>,
        entities: [[Object]]
    }
}
*/
const userHelpers = require('../users/helpers');
const marketsMenu = require('./menus/market');

let state = {};

function setStateCommand(ctx, newCommand) {
    const message = ctx.update.message;
    const userId = message.from.id;

    // if user id does not exist create one
    if (!state[userId]) state[userId] = { id: userId };

    // save/update user last command
    state[userId].command = newCommand;
    return {
        message,
        userId,
        name: message.from.first_name
    };
}

function getLastCommand(ctx) {
    const message = ctx.update.message;
    const userId = message.from.id;

    // returns last command from user, or null otherwise if user does not exist
    return {
        message,
        lastCommand: !state[userId] ? null : state[userId].command,
        name: message.from.first_name,
        userId
    }
}
async function reigsterUser({ telegramId, name, password }) {
    try {
        return await userHelpers.addNew({ telegramId, name, password });
    } catch (error) {
        return false
    }
}


module.exports = {
    start(ctx) {
        const { name } = setStateCommand(ctx, null);
        return `Hola, ${name}. Actualmente me encuentro en construcción, pero mantente al tanto 😄!`
    },
    register(ctx) {
        const { name } = setStateCommand(ctx, 'register');
        return `¡Genial ${name}! Para registrarte como usuario en el sistema solo debes enviarme tu contraseña 🔑`;
    },
    async markets(ctx) {
        return await marketsMenu.markets();
    },
    async market(ctx) {
        ctx.deleteMessage();
        let marketId = ctx.match.input.split('-')[1];
        return await marketsMenu.market(marketId);
    },
    async text(ctx) {
        const { lastCommand, message, name, userId } = getLastCommand(ctx);
        switch (lastCommand) {
            case 'register':
                setStateCommand(ctx, null);
                var response = await reigsterUser({ telegramId: userId, name: name, password: message.text })
                return response ?
                    `${name}, tu contraseña se estableció. Te recomiendo borrar el mensaje de tu contraseña 😉`
                    : 'Ya estabas registrado en el sistema 👀'
            default:
                return `${name}, no entiendo ese mensaje en el contexto de esta conversación ☹️`;
        }
    }
}