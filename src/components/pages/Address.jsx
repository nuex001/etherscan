import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import "../../assets/address.css"
import { IoCaretBack } from 'react-icons/io5';
import { BiSolidCopy } from 'react-icons/bi';
import { getExternalTransactions, getInternalTransactions, getNftTransactions, getTokenTransactions } from '../utils/fetchTxsFunc';
import { toDecimal, cutAndAppend, truncateMiddle } from '../utils/textMethods';

function Address() {
    const [txs, setTxs] = useState([]);
    const btnRef = useRef([]);
    const { address } = useParams();

    const filterTx = async (idx) => {
        btnRef.current.forEach((btn, buttonIdx) => {
            if (buttonIdx === idx) {
                btn.classList.add("active");
            } else {
                btn.classList.remove("active");
            }
        });
        // working for functions
        if (idx === 0) {
            const tx = await getExternalTransactions(address);
            setTxs(tx);
        } else if (idx === 1) {
            const tx = await getInternalTransactions(address);
            setTxs(tx);
        } else if (idx === 2) {
            const tx = await getTokenTransactions(address);
            setTxs(tx);
        } else if (idx === 3) {
            const tx = await getNftTransactions(address);
            setTxs(tx);
        }
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
    }

    const back = () => {
        history.back();
    }
    const fetchfirstTx = async () => {
        if (address) {
            const tx = await getExternalTransactions(address);
            setTxs(tx);
        }
    }
    useEffect(() => {
        fetchfirstTx();
    }, [address])

    /**
     *@CONTROLS -> y'all might be asking why i didn't use map for the buttons, but i wanted to use the index for the transactions and it might conflict because it's just plainly using thier index in the array
     */
    return (
        <div className="address">
            <nav>
                <IoCaretBack className='icon' onClick={back} />
            </nav>
            <header>
                <div className="addr">
                    <p>{address}</p>
                    <BiSolidCopy className='copy' onClick={() => copyToClipboard(address)} />
                </div>
                <div className="controls">
                    <button className='active' ref={(el) => (btnRef.current[0] = el)}
                        onClick={() => filterTx(0)}
                    >Transactions</button>
                    <button ref={(el) => (btnRef.current[1] = el)}
                        onClick={() => filterTx(1)}
                    >Internal Transactions</button>
                    <button ref={(el) => (btnRef.current[2] = el)}
                        onClick={() => filterTx(2)}
                    >Token Transfers (ERC-20)</button>
                    <button ref={(el) => (btnRef.current[3] = el)}
                        onClick={() => filterTx(3)}
                    >NFT Transfers</button>
                </div>
            </header>
            <div className="box">
                <table>
                    <thead>
                        <tr>
                            <th>Transaction Hash</th>
                            <th>Block</th>
                            <th>from</th>
                            <th>to</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txs
                            &&
                            txs.map((tx, idx) => (
                                <tr key={idx}>
                                    <td>
                                        <Link to={`/txhash/${tx.hash}`}>{cutAndAppend(tx.hash)}</Link>
                                    </td>
                                    <td>{Number(tx.blockNum)}</td>
                                    <td>
                                        <Link to={`/addr/${tx.from}`}>{truncateMiddle(tx.from)}</Link>
                                    </td>
                                    <td>
                                        <Link to={`/addr/${tx.to}`}>{truncateMiddle(tx.to)}</Link>
                                    </td>
                                    <td>{toDecimal(tx.value)}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Address