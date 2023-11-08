export function cutAndAppend(str) {
    if (str.length > 50) {
        return str.slice(0, - 50) + '...';
    } else {
        return str;
    }
}

export function truncateMiddle(str, startChars = 7, endChars = 7, ellipsis = '...') {
    if (str.length > (startChars + endChars)) {
        return str.substring(0, startChars) + ellipsis + str.substring(str.length - endChars);
    } else {
        return str;
    }
}

export function convertWeiToEth(value) {
    const val = parseInt(value);
    if (val === 0) {
        return 0;
    }
    const eth = val / 10 ** 18; // Convert Wei to Ether
    const strNumber = eth.toLocaleString();
    return strNumber; 
}

export function convertTimestamp(hexTimestamp) {
    // Convert the hexadecimal timestamp to a number
    let timestamp = parseInt(hexTimestamp, 16);

    // Convert the timestamp to milliseconds (from seconds)
    timestamp *= 1000;

    // Create a new Date object from the timestamp
    let date = new Date(timestamp);

    // Get the current date
    let now = new Date();

    // Calculate the difference in seconds
    let difference = Math.floor((now - date) / 1000);

    // Calculate the time ago
    let timeAgo;
    if (difference < 60) {
        timeAgo = difference + ' seconds ago';
    } else if (difference < 3600) {
        timeAgo = Math.floor(difference / 60) + ' minutes ago';
    } else if (difference < 86400) {
        timeAgo = Math.floor(difference / 3600) + ' hours ago';
    } else {
        timeAgo = Math.floor(difference / 86400) + ' days ago';
    }

    // Get the exact month, year, and day
    let year = date.getFullYear();
    let month = date.getMonth() + 1;  // Months are zero-based in JavaScript
    let day = date.getDate();

    // Return the results
    return `
   ${timeAgo},(${day},${month},${year})
    `
}

export function convertScientificNotation(hexa) {
    const number = parseInt(hexa, 16);
    const strNumber = number.toLocaleString();
    return strNumber;
}

export function toDecimal(num) {
    if (num === 0 || num == null) return "0";

    const magnitude = Math.floor(Math.log10(Math.abs(num)));
    const decimalPlaces = Math.max(0, -magnitude);

    return num.toFixed(decimalPlaces);
}
