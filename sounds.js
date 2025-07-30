/**
 * TIC TAC TOE PRO [PROTOTYPE] - SOUND SYSTEM
 * 
 * © 2025 SenpaiHost - All Rights Reserved
 * 
 * Professional Web Audio API Implementation
 * Immersive Gaming Sound Experience
 * 
 * Developer: Sneha (SenpaiHost Intern)
 * Company: SenpaiHost
 * 
 * PROPRIETARY SOFTWARE - NOT FOR REDISTRIBUTION
 */

// Sound Effects Manager
class SoundManager {
    constructor() {
        this.sounds = {};
        this.muted = false;
        this.volume = 0.7;
        this.initializeSounds();
    }

    initializeSounds() {
        // Create audio contexts using Web Audio API for better browser support
        this.audioContext = null;
        
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported, falling back to HTML5 audio');
        }

        // Define sound frequencies and durations for different game events
        this.soundConfig = {
            move: { frequency: 800, duration: 0.1, type: 'sine' },
            win: { frequency: [523, 659, 784], duration: 0.5, type: 'triangle' },
            draw: { frequency: 400, duration: 0.3, type: 'sawtooth' },
            button: { frequency: 1000, duration: 0.05, type: 'square' },
            reset: { frequency: 300, duration: 0.2, type: 'sine' },
            ai_thinking: { frequency: 600, duration: 0.1, type: 'triangle' },
            error: { frequency: 200, duration: 0.3, type: 'sawtooth' }
        };
    }

    // Generate sound using Web Audio API
    generateTone(frequency, duration, type = 'sine', volume = null) {
        if (!this.audioContext || this.muted) return;

        const actualVolume = volume !== null ? volume : this.volume;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(actualVolume * 0.3, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + duration);
        } catch (e) {
            console.log('Error generating tone:', e);
        }
    }

    // Play complex sound patterns
    playSequence(frequencies, duration, type, interval = 0.1) {
        if (!Array.isArray(frequencies)) {
            this.generateTone(frequencies, duration, type);
            return;
        }

        frequencies.forEach((freq, index) => {
            setTimeout(() => {
                this.generateTone(freq, duration / frequencies.length, type);
            }, index * interval * 1000);
        });
    }

    // Sound effect methods
    playMove() {
        const config = this.soundConfig.move;
        this.generateTone(config.frequency, config.duration, config.type);
    }

    playWin() {
        const config = this.soundConfig.win;
        this.playSequence(config.frequency, config.duration, config.type, 0.15);
    }

    playDraw() {
        const config = this.soundConfig.draw;
        this.generateTone(config.frequency, config.duration, config.type);
    }

    playButton() {
        const config = this.soundConfig.button;
        this.generateTone(config.frequency, config.duration, config.type, 0.5);
    }

    playReset() {
        const config = this.soundConfig.reset;
        this.generateTone(config.frequency, config.duration, config.type);
    }

    playAiThinking() {
        const config = this.soundConfig.ai_thinking;
        this.generateTone(config.frequency, config.duration, config.type, 0.4);
    }

    playError() {
        const config = this.soundConfig.error;
        this.generateTone(config.frequency, config.duration, config.type);
    }

    // Control methods
    mute() {
        this.muted = true;
    }

    unmute() {
        this.muted = false;
        // Resume audio context if it was suspended
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }

    toggleMute() {
        this.muted = !this.muted;
        return this.muted;
    }

    setVolume(level) {
        this.volume = Math.max(0, Math.min(1, level));
    }

    // Initialize audio context on user interaction (required by browsers)
    initializeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Initialize sound manager
const soundManager = new SoundManager();
