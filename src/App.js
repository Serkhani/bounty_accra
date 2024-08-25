import "./App.css";
import Web3 from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from "react-hot-toast";
import JSBI from 'jsbi';


var feedsThatWork = {
    "1inchEth": "0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8",
    "1inchUsd": "0xc929ad75B72593967DE83E7F7Cda0493458261D9",
    "AaveEth": "0x6Df09E975c830ECae5bd4eD9d90f3A95a4f88012",
    "AaveUsd": "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9",
    "AlcxEth": "0x194a9AaF2e0b67c35915cD01101585A33Fe25CAa",
    "AmplEth": "0x492575FDD11a0fCf2C6C719867890a7648d526eB",
    "AmplUsd": "0xe20CA8D7546932360e37E9D72c1a47334af57706",
    "ApeEth": "0xc7de7f4d4C9c991fF62a07D18b3E31e349833A18",
    "ApeUsd": "0xD10aBbC76679a20055E167BB80A24ac851b37056",
    "AudUsd": "0x77F9710E7d0A19669A13c055F62cd80d313dF022",
    "AvaxUsd": "0xFF3EEb22B5E3dE6e705b44749C2559d704923FD7",
    "BadgerEth": "0x58921Ac140522867bf50b9E009599Da0CA4A2379",
    "BalEth": "0xC1438AA3823A6Ba0C159CfA8D98dF5A994bA120b",
    "BalUsd": "0xdF2917806E30300537aEB49A7663062F4d1F2b5F",
    "BatEth": "0x0d16d4528239e9ee52fa531af613AcdB23D88c94",
    "BatUsd": "0x9441D7556e7820B5ca42082cfa99487D56AcA958",
    "BnbUsd": "0x14e613AC84a31f709eadbdF89C6CC390fDc9540A",
    "BtcEth": "0xdeb288F737066589598e9214E782fa5A8eD689e8",
    "BtcUsd": "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    "BusdUsd": "0x833D8Eb16D306ed1FbB5D7A2E019e106B960965A",
    "CadUsd": "0xa34317DB73e77d453b1B8d04550c44D10e981C8e",
    "ChfUsd": "0x449d117117838fFA61263B61dA6301AA2a88B13A",
    "CnyUsd": "0xeF8A4aF35cd47424672E3C590aBD37FBB7A7759a",
    "CompEth": "0x1B39Ee86Ec5979ba5C322b826B3ECb8C79991699",
    "CompUsd": "0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5",
    "CrvEth": "0x8a12Be339B0cD1829b91Adc01977caa5E9ac121e",
    "CrvUsd": "0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f",
    "CvxEth": "0xC9CbF687f43176B302F03f5e58470b77D07c61c6",
    "CvxUsd": "0xd962fC30A72A84cE50161031391756Bf2876Af5D",
    "CalculatedxSushiEth": "0xF05D9B6C08757EAcb1fbec18e36A1B7566a13DEB",
    "DaiEth": "0x773616E4d11A78F511299002da57A0a94577F1f4",
    "DaiUsd": "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    "DpiEth": "0x029849bbc0b1d93b85a8b6190e979fd38F5760E2",
    "DpiUsd": "0xD2A593BF7594aCE1faD597adb697b5645d5edDB2",
    "EnjEth": "0x24D9aB51950F3d62E9144fdC2f3135DAA6Ce8D1B",
    "EnsUsd": "0x5C00128d4d1c2F4f652C267d7bcdD7aC99C16E16",
    "EthBtc": "0xAc559F25B1619171CbC396a50854A3240b6A4e99",
    "EthUsd": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    "EurUsd": "0xb49f677943BC038e9857d61E7d053CaA2C1734C1",
    "FilEth": "0x0606Be69451B1C9861Ac6b3626b99093b713E801",
    "FraxEth": "0x14d04Fff8D21bd62987a5cE9ce543d2F1edF5D3E",
    "FraxUsd": "0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD",
    "FtmEth": "0x2DE7E4a9488488e0058B95854CC2f7955B35dC9b",
    "FttEth": "0xF0985f7E2CaBFf22CecC5a71282a89582c382EFE",
    "FxsUsd": "0x6Ebc52C8C1089be9eB3945C4350B68B8E4C2233f",
    "FastgasGwei": "0x169E633A2D1E6c10dD91238Ba11c4A708dfEF37C",
    "GbpUsd": "0x5c0Ab2d9b5a7ed9f470386e82BB36A3613cDd4b5",
    "GrtEth": "0x17D054eCac33D91F7340645341eFB5DE9009F1C1",
    "GrtUsd": "0x86cF33a451dE9dc61a2862FD94FF4ad4Bd65A5d2",
    "ImxUsd": "0xBAEbEFc1D023c0feCcc047Bff42E75F15Ff213E6",
    "JpyUsd": "0xBcE206caE7f0ec07b545EddE332A47C2F75bbeb3",
    "KncEth": "0x656c0544eF4C98A6a98491833A89204Abb045d6b",
    "KncUsd": "0xf8fF43E991A81e6eC886a3D281A2C6cC19aE70Fc",
    "KrwUsd": "0x01435677FB11763550905594A16B645847C1d0F3",
    "LdoEth": "0x4e844125952D32AcdF339BE976c98E22F6F318dB",
    "LinkEth": "0xDC530D9457755926550b59e8ECcdaE7624181557",
    "LinkUsd": "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c",
    "LrcEth": "0x160AC928A16C93eD4895C2De6f81ECcE9a7eB7b4",
    "LusdUsd": "0x3D7aE7E594f2f2091Ad8798313450130d0Aba3a0",
    "ManaEth": "0x82A44D92D6c329826dc557c5E1Be6ebeC5D5FeB9",
    "MaticUsd": "0x7bAC85A8a13A4BcD8abb3eB7d6b4d632c5a57676",
    "MimUsd": "0x7A364e8770418566e3eb2001A96116E6138Eb32F",
    "MkrEth": "0x24551a8Fb2A7211A25a17B1481f043A8a8adC7f2",
    "MkrUsd": "0xec1D1B3b0443256cc3860e24a46F108e699484Aa",
    "MlnEth": "0xDaeA8386611A157B08829ED4997A8A62B557014C",
    "NzdUsd": "0x3977CFc9e4f29C184D4675f4EB8e0013236e5f3e",
    "NexusWethReserves": "0xCc72039A141c6e34a779eF93AEF5eB4C82A893c7",
    "Ohmv2Eth": "0x9a72298ae3886221820B1c878d12D872087D3a23",
    "PaxEth": "0x3a08ebBaB125224b7b6474384Ee39fBb247D2200",
    "PaxgEth": "0x9B97304EA12EFed0FAd976FBeCAad46016bf269e",
    "PerpEth": "0x3b41D5571468904D4e53b6a8d93A6BaC43f02dC9",
    "RaiEth": "0x4ad7B025127e89263242aB68F0f9c4E5C033B489",
    "RenEth": "0x3147D7203354Dc06D9fd350c7a2437bcA92387a4",
    "SandUsd": "0x35E3f7E558C04cE7eEE1629258EcbbA03B36Ec56",
    "SgdUsd": "0xe25277fF4bbF9081C75Ab0EB13B4A13a721f3E13",
    "ShibEth": "0x8dD1CD88F43aF196ae478e91b9F5E4Ac69A97C61",
    "SnxEth": "0x79291A9d692Df95334B1a0B3B4AE6bC606782f8c",
    "SnxUsd": "0xDC3EA94CD0AC27d9A86C180091e7f78C683d3699",
    "SolUsd": "0x4ffC43a60e009B551865A93d232E33Fce9f01507",
    "SpellUsd": "0x8c110B94C5f1d347fAcF5E1E938AB2db60E3c9a8",
    "StethEth": "0x86392dC19c0b719886221c78AB11eb8Cf5c52812",
    "SusdEth": "0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757",
    "SushiEth": "0xe572CeF69f43c2E488b33924AF04BDacE19079cf",
    "SushiUsd": "0xCc70F09A6CC17553b2E31954cD36E4A2d89501f7",
    "SxpUsd": "0xFb0CfD6c19e25DB4a08D8a204a387cEa48Cc138f",
    "SynthetixAggregatorDebtRatio": "0x0981af0C002345c9C5AD5efd26242D0cBe5aCA99",
    "SynthetixAggregatorIssuedSynths": "0xbCF5792575bA3A875D8C406F4E7270f51a902539",
    "TryUsd": "0xB09fC5fD3f11Cf9eb5E1C5Dba43114e3C9f477b5",
    "TusdEth": "0x3886BA987236181D98F2401c507Fb8BeA7871dF2",
    "TusdUsd": "0xec746eCF986E2927Abd291a2A1716c940100f8Ba",
    "TotalMarketcapUsd": "0xEC8761a0A73c34329CA5B1D3Dc7eD07F30e836e2",
    "UniEth": "0xD6aA3D25116d8dA79Ea0246c4826EB951872e02e",
    "UniUsd": "0x553303d460EE0afB37EdFf9bE42922D8FF63220e",
    "UsdcEth": "0x986b5E1e1755e3C2440e960477f25201B0a8bbD4",
    "UsdcUsd": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
    "UsdpUsd": "0x09023c0DA49Aaf8fc3fA3ADF34C6A7016D38D5e3",
    "UsdtEth": "0xEe9F2375b4bdF6387aa8265dD4FB8F16512A1d46",
    "UsdtUsd": "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
    "WbtcBtc": "0xfdFD9C85aD200c506Cf9e21F1FD8dd01932FBB23",
    "XagUsd": "0x379589227b15F1a12195D3f2d90bBc9F31f95235",
    "XauUsd": "0x214eD9Da11D2fbe465a6fc601a91E62EbEc1a0D6",
    "XcnUsd": "0xeb988B77b94C186053282BfcD8B7ED55142D3cAB",
    "YfiEth": "0x7c5d4F8345e66f68099581Db340cd65B078C41f4",
    "YfiUsd": "0xA027702dbb89fbd58938e4324ac03B58d812b0E1",
    "ZrxEth": "0x2Da4983a622a8498bb1a21FaE9D8F6C664939962",
    "ZrxUsd": "0x2885d15b8Af22648b98B122b22FDF4D2a56c6023",
}
const web3 = new Web3(window.ethereum);
web3.registerPlugin(new ChainlinkPlugin());

