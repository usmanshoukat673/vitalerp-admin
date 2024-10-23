export function truncateText(text, wordCount) {

    if (!text) {
        return '...'; // or any other default value or placeholder
    }

    // Split the text into an array of words
    const words = text.split(' ');

    // Take the specified number of words
    const truncatedWords = words.slice(0, wordCount);

    // Join the words back together and add ellipsis
    const truncatedText = truncatedWords.join(' ') + (words.length > wordCount ? '...' : '');

    return truncatedText;
}


export function truncateTextByChars(text, maxLength = 25) {
    if (text.length <= maxLength) {
        return text;
    } else {
        return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
    }
}