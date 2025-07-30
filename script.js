/**
 * TIC TAC TOE PRO [PROTOTYPE]
 * 
 * © 2025 SenpaiHost - All Rights Reserved
 * 
 * This is a prototype project developed during Sneha's internship at SenpaiHost.
 * All intellectual property rights belong exclusively to SenpaiHost.
 * 
 * Developer: Sneha (SenpaiHost Intern)
 * Company: SenpaiHost
 * Project: 2-Month Technical Internship - Modern Web Development
 * 
 * Features: AI Integration, Premium UI/UX, Web Audio API, Responsive Design
 * 
 * PROPRIETARY SOFTWARE - NOT FOR REDISTRIBUTION
 */

// Game state
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameMode = 'ai'; // 'pvp' or 'ai'
let gameActive = true;
let apiKey = 'AIzaSyAONWBhZftSoJn4VeSO4AfnQcAEhuTloIE';
let isApiKeySet = true;
let scores = { X: 0, O: 0, draw: 0 };

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Initialize the game
document.addEventListener('DOMContentLoaded', function() {
    try {
        initializeGame();
        updateDisplay();
        setupConfettiCanvas();
        
        // Initialize audio context on first user interaction
        document.addEventListener('click', function() {
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.initializeAudioContext();
            }
        }, { once: true });
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Update volume display initially
        updateVolumeDisplay(70);
    } catch (error) {
        console.error('Error during game initialization:', error);
    }
});

// Confetti setup
function setupConfettiCanvas() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Confetti animation
function showConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const confettiPieces = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];
    
    // Create confetti pieces
    for (let i = 0; i < 150; i++) {
        confettiPieces.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            rotation: Math.random() * 360,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            velocity: {
                x: (Math.random() - 0.5) * 4,
                y: Math.random() * 3 + 2
            },
            rotationSpeed: (Math.random() - 0.5) * 6
        });
    }
    
    // Animate confetti
    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = confettiPieces.length - 1; i >= 0; i--) {
            const piece = confettiPieces[i];
            
            // Update position
            piece.x += piece.velocity.x;
            piece.y += piece.velocity.y;
            piece.rotation += piece.rotationSpeed;
            
            // Remove pieces that are off screen
            if (piece.y > canvas.height + 10) {
                confettiPieces.splice(i, 1);
                continue;
            }
            
            // Draw confetti piece
            ctx.save();
            ctx.translate(piece.x, piece.y);
            ctx.rotate(piece.rotation * Math.PI / 180);
            ctx.fillStyle = piece.color;
            ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
            ctx.restore();
        }
        
        if (confettiPieces.length > 0) {
            requestAnimationFrame(animateConfetti);
        }
    }
    
    animateConfetti();
}

// Keyboard navigation
function handleKeyboardNavigation(event) {
    if (!gameActive) return;
    
    const cells = document.querySelectorAll('.cell');
    const focusedElement = document.activeElement;
    const currentIndex = Array.from(cells).indexOf(focusedElement);
    
    if (currentIndex === -1) return;
    
    let newIndex = currentIndex;
    
    switch (event.key) {
        case 'ArrowUp':
            newIndex = Math.max(0, currentIndex - 3);
            break;
        case 'ArrowDown':
            newIndex = Math.min(8, currentIndex + 3);
            break;
        case 'ArrowLeft':
            if (currentIndex % 3 !== 0) newIndex = currentIndex - 1;
            break;
        case 'ArrowRight':
            if (currentIndex % 3 !== 2) newIndex = currentIndex + 1;
            break;
        case 'Enter':
        case ' ':
            makeMove(currentIndex);
            event.preventDefault();
            return;
        default:
            return;
    }
    
    event.preventDefault();
    cells[newIndex].focus();
}

// Sound control functions
function toggleSound() {
    if (typeof soundManager !== 'undefined' && soundManager) {
        const isMuted = soundManager.toggleMute();
        const soundBtn = document.getElementById('soundBtn');
        const soundIcon = soundBtn.querySelector('.sound-icon');
        const soundText = soundBtn.querySelector('.sound-text');
        
        if (isMuted) {
            soundIcon.textContent = '🔇';
            soundText.textContent = 'Sound Off';
            soundBtn.classList.add('muted');
        } else {
            soundIcon.textContent = '🔊';
            soundText.textContent = 'Sound On';
            soundBtn.classList.remove('muted');
            soundManager.playButton();
        }
    } else {
        console.log('Sound manager not available');
    }
}

function setVolume(value) {
    if (typeof soundManager !== 'undefined' && soundManager) {
        soundManager.setVolume(value / 100);
    }
    updateVolumeDisplay(value);
}

function updateVolumeDisplay(value) {
    const volumeValue = document.querySelector('.volume-value');
    if (volumeValue) {
        volumeValue.textContent = value + '%';
    }
}

function initializeGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateDisplay();
    clearBoard();
}

