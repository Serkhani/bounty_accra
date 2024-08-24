// import React, { useState } from 'react';

// // Enum for MainnetPriceFeeds
// const MainnetPriceFeeds = {
//   '1inchEth': "0x72AFAECF99C9d9C8215fF44C77B94B99C28741e8",
//   '1inchUsd': "0xc929ad75B72593967DE83E7F7Cda0493458261D9",
//   AaplUsd: "0x139C8512Cde1778e9b9a8e721ce1aEbd4dD43587",
//   AaveEth: "0x6Df09E975c830ECae5bd4eD9d90f3A95a4f88012",
//   AaveUsd: "0x547a514d5e3769680Ce22B2361c10Ea13619e8a9",
//   // Add the rest of the price feeds here
// };

// const PriceFeedSelector = () => {
//   const [selectedFeed, setSelectedFeed] = useState(MainnetPriceFeeds['1inchEth']);

//   const handleChange = (event) => {
//     setSelectedFeed(event.target.value);
//   };

//   return (
//     <div>
//       <h2>Select a Price Feed</h2>
//       <select value={selectedFeed} onChange={handleChange}>
//         {Object.keys(MainnetPriceFeeds).map((key) => (
//           <option key={key} value={MainnetPriceFeeds[key]}>
//             {key}
//           </option>
//         ))}
//       </select>

//       <div>
//         <h3>Selected Price Feed Address</h3>
//         <p>{selectedFeed}</p>
//       </div>
//     </div>
//   );
// };

// export default PriceFeedSelector;
