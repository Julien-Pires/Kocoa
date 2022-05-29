export const icon = {
    exclamation: '❗',
    checkmark: '✅',
    crossmark: '❌',
    hourglass: '⌛'
};

export const isNullOrEmpty = (value: string) => !value || /^\s*$/.test(value);
