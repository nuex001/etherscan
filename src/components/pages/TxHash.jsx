
import React, { useEffect, useState } from 'react'
import { HiBackspace } from 'react-icons/hi';
import { BsQuestionCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom'
import "../../assets/blockPage.css"
import axios from 'axios';
import { convertWeiToEth } from '../utils/textMethods';

function TxHash() {
    const [tx, setTx] = useState(null);
    const { hash } = useParams();
    const url = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_API}`;

    async function getTxHashDetails() {
        // console.log(hash);
        if (hash) {
            const response = await axios.post(url, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getTransactionByHash",
                params: [hash]
            });
            setTx(response.data.result);
            // console.log(response.data.result);
        }
    }

    const back = () => {
        history.back();
    }

    useEffect(() => {
        getTxHashDetails();
    }, [])
    return (
        <div className="blockPage">
            <nav>
                <HiBackspace className='icon' onClick={back} />
                {/* <h1>Block <span>#{block}</span></h1> */}
            </nav>
            <div className="box">
                {
                    tx &&
                    <React.Fragment >
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Transaction Hash:</li>
                            <li>{hash}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Block:</li>
                            <li>{Number(tx.blockNumber)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />From:</li>
                            <li><Link to={`/addr/${tx.from}`}>{tx.from}</Link></li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />To:</li>
                            <li><Link to={`/addr/${tx.to}`}>{tx.to}</Link></li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />value:</li>
                            <li>{convertWeiToEth(tx.value)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />chainId:</li>
                            <li>{Number(tx.chainId)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Gas:</li>
                            <li>{Number(tx.gas)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Gas Price:</li>
                            <li>{Number(tx.gasPrice)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Max Fee Per Gas:</li>
                            <li>{Number(tx.maxFeePerGas)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Transaction Index:</li>
                            <li>{Number(tx.transactionIndex)}</li>
                        </ul>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default TxHash