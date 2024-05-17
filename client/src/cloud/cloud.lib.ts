function getFrequency(text: string): Record<string, number> {
    text = text.replaceAll(/(!|,|\.|-|:|\?|—)/gim, "");
    const words = text.split(" ");
    return words.reduce((acc, word) => {
        word = word.toLowerCase();
        if (!acc[word]) {
            acc[word] = 0;
        }
        acc[word]++;
        return acc;
    }, {} as Record<string, number>);
}

export function sortWords(text: string): string[] {
    const frequency = getFrequency(text);

    const words = Object.keys(frequency);
    words.sort((w1, w2) => frequency[w1] - frequency[w2]);

    const result: string[] = Array.from<string>({ length: words.length }).fill("");

    let start = 0;
    let end = words.length - 1;
    for (let i = 0; i < words.length; i++) {
        if (i % 2 === 0) {
            result[start++] = words[i];
        } else {
            result[end--] = words[i];
        }
    }

    return result;
}