const FeedSelector = ({ player, selectedOptions, setSelectedOptions, initialPrices, finalPrices }) => {

    const handleSelectChange = (event) => {
        const value = event.target.value;
        if (value && selectedOptions.length < 10) {
            setSelectedOptions((prevSelected) => {
                if (!prevSelected.includes(value)) {
                    return [...prevSelected, value];
                }
                return prevSelected;
            });
        }
    };

    const handleRemoveOption = (value) => {
        setSelectedOptions((prevSelected) => prevSelected.filter((option) => option !== value));
    };

    return (
        <div className="player">
            <h3>Player {player} Feed Selector</h3>
            <select onChange={handleSelectChange} disabled={selectedOptions.length >= 10}>
                <option value="">Select a Feed</option>
                {Object.keys(feedsThatWork).map((feedKey) => (
                    <option key={feedKey} value={feedKey}>
                        {feedKey}
                    </option>
                ))}
            </select>

            <div className="selected-options">
                <h4>Selected Feeds:</h4>

                <div className="selected-option">
                    <span>Remove</span>
                    <span>Feed</span>
                    <span>OldPrice</span>
                    <span>NewPrice</span>
                </div>
                {selectedOptions.map((option) => (
                    <div key={option} className="selected-option">
                        <button onClick={() => handleRemoveOption(option)}><span>X</span></button>
                        <span>{option}</span>
                        {initialPrices && <span>${initialPrices[option].answer.toString()}</span>}
                        {finalPrices && <span>${finalPrices[option].answer.toString()}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

const App = () => {
    const [player1SelectedFeed, setPlayer1SelectedFeed] = useState([]);
    const [player2SelectedFeed, setPlayer2SelectedFeed] = useState([]);
    const [waitingTime, setWaitingTime] = useState(2);
    const [timer, setTimer] = useState(waitingTime);
    const [initialPrices, setInitialPrices] = useState(null);
    const [finalPrices, setFinalPrices] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (timer > 0 && isPlaying) {
            const interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
        else if (timer === 0 && isPlaying) {
            setTimer(waitingTime);
            fetchFinalPrices();
            clearImmediate();
        }
    }, [timer, isPlaying]);

    const fetchPrices = async (feeds) => {
        console.log("feeds:", feeds)
        const prices = {};
        for (let feed of feeds) {
            prices[feed] = await web3.chainlink.getPrice(feedsThatWork[feed]);
        }
        return prices;
    };

    const startGame = async () => {
        // TODO: change to 10
        if (player1SelectedFeed.length === 1 && player2SelectedFeed.length === 1) {
            setIsPlaying(true);
            const prices = await fetchPrices([...player1SelectedFeed, ...player2SelectedFeed]);
            setInitialPrices(prices);
            setTimer(waitingTime);
        } else {
            toast.error('Each player must select 10 feeds.');
        }
    };


    const fetchFinalPrices = async () => {
        const prices = await fetchPrices([...player1SelectedFeed, ...player2SelectedFeed]);
        setFinalPrices(prices);
        determineWinner(prices);
        setIsPlaying(false);
    };


    const determineWinner = (prices) => {
        let player1Score = JSBI.BigInt(0);
        let player2Score = JSBI.BigInt(0);
        console.log("initialPrices:", initialPrices);
        console.log("finalPrices:", finalPrices);

        player1SelectedFeed.forEach(feed => {
            console.log("pr1", initialPrices)
            const initialPrice = initialPrices[feed].answer;
            const finalPrice = prices[feed].answer
            const change = JSBI.subtract(finalPrice, initialPrice);
            player1Score = JSBI.add(player1Score, change);
        });

        player2SelectedFeed.forEach(feed => {
            console.log("pr2", initialPrices)
            const initialPrice = initialPrices[feed].answer;
            const finalPrice = prices[feed].answer
            const change = JSBI.subtract(finalPrice, initialPrice);
            player2Score = JSBI.add(player2Score, change);
        });
        console.log(player1Score, player2Score)
        if (JSBI.greaterThan(player1Score, player2Score)) {
            toast.success("Player 1 wins!");
        } else if (JSBI.lessThan(player1Score, player2Score)) {
            toast.success("Player 2 wins!");
        } else {
            toast.error("It's a draw!");
        }
    };


    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            <div className="App">
                <header>Mainnet Price Feeds Selector</header>
                <div className="container">
                    <FeedSelector
                        player="1"
                        initialPrices={initialPrices}
                        finalPrices={finalPrices}
                        selectedOptions={player1SelectedFeed}
                        setSelectedOptions={setPlayer1SelectedFeed}
                    />
                    <FeedSelector
                        player="2"
                        initialPrices={initialPrices}
                        finalPrices={finalPrices}
                        selectedOptions={player2SelectedFeed}
                        setSelectedOptions={setPlayer2SelectedFeed}
                    />
                </div>
                <div className="controls">
                    <label>
                        Select Waiting Time (seconds):
                        <input
                            type="number"
                            value={waitingTime}
                            onChange={(e) => setWaitingTime(e.target.value)}
                            min="1"
                        />
                    </label>
                    <button className="play-button" onClick={() => startGame()} disabled={isPlaying} color={isPlaying ? "grey" : "blue"}>
                        Play
                    </button>
                </div>
                {isPlaying && (
                    <div className="countdown">
                        <h3>Countdown: {timer} seconds</h3>
                    </div>
                )}
            </div>
        </>
    );
};

export default App;


{/* <div className="result">
                    <h2>Selected Feeds</h2>
                    <p>Player 1 Feeds: {player1SelectedFeed.join(", ")}</p>
                    <p>Player 2 Feeds: {player2SelectedFeed.join(", ")}</p>
                </div> */}



// feeds = Object.entries(MainnetPriceFeeds);
// var mapping = new Map()
// const getPrice = async (feedAddress) => {
//     try {
//         var price = await web3.chainlink.getPrice(feedAddress[1])
//         mapping.set(feedAddress[0], feedAddress[1])
//     }
//     catch (e) {
//     }
//     return price
// };
// feeds.map((feed) => {
//     getPrice(feed).then(price => {
//         // console.log(feed, " Price in USD:", price);
//     });

// });
// console.log(mapping)
// for (var f in feeds) {
//     try {
//         getPrice(feeds[f]).then(price => {
//             console.log(f, " Price in USD:", price);
//         });
//     } catch (e) {
//         // console.log(f)
//     }
// }

// const feedsThatDontWork = new Map(Object.entries(
//     {"FarmEth" : "0x611E0d2709416E002A3f38085e4e1cf77c015921"},
//     {"FbUsd" : "0xCe1051646393087e706288C1B57Fd26446657A7f"},
//     {"ErnUsd" : "0x0a87e12689374A4EF49729582B474a1013cceBf8"},
//     {"ForthUsd" : "0x7D77Fd73E468baECe26852776BeaF073CDc55fA0"},
//     {"EurtUsd" : "0x01D391A48f4F7339aC64CA2c83a07C22F95F587a"},
//     {"AaplUsd" : "0x139C8512Cde1778e9b9a8e721ce1aEbd4dD43587"},
//     {"DataEth" : "0xD48B96131F3de05B7C3500891C8c4c1E2dbc6E3d"},
//     {"C98Usd" : "0xE95CDc33E1F5BfE7eB26f45E29C6C9032B97db7F"},
//     {"DiaUsd" : "0xeE636E1f7A0A846EEc2385E729CeA7D1b339D40D"},
//     {"BntUsd" : "0x1E6cF0D433de4FE882A437ABC654F58E1e78548c"},
//     {"FoxUsd" : "0xccA02FFEFAcE21325befD6616cB4Ba5fCB047480"},
//     {"FlowUsd" : "0xD9BdD9f5ffa7d89c846A5E3231a093AE4b3469D2"},
//     {"GnoEth" : "0xA614953dF476577E90dcf4e3428960e221EA4727"},
//     {"DodoUsd" : "0x9613A51Ad59EE375e6D8fa12eeef0281f1448739"},
//     {"CelEth" : "0x75FbD83b4bd51dEe765b2a01e8D3aa1B020F9d33"},
//     {"BntEth" : "0xCf61d1841B178fe82C8895fe60c2EDDa08314416"},
//     {"BadgerUsd" : "0x66a47b7206130e6FF64854EF0E1EDfa237E65339"},
//     {"CeloEth" : "0x9ae96129ed8FE0C707D6eeBa7b90bB1e139e543e"},
//     {"IlvEth" : "0xf600984CCa37cd562E74E3EE514289e3613ce8E4"},
//     {"FeiEth" : "0x7F0D2c2838c6AC24443d13e23d99490017bDe370"},
//     {"BetaEth" : "0x8eb7bAe1eCd3dcf87159Eb5BACe78209722F795B"},
//     {"ForUsd" : "0x456834f736094Fb0AAD40a9BBc9D4a0f37818A54"},
//     {"CakeUsd" : "0xEb0adf5C06861d6c07174288ce4D0a8128164003"},
//     {"BchUsd" : "0x9F0F69428F923D6c95B781F89E165C9b2df9789D"},
//     {"BrlUsd" : "0x971E8F1B779A5F1C36e1cd7ef44Ba1Cc2F5EeE0f"},
//     {"GhstEth" : "0x5877385f9F51B46Bbd93F24AD278D681E1Fd2A93"},
//     {"BondEth" : "0xdd22A54e05410D8d1007c38b5c7A3eD74b855281"},
//     {"EtcUsd" : "0xaEA2808407B7319A31A383B6F8B60f04BCa23cE2"},
//     {"BandUsd" : "0x919C77ACc7373D000b329c1276C76586ed2Dd19F"},
//     {"BnbEth" : "0xc546d2d06144F9DD42815b8bA46Ee7B8FcAFa4a2"},
//     {"FttUsd" : "0x84e3946C6df27b453315a1B38e4dECEF23d9F16F"},
//     {"HusdEth" : "0x1B61BAD1495161bCb6C03DDB0E41622c0270bB1A"},
//     {"FeiUsd" : "0x31e0a88fecB6eC0a411DBe0e9E76391498296EE9"},
//     {"GlmUsd" : "0x83441C3A10F4D05de6e0f2E849A850Ccf27E6fa7"},
//     {"GooglUsd" : "0x36D39936BeA501755921beB5A382a88179070219"},
//     {"BandEth" : "0x0BDb051e10c9718d1C29efbad442E88D38958274"},
//     {"CalculatedxSushiUsd" : "0xCC1f5d9e6956447630d703C8e93b2345c2DE3D13"},
//     {"DashUsd" : "0xFb0cADFEa136E9E343cfb55B863a6Df8348ab912"},
//     {"EnjUsd" : "0x23905C55dC11D609D5d11Dc604905779545De9a7"},
//     {"DotUsd" : "0x1C07AFb8E2B827c5A4739C6d59Ae3A5035f28734"},
//     {"DydxUsd" : "0x478909D4D798f3a1F11fFB25E4920C959B4aDe0b"},
//     {"CvIndex" : "0x1B58B67B2b2Df71b4b0fb6691271E83A0fa36aC5"},
//     {"DogeUsd" : "0x2465CefD3b488BE410b941b1d4b2767088e2A028"},
//     {"BusdEth" : "0x614715d2Af89E6EC99A233818275142cE88d1Cfd"},
//     {"CroUsd" : "0x00Cb80Cf097D9aA9A3779ad8EE7cF98437eaE050"},
//     {"CtsiEth" : "0x0a1d1b9847d602e789be38B802246161FFA24930"},
//     {"CsprUsd" : "0x9e37a8Ee3bFa8eD6783Db031Dc458d200b226074"},
//     {"CreamEth" : "0x82597CFE6af8baad7c0d441AA82cbC3b51759607"},
//     {"CroEth" : "0xcA696a9Eb93b81ADFE6435759A29aB4cf2991A96"},
//     {"BtcDifficulty" : "0xA792Ebd0E4465DB2657c7971519Cfa0f0275F428"},
//     {"TribeEth" : "0x84a24deCA415Acc0c395872a9e6a63E27D6225c8"},
//     {"PhpUsd" : "0x9481e7ad8BE6BbB22A8B9F7B9fB7588d1df65DF6"},
//     {"TomoUsd" : "0x3d44925a8E9F9DFd90390E58e92Ec16c996A331b"},
//     {"PlaUsd" : "0xbc535B134DdF81fc83254a3D0Ed2C0C60144405E"},
//     {"WnxmEth" : "0xe5Dc0A609Ab8bCF15d3f35cFaa1Ff40f521173Ea"},
//     {"BtcHeight" : "0x4D2574c790d836b8C886615d927e9BA585B10EbA"},
//     {"SpyUsd" : "0x065B8808087C2d7A3C104E276C80Fe6Fc1B47f1c"},
//     {"ReqUsd" : "0x2F05888D185970f178f40610306a0Cc305e52bBF"},
//     {"RariEth" : "0x2a784368b1D492f458Bf919389F42c18315765F5"},
//     {"RepEth" : "0xD4CE430C3b67b3E2F7026D86E7128588629e2455"},
//     {"PhaUsd" : "0x2B1248028fe48864c4f1c305E524e2e6702eAFDF"},
//     {"RlcEth" : "0x4cba1e1fdc738D0fe8DB3ee07728E2Bc4DA676c6"},
//     {"TokeUsd" : "0x104cD02b2f22972E8d8542867a36bDeDA4f104d8"},
//     {"TruUsd" : "0x26929b85fE284EeAB939831002e1928183a10fb1"},
//     {"PerpUsd" : "0x01cE1210Fe8153500F60f7131d63239373D7E26C"},
//     {"RuneEth" : "0x875D60C44cfbC38BaA4Eb2dDB76A767dEB91b97e"},
//     {"RaiUsd" : "0x483d36F6a1d063d580c7a24F9A42B346f3a69fbb"},
//     {"QqqUsd" : "0x6b54e83f44047d2168a195ABA5e9b768762167b5"},
//     {"RenUsd" : "0x0f59666EDE214281e956cb3b2D0d69415AfF4A01"},
//     {"UmeeEth" : "0xa554F3a8D05f22aC7e105311211AAbAf727e1CcB"},
//     {"MsftUsd" : "0x021Fb44bfeafA0999C7b07C4791cf4B859C3b431"},
//     {"UmaEth" : "0xf817B69EA583CAFF291E287CaE00Ea329d22765C"},
//     {"EosUsd" : "0x10a43289895eAff840E8d45995BBa89f9115ECEe"},
//     {"NmrEth" : "0x9cB2A01A7E64992d32A34db7cEea4c919C391f6A"},
//     {"YfiiEth" : "0xaaB2f6b45B28E962B3aCd1ee4fC88aEdDf557756"},
//     {"SrmEth" : "0x050c048c9a0CD0e76f166E2539F87ef2acCEC58f"},
//     {"OrchidBandwidth" : "0xa175FA75795c6Fb2aFA48B72d22054ee0DeDa4aC"},
//     {"OxtUsd" : "0xd75AAaE4AF0c398ca13e2667Be57AF2ccA8B5de6"},
//     {"WingUsd" : "0x134fE0a225Fb8e6683617C13cEB6B3319fB4fb82"},
//     {"SusdUsd" : "0xad35Bd71b9aFE6e4bDc266B345c198eaDEf9Ad94"},
//     {"TslaUsd" : "0x1ceDaaB50936881B3e449e47e40A2cDAF5576A4a"},
//     {"XrpUsd" : "0xCed2660c6Dd1Ffd856A5A82C67f3482d88C50b12"},
//     {"ManaUsd" : "0x56a4857acbcfe3a66965c251628B1c9f1c408C19"},
//     {"NearUsd" : "0xC12A6d1D827e23318266Ef16Ba6F397F2F91dA9b"},
//     {"XmrUsd" : "0xFA66458Cce7Dd15D8650015c4fce4D278271618F"},
//     {"OmgEth" : "0x57C9aB3e56EE4a83752c181f241120a3DBba06a1"},
//     {"OrnEth" : "0xbA9B2a360eb8aBdb677d6d7f27E12De11AA052ef"},
//     {"UsdkUsd" : "0xfAC81Ea9Dd29D8E9b212acd6edBEb6dE38Cb43Af"},
//     {"XsushiEth" : "0x7f59A29507282703B4A796D02cAcf23388FfF00D"},
//     {"XlmUsd" : "0x64168007BAcbB5fF3f52639db22C6300827f5036"},
//     {"OmgUsd" : "0x7D476f061F8212A8C9317D5784e72B4212436E93"},
//     {"NflxUsd" : "0x67C2e69c5272B94AF3C90683a9947C39Dc605ddE"},
//     {"WtiUsd" : "0xf3584F4dd3b467e73C2339EfD008665a70A4185c"},
//     {"UsdnUsd" : "0x7a8544894F7FD0C69cFcBE2b4b2E277B0b9a4355"},
//     {"OntUsd" : "0xcDa3708C5c2907FCca52BB3f9d3e4c2028b89319"},
//     {"OmUsd" : "0xb9583cfBdEeacd2705546F392E43F8E03eB92216"},
//     {"KsmUsd" : "0x06E4164E24E72B879D93360D1B9fA05838A62EB5"},
//     {"OkbUsd" : "0x22134617Ae0f6CA8D89451e5Ae091c94f7D743DC"},
//     {"InjUsd" : "0xaE2EbE3c4D20cE13cE47cbb49b6d7ee631Cd816e"},
//     {"LonEth" : "0x13A8F2cC27ccC2761ca1b21d2F3E762445f201CE"},
//     {"IotxUsd" : "0x96c45535d235148Dc3ABA1E48A6E3cFB3510f4E2"},
//     {"IostUsd" : "0xd0935838935349401c73a06FCde9d63f719e84E5"},
//     {"LtcUsd" : "0x6AF09DF7563C363B5763b9102712EbeD3b9e859B"},
//     {"GtcEth" : "0x0e773A17a01E2c92F5d4c53435397E2bd48e215F"},
//     {"HtUsd" : "0xE1329B3f6513912CAf589659777b66011AEE5880"},
//     {"HbarUsd" : "0x38C5ae3ee324ee027D88c5117ee58d07c9b4699b"},
//     {"OceanEth" : "0x9b0FC4bb9981e5333689d69BdBF66351B9861E62"},
//     {"NmrUsd" : "0xcC445B35b3636bC7cC7051f4769D8982ED0d449A"},
//     {"InrUsd" : "0x605D5c2fBCeDb217D7987FC0951B5753069bC360"},
//     {"GusdUsd" : "0xa89f5d2365ce98B3cD68012b6f503ab1416245Fc"},
//     {"ArpaUsd" : "0xc40ec815A2f8eb9912BD688d3bdE6B6D50A37ff2"},
//     {"AnkrUsd" : "0x7eed379bf00005CfeD29feD4009669dE9Bcc21ce"},
//     {"AntEth" : "0x8f83670260F8f7708143b836a2a6F11eF0aBac01"},
//     {"AmznUsd" : "0x8994115d287207144236c13Be5E2bDbf6357D9Fd"},
//     {"AxsEth" : "0x8B4fC5b68cD50eAc1dD33f695901624a4a1A0A8b"},
//     {"GusdEth" : "0x96d15851CBac05aEe4EFD9eA3a3DD9BDEeC9fC28"},
//     {"Kp3rEth" : "0xe7015CCb7E5F788B8c1010FC22343473EaaC3741"},
//     {"HighUsd" : "0xe2F95bC12FE8a3C35684Be7586C39fD7c0E5b403"},
//     {"OgnEth" : "0x2c881B6f3f6B5ff6C975813F87A4dad0b241C15b"},
//     {"AtomEth" : "0x15c8eA24Ba2d36671Fa22aD4Cff0a8eafe144352"},
//     {"AtomUsd" : "0xDC4BDB458C6361093069Ca2aD30D74cc152EdC75"},
//     {"AdaUsd" : "0xAE48c91dF1fE419994FFDa27da09D5aC69c30f55"},
//     {"AlphaEth" : "0x89c7926c7c15fD5BFDB1edcFf7E7fC8283B578F6"},
//     {"BitUsd" : "0x7b33EbfA52F215a30FaD5a71b3FeE57a4831f1F0"},
//     {"AmpUsd" : "0x8797ABc4641dE76342b8acE9C63e3301DC35e3d8"},
//     {"AdxUsd" : "0x231e764B44b2C1b7Ca171fa8021A24ed520Cde10"},
//     {"AlcxUsd" : "0xc355e4C0B3ff4Ed0B49EaACD55FE29B311f42976"},
//     {"AlbtUsd" : "0x057e52Fb830318E096CD96F369f0DB4B196fBfa7"},
//     {"AlgoUsd" : "0xC33c0400dBD8043c5bE09512501Ce59253D499cE"}));