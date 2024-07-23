document.addEventListener('DOMContentLoaded', (event) => {
    const doll = new Marionette();

    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');
    const modeSelect = document.getElementById('modeSelect');

    // Function to update modes
    const updateModes = () => {
        const mode = modeSelect.value;
        doll.switchMode('e', mode);
        doll.switchMode('d', mode);
    };

    // Event listener for mode change
    modeSelect.addEventListener('change', updateModes);

    document.getElementById('encodeButton').addEventListener('click', () => {
        const text = inputText.value;
        output.textContent = doll.encode(text);
    });

    document.getElementById('decodeButton').addEventListener('click', () => {
        const text = inputText.value;
        try {
            output.textContent = doll.decode(text);
        } catch {
            output.textContent = "Hey! This isn't valid dollcode or the mode is wrong!";
        }
    });

    // Initialize modes on load
    updateModes();
});
