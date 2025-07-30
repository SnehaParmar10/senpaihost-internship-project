// Configuration file for the Tic Tac Toe AI game

const CONFIG = {
    // Google Gemini API settings
    GOOGLE_API: {
        BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        TIMEOUT: 10000, // 10 seconds
        MAX_RETRIES: 3
    },
    
    // Game settings
    GAME: {
        BOARD_SIZE: 3,
        PLAYER_X: 'X',
        PLAYER_O: 'O',
        EMPTY_CELL: '',
        AI_MOVE_DELAY: 500 // milliseconds
    },
    
    // AI Difficulty settings
    DIFFICULTY: {
        EASY: {
            name: 'easy',
            optimalPlayChance: 0.2,
            description: 'Makes random moves most of the time'
        },
        MEDIUM: {
            name: 'medium',
            optimalPlayChance: 0.7,
            description: 'Plays strategically but makes occasional mistakes'
        },
        HARD: {
            name: 'hard',
            optimalPlayChance: 1.0,
            description: 'Plays optimally, very difficult to beat'
        }
    },
    
    // UI settings
    UI: {
        ANIMATION_DURATION: 300,
        SUCCESS_COLOR: '#4CAF50',
        ERROR_COLOR: '#F44336',
        PRIMARY_COLOR: '#667eea'
    }
};

// Export for use in other files (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
