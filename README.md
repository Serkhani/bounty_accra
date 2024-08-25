# Chainlink Price Feed Game

## Overview

The Chainlink Price Feed Game is a two-player game built using React and the Chainlink Plugin for Web3.js. In this game, each player selects a set of 5 cryptocurrency price feeds. After a waiting period, the game fetches the initial and final prices for the selected feeds, and the player with the highest positive change in price wins!

## Features

- **Two-Player Gameplay**: Players select 5 price feeds each from a list of available feeds.
- **Real-Time Price Fetching**: The game fetches live price data using Chainlink's decentralized oracles.
- **Visual Display of Prices**: The initial and final prices of each selected feed are displayed to both players.
- **Automatic Winner Determination**: The game calculates the total price change for each player and declares the winner.

## Getting Started

### Prerequisites

- **Node.js**: Make sure you have Node.js installed. You can download it from [here](https://nodejs.org/).
- **NPM**: NPM comes bundled with Node.js, but make sure it’s updated to the latest version.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/serkhani/bounty_accra.git
    cd chainlink-price-feed-game
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

   The app will run on `http://localhost:3000`.

### Usage

1. **Selecting Feeds**: Each player selects 5 price feeds from the dropdown menu.
2. **Setting Waiting Time**: You can set the waiting time (in seconds) before the final prices are fetched.
3. **Start the Game**: Click the "Play" button to start the game. The initial prices will be fetched immediately.
4. **Wait for Countdown**: The game will fetch the final prices after the countdown finishes.
5. **View Results**: The initial and final prices will be displayed, and the winner will be determined based on the highest positive change in price.

## Technologies Used

- **React**: For building the user interface.
- **Web3.js**: To interact with the Ethereum blockchain.
- **Chainlink Plugin for Web3.js**: To fetch live price data using Chainlink oracles.
- **React Hot Toast**: For displaying game notifications and results.
- **JSBI**: To handle large integer arithmetic for price calculations.

## Code Overview

### Main Components

- **`App.js`**: The main component that handles the game logic, including fetching prices, starting the game, and determining the winner.
- **`FeedSelector.js`**: A component for selecting the price feeds for each player.

### Key Functions

- **`fetchPrices(feeds)`**: Fetches the current prices for the selected feeds using the Chainlink plugin.
- **`determineWinner(prices)`**: Compares the total price changes for both players and declares the winner.

## Future Enhancements

- **Dynamic Feed Addition**: Allow players to add custom feeds dynamically.
- **Leaderboard**: Implement a leaderboard to track the highest-scoring games.
- **User Authentication**: Add user login and account management features.

|1. **Players Draw** 📊|3. **Player Wins** 🍃|5. **MetaMask Wallet** 🚕|
|:---:|:---:|:---:|
|A red toast pops up when the players draw|When a player wins, theres is a green toast|When there is no metamask account or the wallet is not connected to mainnet|
|![Players Draw](https://github.com/user-attachments/assets/3d85edc4-283d-4d48-9a83-dd9e12e6feed)|![Player Wins](https://github.com/user-attachments/assets/0e4bcf5a-a817-4ceb-8627-eaa20e573985)|![MetaMask NA](https://github.com/user-attachments/assets/f5c3d057-98b6-4e1f-b9e8-ede737a1625b)|


## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Chainlink**: For providing reliable, decentralized oracles for fetching price data.
- **React Community**: For the tools and libraries that made this project possible.