function updateDisplay() {
    const playerSymbol = document.getElementById('currentPlayer');
    const playerName = document.getElementById('playerName');
    const gameStatus = document.getElementById('gameStatus');
    
    if (playerSymbol) playerSymbol.textContent = currentPlayer;
    
    if (playerName) {
        if (gameMode === 'ai' && currentPlayer === 'O') {
            playerName.textContent = 'AI Thinking...';
        } else {
            playerName.textContent = currentPlayer === 'X' ? 'Your Move' : 'Player O';
        }
    }
    
    if (gameStatus) {
        gameStatus.textContent = gameActive ? 'Make your move!' : '';
    }
    
    // Update scores
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    const scoreDraw = document.getElementById('scoreDraw');
    
    if (scoreX) scoreX.textContent = scores.X;
    if (scoreO) scoreO.textContent = scores.O;
    if (scoreDraw) scoreDraw.textContent = scores.draw;
}

function clearBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell';
    });
}

function setGameMode(mode) {
    gameMode = mode;
    
    try {
        // Update button states
        const aiBtn = document.getElementById('aiBtn');
        const pvpBtn = document.getElementById('pvpBtn');
        const difficultySection = document.getElementById('difficultySection');
        
        if (aiBtn && pvpBtn) {
            aiBtn.classList.toggle('active', mode === 'ai');
            pvpBtn.classList.toggle('active', mode === 'pvp');
        }
        
        if (difficultySection) {
            difficultySection.style.display = mode === 'ai' ? 'block' : 'none';
        }
        
        // Play button sound
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.playButton();
        }
        
        // Reset game when mode changes
        resetGame();
    } catch (error) {
        console.error('Error setting game mode:', error);
    }
}

function makeMove(index) {
    if (!gameActive || board[index] !== '') {
        // Play error sound for invalid moves
        if (typeof soundManager !== 'undefined' && soundManager && board[index] !== '') {
            soundManager.playError();
        }
        return;
    }
    
    try {
        // Play move sound
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.playMove();
        }
        
        // Human player move
        board[index] = currentPlayer;
        updateCell(index, currentPlayer);
        
        const winner = checkWinner();
        if (winner) {
            endGame(winner);
            return;
        }
        
        if (checkDraw()) {
            endGame('draw');
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
        
        // AI move if in AI mode and it's O's turn
        if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
            // Play AI thinking sound
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playAiThinking();
            }
            setTimeout(() => makeAIMove(), 500); // Add slight delay for better UX
        }
    } catch (error) {
        console.error('Error making move:', error);
    }
}

function updateCell(index, player) {
    const cell = document.querySelector(`[data-index="${index}"]`);
    if (cell) {
        cell.textContent = player === 'X' ? '❌' : '⭕';
        cell.classList.add('placed');
        
        // Add colored class for styling
        if (player === 'X') {
            cell.style.color = '#FF6B6B';
        } else {
            cell.style.color = '#4ECDC4';
        }
    }
}

async function makeAIMove() {
    if (!gameActive) return;
    
    try {
        console.log('Making AI move');
        
        let move;
        const difficulty = document.getElementById('difficulty').value;
        console.log('AI difficulty:', difficulty);
        
        if (isApiKeySet && apiKey) {
            console.log('Using Google AI for move');
            // Use Google AI for intelligent moves
            move = await getAIMoveFromGoogle(difficulty);
        } else {
            console.log('Using local AI for move');
            // Fallback to local AI
            move = getLocalAIMove(difficulty);
        }
        
        console.log('AI selected move:', move);
        
        if (move !== -1 && board[move] === '') {
            // Play AI move sound
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playMove();
            }
            
            board[move] = currentPlayer;
            updateCell(move, currentPlayer);
            
            const winner = checkWinner();
            if (winner) {
                endGame(winner);
                return;
            }
            
            if (checkDraw()) {
                endGame('draw');
                return;
            }
            
            currentPlayer = 'X';
            updateDisplay();
            
            console.log('AI move completed successfully');
        } else {
            console.error('Invalid AI move selected:', move);
        }
    } catch (error) {
        console.error('Error making AI move:', error);
    }
}

async function getAIMoveFromGoogle(difficulty) {
    try {
        const boardState = board.map(cell => cell === '' ? '-' : cell).join('');
        const availableMoves = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
        
        const prompt = createAIPrompt(boardState, difficulty, availableMoves);
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        });
        
        if (!response.ok) {
            throw new Error('API request failed');
        }
        
        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Extract move from AI response
        const moveMatch = aiResponse.match(/move[:\s]*(\d)/i);
        if (moveMatch) {
            const move = parseInt(moveMatch[1]);
            if (move >= 0 && move <= 8 && board[move] === '') {
                return move;
            }
        }
        
        // Fallback if AI response is invalid
        return getLocalAIMove(difficulty);
        
    } catch (error) {
        console.error('Error calling Google AI:', error);
        return getLocalAIMove(difficulty);
    }
}

