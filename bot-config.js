// Telegram Bot Configuration for ZarGates Gifts Mini App
const botConfig = {
    // Bot token (replace with your actual bot token)
    botToken: 'YOUR_BOT_TOKEN_HERE',
    
    // Bot username
    botUsername: '@ZarGatesGiftsBot',
    
    // Web App URL (replace with your actual hosting URL)
    webAppUrl: 'https://your-domain.com/zargates-gifts',
    
    // Bot commands
    commands: [
        {
            command: 'start',
            description: 'Запустить приложение подарков ZarGates'
        },
        {
            command: 'gifts',
            description: 'Показать доступные подарки'
        },
        {
            command: 'slang',
            description: 'Гайд по сленгу ZarGates'
        },
        {
            command: 'help',
            description: 'Помощь по использованию бота'
        }
    ],
    
    // Mini App settings
    miniApp: {
        title: 'ZarGates Подарки',
        shortName: 'ZarGifts',
        description: 'Специальные награды и подарки для игроков ZarGates',
        photo: {
            url: 'https://your-domain.com/images/zargates-icon.png',
            width: 512,
            height: 512
        }
    },
    
    // Gift categories configuration
    giftCategories: {
        daily: {
            name: 'Ежедневные',
            icon: '📅',
            description: 'Ежедневные награды и квесты',
            color: '#667eea'
        },
        special: {
            name: 'Специальные',
            icon: '⭐',
            description: 'Особые события и акции',
            color: '#f39c12'
        },
        referral: {
            name: 'Реферальные',
            icon: '👥',
            description: 'Награды за приглашения',
            color: '#e74c3c'
        },
        seasonal: {
            name: 'Сезонные',
            icon: '🎯',
            description: 'Сезонные билеты и события',
            color: '#9b59b6'
        }
    },
    
    // API endpoints (replace with your actual API URLs)
    api: {
        baseUrl: 'https://your-api-domain.com/api',
        endpoints: {
            gifts: '/gifts',
            claim: '/gifts/claim',
            user: '/user/profile',
            slang: '/slang'
        }
    },
    
    // Notification settings
    notifications: {
        giftClaimed: {
            title: '🎁 Подарок получен!',
            message: 'Вы успешно получили подарок из ZarGates!'
        },
        dailyReminder: {
            title: '📅 Ежедневная награда',
            message: 'Не забудьте забрать ежедневную награду!'
        },
        newGift: {
            title: '✨ Новый подарок!',
            message: 'У вас появился новый подарок в ZarGates!'
        }
    },
    
    // Localization
    locales: {
        ru: {
            welcome: 'Добро пожаловать в ZarGates Подарки! 🎁',
            selectGift: 'Выберите подарок для получения:',
            giftClaimed: 'Подарок успешно получен!',
            noGifts: 'У вас пока нет доступных подарков.',
            error: 'Произошла ошибка. Попробуйте позже.',
            help: `Доступные команды:
/start - Запустить приложение
/gifts - Показать подарки
/slang - Гайд по сленгу
/help - Показать эту справку`
        },
        en: {
            welcome: 'Welcome to ZarGates Gifts! 🎁',
            selectGift: 'Select a gift to claim:',
            giftClaimed: 'Gift successfully claimed!',
            noGifts: 'You have no available gifts yet.',
            error: 'An error occurred. Please try again later.',
            help: `Available commands:
/start - Launch the app
/gifts - Show gifts
/slang - Slang guide
/help - Show this help`
        }
    }
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = botConfig;
}

// Export for browser
if (typeof window !== 'undefined') {
    window.botConfig = botConfig;
}
