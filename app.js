document.addEventListener('DOMContentLoaded', (event) => {
    const doll = new Marionette();

    const inputText = document.getElementById('inputText');
    const output = document.getElementById('output');
    const modeSelect = document.getElementById('modeSelect');
    const encodeButton = document.getElementById('encodeButton');
    const decodeButton = document.getElementById('decodeButton');

    const modeidentifier = document.getElementById('currentmode');

    let currentMode = 'encode'; // Initialize the current mode

    // Function to update modes
    const updateModes = () => {
        const mode = modeSelect.value;
        doll.switchMode('e', mode);
        doll.switchMode('d', mode);
    };

    // Event listener for mode change
    modeSelect.addEventListener('change', updateModes);

    // Event listener for text input
    inputText.addEventListener('input', () => {
        const text = inputText.value;
        if (currentMode === 'encode') {
            output.textContent = doll.encode(text);
        } else if (currentMode === 'decode') {
            try {
                output.textContent = doll.decode(text);
            } catch {
                output.textContent = "Hey! This isn't valid dollcode or the mode is wrong!";
            }
        }
    });

    // Event listeners for mode buttons
    encodeButton.addEventListener('click', () => {
        modeidentifier.textContent = "ENCODING";
        modeidentifier.style.color = "var(--matrixgreen)"
        currentMode = 'encode';
        const text = inputText.value;
        output.textContent = doll.encode(text);
    });

    decodeButton.addEventListener('click', () => {
        modeidentifier.textContent = "DECODING";
        modeidentifier.style.color = "red"
        currentMode = 'decode';
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
