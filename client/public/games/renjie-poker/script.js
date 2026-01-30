document.addEventListener('DOMContentLoaded', () => {
    const playBtn = document.getElementById('play-btn');
    const instructionsBtn = document.getElementById('instructions-btn');
    const instructionsPanel = document.getElementById('instructions-panel');

    playBtn.addEventListener('click', () => {
        // Redirect to play (relative)
        window.location.href = 'play/index.html';
    });

    instructionsBtn.addEventListener('click', () => {
        instructionsPanel.classList.toggle('hidden');
    });
});
