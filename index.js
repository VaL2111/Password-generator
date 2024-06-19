const dom = {
    output: document.getElementById('output_field'),
    generateButton: document.getElementById('generate_button'),
    copyButton: document.getElementById('copy_button'),
    passwordSettings: {
        length: document.getElementById('password_length'),
        uppercase: document.getElementById('uppercase'),
        lowercase: document.getElementById('lowercase'),
        symbols: document.getElementById('special_symbols'),
    },
}

const data = {
    letters: {
        up: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        down: "abcdefghijklmnopqrstuvwxyz",
    },
    numbers: "1234567890",
    symbols: "!\"'`.,#$%&()*+-/:;<=>?@[\\]^_{|}~",
};

// Генерація рандомного числа
const generatorRandomNumber = (maxNumber) =>
{
    return Math.floor(Math.random() * maxNumber);
}

// Генерація паролю
function generatorPassword(configuration, length)
{
    const maxIdx = configuration.length;
    let password = "";

    for(let i = 0; i < length; i++){
        const idx = generatorRandomNumber(maxIdx);
        const randomElement = configuration[idx];
        password += randomElement;
    }

    return password;
}

// Перевірка довжини паролю
const checkPasswordLength = (length, min = 1, max = 32) =>
{
    return Math.min(Math.max(length, min), max);
}

// Перевірка на символи, які буде містити пароль
const getPasswordIncludes = ({ uppercase, lowercase, symbols }) =>
{
    let configuration = data.numbers;

    if (uppercase) configuration += data.letters.up;
    if (lowercase) configuration += data.letters.down;
    if (symbols) configuration += data.symbols;

    return configuration;
}

// Обробка та генерація паролю
dom.generateButton.addEventListener('click', () => {
    const { length, uppercase, lowercase, symbols } = dom.passwordSettings;
    let passwordLength = checkPasswordLength(length.value);
    const passwordConfiguration = getPasswordIncludes({
        uppercase: uppercase.checked,
        lowercase: lowercase.checked,
        symbols: symbols.checked,
    });

    dom.output.textContent = generatorPassword(passwordConfiguration, passwordLength);
});

// Копіювання паролю в буфер обміну
dom.copyButton.addEventListener('click', () => {
    const password = dom.output.textContent;
    navigator.clipboard.writeText(password).then(() => {
        alert("Пароль скопійовано в буфер обміну");
    });
});
