export const getMorseCodeFromTime = (diffTime: number, baseTime: number, slopPercentage: number) => {
    if (
        diffTime >= baseTime * (100 - slopPercentage)/100
        && diffTime <= baseTime * (100 + slopPercentage)/100
    ) {
        return '.';
    }

    if (
        diffTime >= 2.8 * baseTime * (100 - slopPercentage)/100
        && diffTime <= 3.2 * baseTime * (100 + slopPercentage)/100
    ) {
        return '-';
    }

    return 'N';
};