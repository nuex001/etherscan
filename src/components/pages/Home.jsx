import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai"
import { BiCube, BiReceipt } from "react-icons/bi"
import { cutAndAppend, truncateMiddle, convertWeiToEth } from '../utils/textMethods';
import { Link , useNavigate} from 'react-router-dom';
function Home() {
    const [blocks, setBlocks] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const navigate = useNavigate();
    const url = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_API}`;

    async function getBlockNumber() {
        const response = await axios.post(url, {
            jsonrpc: "2.0",
            id: 1,
            method: "eth_blockNumber",
        });

        return response.data.result;

    }
    /**
        * @fetchfirstBlockTransaction -> 
        * we fetch the transactions using alchemy api and our latest block number,we get all our tx(transactions) and we go cut out only the first 7 tx
        */
    const fetchfirstBlockTransaction = async (block) => {
        if (block > 0) {
            const response = await axios.post(url, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                "params": [block, true],
            });
            const transactions = response.data.result.transactions;
            if (block > 0) {
                const newTxNo = transactions.length - 8;
                const updatedTx = [];
                for (let i = transactions.length - 1; i >= newTxNo; i--) {
                    updatedTx.push(transactions[i]);
                }
                setTransactions(updatedTx);
            }
        }
    }
    /**
     * @GETBLOCKNONCE -> 
     * we fetch the blocknonce using alchemy api, we convert it to number because it comes in hexa form, then we decrease
     */
    const fetchblocknonce = async () => {
        const rawBlocknumber = await getBlockNumber();
        // console.log(rawBlocknumber);
        const block = parseInt(rawBlocknumber, 16);
        if (block > 0) {
            const newBlock = block - 7;
            const updatedBlocks = [];
            // console.log(nonce , newBlock);
            for (let i = block; i >= newBlock; i--) {
                updatedBlocks.push(i);
            }
            setBlocks(updatedBlocks);
            fetchfirstBlockTransaction(rawBlocknumber);
        }
    }

    /**
     * @submit
     */
    const submit = (e) => {
        e.preventDefault();
        // console.log(e.target.address.value);
        navigate(`/addr/${e.target.address.value}`)
    }

    useEffect(() => {
        fetchblocknonce();
    }, [])
    return (
        <div className="home">
            <form action="" onSubmit={submit}>
                <div className="innerBox">
                    <input type="text" name='address' />
                    <button>
                        <AiOutlineSearch className='icon' />
                    </button>
                </div>
            </form>
            <div className="box block">
                <h1>Latest Block</h1>
                <hr />
                {
                    blocks &&
                    blocks.map((list) => (
                        <React.Fragment key={list}>
                            <div className="row">
                                <div className="cubebox">
                                    <BiCube className='icon' />
                                </div>
                                <Link to={`block/${list}`}>{list}</Link>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))}
            </div>
            <div className="box tx">
                <h1>Latest Transactions</h1>
                <hr />
                {
                    transactions &&
                    transactions.map((tx, idx) => (
                        <React.Fragment key={idx}>
                            <div className="row">
                                <div className="cubebox">
                                    <BiReceipt className='icon' />
                                </div>
                                <div className="subrow">
                                    <Link to={`/txhash/${tx.hash}`} className='hash'>{cutAndAppend(tx.hash)}</Link>
                                    <ul className="subtx">
                                        <li> From <Link to={`/addr/${tx.from}`}>{truncateMiddle(tx.from)}</Link></li>
                                        <li> To <Link to={`/addr/${tx.to}`}>{truncateMiddle(tx.to)}</Link></li>
                                    </ul>
                                    <p>{convertWeiToEth(tx.value)} Eth</p>
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    ))
                }

            </div>
        </div>
    )
}

export default Home