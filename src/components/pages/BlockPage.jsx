import React, { useEffect, useState } from 'react'
import { HiBackspace } from 'react-icons/hi';
import { BsQuestionCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom'
import "../../assets/blockPage.css"
import axios from 'axios';
import { convertScientificNotation, convertTimestamp, truncateMiddle } from '../utils/textMethods';

function BlockPage() {
    const [blockDetails, setBlockDetails] = useState(null);
    const { block } = useParams();
    const url = `https://eth-mainnet.g.alchemy.com/v2/${import.meta.env.VITE_API}`;

    async function getBlockNumber() {
        if (block) {
            const hexCode = "0x" + parseInt(block).toString(16);
            const response = await axios.post(url, {
                jsonrpc: "2.0",
                id: 1,
                method: "eth_getBlockByNumber",
                params: [hexCode, true]
            });
            setBlockDetails(response.data.result);
            // console.log(response.data.result);
        }
    }

    const back = () => {
        history.back();
    }

    useEffect(() => {
        getBlockNumber();
    }, [])
    return (
        <div className="blockPage">
            <nav>
                <HiBackspace className='icon' onClick={back} />
                <h1>Block <span>#{block}</span></h1>
            </nav>
            <div className="box">
                {
                    blockDetails &&
                    <React.Fragment >
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Block Height:</li>
                            <li>{block}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' /> Timestamp:</li>
                            <li>{convertTimestamp(blockDetails.timestamp)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' /> Transactions:</li>
                            <li>{blockDetails.transactions.length} transactions </li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' /> Withdrawals:</li>
                            <li>{blockDetails.withdrawals.length}  withdrawals in this block</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />miner:</li>
                            <li><Link to={`/addr/${blockDetails.miner}`}>{truncateMiddle(blockDetails.miner)}</Link></li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />size:</li>
                            <li>{Number(blockDetails.size)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Gas Used:</li>
                            <li>{Number(blockDetails.gasUsed)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Gas Limit:</li>
                            <li>{Number(blockDetails.gasLimit)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' /> Base Fee Per Gas:</li>
                            <li>{Number(blockDetails.baseFeePerGas)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' /> Total Difficulty:</li>
                            <li>{convertScientificNotation(blockDetails.totalDifficulty)}</li>
                        </ul>
                        <ul className="row">
                            <li><BsQuestionCircle className='icon' />Nonce:</li>
                            <li>{Number(blockDetails.nonce)}</li>
                        </ul>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default BlockPage