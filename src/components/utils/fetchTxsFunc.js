import axios from 'axios';
const url = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_API}`;

export async function getExternalTransactions(address) {
    const mainTxs = [];
    const batchSize = 25;
    const hexBatchSize = `0x${batchSize.toString(16)}`;
    if (address) {
        const outgoingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                fromAddress: address,
                category: ["external"],
                maxCount: hexBatchSize
            },
        });
        const incomingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                toAddress: address,
                category: ["external"],
                maxCount: hexBatchSize
            },
        });
        for await (const tx of outgoingTx.data.result.transfers) {
            mainTxs.push(tx);
        }

        for await (const tx of incomingTx.data.result.transfers) {
            mainTxs.push(tx);
        }
        // console.log(mainTxs);
        return mainTxs;
    }
}
// getInternalTransactions
export async function getInternalTransactions(address) {
    const mainTxs = [];
    const batchSize = 25;
    const hexBatchSize = `0x${batchSize.toString(16)}`;
    if (address) {
        const outgoingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                fromAddress: address,
                category: ["internal"],
                maxCount: hexBatchSize
            },
        });
        const incomingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                toAddress: address,
                category: ["internal"],
                maxCount: hexBatchSize
            },
        });
        for await (const tx of outgoingTx.data.result.transfers) {
            mainTxs.push(tx);
        }

        for await (const tx of incomingTx.data.result.transfers) {
            mainTxs.push(tx);
        }
        // console.log(mainTxs);
        return mainTxs;
    }
}
// getTokenTransactions
export async function getTokenTransactions(address) {
    const mainTxs = [];
    const batchSize = 25;
    const hexBatchSize = `0x${batchSize.toString(16)}`;
    if (address) {
        const outgoingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                fromAddress: address,
                category: ["erc20"],
                maxCount: hexBatchSize
            },
        });
        const incomingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                toAddress: address,
                category: ["erc20"],
                maxCount: hexBatchSize
            },
        });
        for await (const tx of outgoingTx.data.result.transfers) {
            mainTxs.push(tx);
        }

        for await (const tx of incomingTx.data.result.transfers) {
            mainTxs.push(tx);
        }
        // console.log(mainTxs);
        return mainTxs;
    }
}
// getNftTransactions
export async function getNftTransactions(address) {
    const mainTxs = [];
    const batchSize = 25;
    const hexBatchSize = `0x${batchSize.toString(16)}`;
    if (address) {
        const outgoingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                fromAddress: address,
                category: ["erc721", "erc1155"],
                maxCount: hexBatchSize
            },
        });
        const incomingTx = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "alchemy_getAssetTransfers",
            params: {
                toAddress: address,
                category: ["erc721", "erc1155"],
                maxCount: hexBatchSize
            },
        });
        for await (const tx of outgoingTx.data.result.transfers) {
            mainTxs.push(tx);
        }

        for await (const tx of incomingTx.data.result.transfers) {
            mainTxs.push(tx);
        }
        // console.log(mainTxs);
        return mainTxs;
    }
}


// async function getOutgoingAddressHistory() {
//     console.log(address);
//     if (address) {
//         const response = await axios.post(url, {
//             jsonrpc: "2.0",
//             id: 1,
//             method: "alchemy_getAssetTransfers",
//             "params": {
//                 "fromAddress": address,
//                 "category": ["external", "internal", "erc20", "erc721", "erc1155"]
//             },
//         });
//         console.log(response.data.result);
//         return response.data.result;
//     }
// }
// async function getIncomingAddressHistory() {
//     console.log(address);
//     if (address) {
//         const response = await axios.post(url, {
//             jsonrpc: "2.0",
//             id: 1,
//             method: "alchemy_getAssetTransfers",
//             "params": {
//                 "toAddress": address,
//                 "category": ["external", "internal", "erc20", "erc721", "erc1155"]
//             },
//         });
//         console.log(response.data.result);
//         return response.data.result;
//     }
// }

