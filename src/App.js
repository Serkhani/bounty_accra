import "./App.css";
import Web3 from "web3";
import { ChainlinkPlugin, MainnetPriceFeeds } from "@chainsafe/web3-plugin-chainlink";
import React, { useState } from 'react';

const web3 = new Web3(window.ethereum);
web3.registerPlugin(new ChainlinkPlugin());

const FeedSelector = ({ player, selectedFeed, onSelectFeed }) => {
  return (
    <div className="player">
      <h3>Player {player} Feed Selector</h3>
      <select 
        value={selectedFeed} 
        onChange={(e) => onSelectFeed(e.target.value)}
      >
        <option value="">Select a Feed</option>
        {Object.keys(MainnetPriceFeeds).map((feedKey) => (
          <option key={feedKey} value={feedKey}>
            {feedKey}
          </option>
        ))}
      </select>
    </div>
  );
};

const App = () => {
  const [player1Feed, setPlayer1Feed] = useState('');
  const [player2Feed, setPlayer2Feed] = useState('');

  async function findPrice() {
    if (player1Feed && player2Feed) {
      console.log('Player 1 price:', MainnetPriceFeeds[player1Feed]);
      console.log('Player 2 price:', MainnetPriceFeeds[player2Feed]);
      try {
        const player1Price = await web3.chainlink.getPrice(MainnetPriceFeeds[player1Feed]);
        const player2Price = await web3.chainlink.getPrice(MainnetPriceFeeds[player2Feed]);
        if (player1Price.answer > player2Price.answer) {
          alert("Player 1 wins");
        } else if (player1Price.answer < player2Price.answer) {
          alert("Player 2 wins");
        } else {
          alert("It's a draw");
        }
      } catch (error) {
        console.error('Error fetching prices:', error);
        alert('An error occurred while fetching prices.');
      }
    } else {
      alert('Please select feeds for both players.');
    }
  }

  return (
    <div className="App">
      <header>Mainnet Price Feeds Selector</header>
      <div className="container">
        <FeedSelector
          player="1"
          selectedFeed={player1Feed}
          onSelectFeed={(feedKey) => setPlayer1Feed(feedKey)}
        />
        <FeedSelector
          player="2"
          selectedFeed={player2Feed}
          onSelectFeed={(feedKey) => setPlayer2Feed(feedKey)}
        />
      </div>
      <div className="result">
        <h2>Selected Feeds</h2>
        <p>Player 1 Feed: {player1Feed ? MainnetPriceFeeds[player1Feed] : 'None'}</p>
        <p>Player 2 Feed: {player2Feed ? MainnetPriceFeeds[player2Feed] : 'None'}</p>
        <button onClick={findPrice}>
          Play
        </button>
      </div>
    </div>
  );
};

export default App;
