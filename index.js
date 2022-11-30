
//const express = require('express')
import express from "express"
import { TradingViewAPI } from "tradingview-scraper"
import { connect, getCandles } from 'tradingview-ws'

//const TradingView = require('../main');
import * as TradingView from '@mathieuc/tradingview/main.js'

const bitcoinSymbol = "BTCUSD";
const tv = new TradingViewAPI();

const app = express()
const port = 3000

/*

(async function() {
  const connection = await connect()
  const candles = await getCandles({
    connection,
    symbols: ['FX:AUDCAD', 'FX:AUDCHF'],
    amount: 10_000,
    timeframe: 60
  })
  await connection.close()
  console.log(`Candles for AUDCAD:`, candles[0])
  console.log(`Candles for AUDCHF:`, candles[1])
}());

*/
const client = new TradingView.Client(); // Creates a websocket client

const chart = new client.Session.Chart(); // Init a Chart session
console.log(client)
chart.setMarket('BINANCE:BTCEUR', { // Set the market
  timeframe: 'D',
});

chart.onError((...err) => { // Listen for errors (can avoid crash)
  console.error('Chart error:', ...err);
  // Do something...
});

chart.onSymbolLoaded(() => { // When the symbol is successfully loaded
  console.log(`Market "${chart.infos.description}" loaded !`);
});

chart.onUpdate(() => { // When price changes
  if (!chart.periods[0]) return;
  console.log(`[${chart.infos.description}]: ${chart.periods[0].close} ${chart.infos.currency_id}`);
  // Do something...
});


app.get('/', (req, res) => {
  //res.send('Hello World!')
 (async function(){
   const connection = await connect()
   const candles = await getCandles({
    connection,
    symbols: ['NSE:NIFTY', 'NSE:BANKNIFTY'],
    amount: 2,
    timeframe: 60
  })
  await connection.close()
  console.log(`Candles for AUDCAD:`, candles[0])
  console.log(`Candles for AUDCHF:`, candles[1])
    console.log("hi")
 }())
 
 tv.setup().then(() =>
  tv.getTicker(bitcoinSymbol).then((ticker) =>
    ticker
      .fetch()
      .then(console.log)
      .then(() => {
       // tv.cleanup();
      })
  )
);
  res.send("hiii")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})