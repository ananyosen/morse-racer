export const text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;
export const baseTime = 130; // ms
export const slopPercentage = 40; // %
export const keyboardBinding = 'Space';

export const MORSE_TO_CHAR_MAP: Record<string, string> = {
    '.-'    : 'A',
    '-...'  : 'B',
    '-.-.'  : 'C',
    '-..'   : 'D',
    '.'     : 'E',
    '..-.'  : 'F',
    '--.'   : 'G',
    '....'  : 'H',
    '..'    : 'I',
    '.---'  : 'J',
    '-.-'   : 'K',
    '.-..'  : 'L',
    '--'    : 'M',
    '-.'    : 'N',
    '---'   : 'O',
    '.--.'  : 'P',
    '--.-'  : 'Q',
    '.-.'   : 'R',
    '...'   : 'S',
    '-'     : 'T',
    '..-'   : 'U',
    '...-'  : 'V',
    '.--'   : 'W',
    '-..-'  : 'X',
    '-.--'  : 'Y',
    '--..'  : 'Z',

    '-----' : '0',
    '.----' : '1',
    '..---' : '2',
    '...--' : '3',
    '....-' : '4',
    '.....' : '5',
    '-....' : '6',
    '--...' : '7',
    '---..' : '8',
    '----.' : '9',

    '..--..': '?',
    '--..--': ',',
    '.-.-.-': '.',
    '-.-.-.': ';',

    '..--'  : ' ',
};