function createAIPrompt(boardState, difficulty, availableMoves) {
    const difficultyInstructions = {
        easy: "Make a random but valid move. Don't try to win or block opponent strategically.",
        medium: "Play strategically but make occasional suboptimal moves. Try to win when possible but sometimes miss blocking opportunities.",
        hard: "Play optimally. Always try to win, block opponent wins, and make the best strategic move."
    };
    
    return `You are playing Tic Tac Toe as player O. The current board state is: ${boardState}
    
Board positions are numbered 0-8:
0 | 1 | 2
3 | 4 | 5  
6 | 7 | 8

Current board:
${boardState[0]} | ${boardState[1]} | ${boardState[2]}
${boardState[3]} | ${boardState[4]} | ${boardState[5]}
${boardState[6]} | ${boardState[7]} | ${boardState[8]}

Where X is human player, O is you (AI), and - is empty.

Difficulty: ${difficulty}
${difficultyInstructions[difficulty]}

Available moves: ${availableMoves.join(', ')}

Respond with only the position number (0-8) you want to play. Format your response as "Move: X" where X is the position number.`;
}

function getLocalAIMove(difficulty) {
    const availableMoves = board.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
    
    if (availableMoves.length === 0) return -1;
    
    switch (difficulty) {
        case 'easy':
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        
        case 'medium':
            // 70% chance to play optimally, 30% random
            if (Math.random() < 0.7) {
                return getOptimalMove() || availableMoves[Math.floor(Math.random() * availableMoves.length)];
            }
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
        
        case 'hard':
            return getOptimalMove() || availableMoves[Math.floor(Math.random() * availableMoves.length)];
        
        default:
            return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
}

function getOptimalMove() {
    // 1. Try to win
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === 'O' && board[b] === 'O' && board[c] === '') return c;
        if (board[a] === 'O' && board[c] === 'O' && board[b] === '') return b;
        if (board[b] === 'O' && board[c] === 'O' && board[a] === '') return a;
    }
    
    // 2. Block opponent win
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] === 'X' && board[b] === 'X' && board[c] === '') return c;
        if (board[a] === 'X' && board[c] === 'X' && board[b] === '') return b;
        if (board[b] === 'X' && board[c] === 'X' && board[a] === '') return a;
    }
    
    // 3. Take center if available
    if (board[4] === '') return 4;
    
    // 4. Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => board[corner] === '');
    if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // 5. Take edges
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter(edge => board[edge] === '');
    if (availableEdges.length > 0) {
        return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }
    
    return null;
}

function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], combination: combo };
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !== '') && !checkWinner();
}

function endGame(result) {
    console.log('Ending game with result:', result);
    gameActive = false;
    
    try {
        const gameMessage = document.getElementById('gameStatus');
        
        if (result === 'draw') {
            // Play draw sound
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playDraw();
            }
            
            if (gameMessage) {
                gameMessage.textContent = "🤝 It's a draw!";
                gameMessage.style.background = 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)';
            }
            scores.draw++;
        } else {
            // Play win sound
            if (typeof soundManager !== 'undefined' && soundManager) {
                soundManager.playWin();
            }
            
            const winner = result.winner;
            const isPlayerWin = (gameMode === 'ai' && winner === 'X') || (gameMode === 'pvp');
            
            if (gameMessage) {
                if (gameMode === 'ai') {
                    gameMessage.textContent = winner === 'X' ? '🎉 You Won!' : '🤖 AI Wins!';
                } else {
                    gameMessage.textContent = `🎉 Player ${winner} Wins!`;
                }
                gameMessage.style.background = 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
            }
            
            scores[winner]++;
            
            // Highlight winning combination
            result.combination.forEach(index => {
                const cell = document.querySelector(`[data-index="${index}"]`);
                if (cell) {
                    cell.classList.add('winner');
                }
            });
            
            // Show confetti for player wins
            if (isPlayerWin || gameMode === 'pvp') {
                setTimeout(() => showConfetti(), 300);
            }
        }
        
        updateDisplay();
        console.log('Game ended successfully');
    } catch (error) {
        console.error('Error ending game:', error);
    }
}

function resetGame() {
    console.log('Resetting game');
    
    try {
        // Play reset sound
        if (typeof soundManager !== 'undefined' && soundManager) {
            soundManager.playReset();
        }
        
        // Clear confetti canvas
        const canvas = document.getElementById('confettiCanvas');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        
        initializeGame();
        
        const gameMessage = document.getElementById('gameStatus');
        if (gameMessage) {
            gameMessage.textContent = 'Ready to play!';
            gameMessage.style.background = 'rgba(255, 255, 255, 0.1)';
        }
        
        console.log('Game reset successfully');
    } catch (error) {
        console.error('Error resetting game:', error);
    }
}
