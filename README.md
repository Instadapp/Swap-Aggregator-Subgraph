# Swap Aggregator Subgraph

Basic subgraph for [Swap Aggregator Connector](https://polygonscan.com/address/0x403e1559ef503C12CF2ec8E07dBC592Ff298EEc3).
Tracks all the calls made to the swap method and stores the data which includes:
- connectors: The connector names array passed by the user to perform swaps on any, in preference order.
- callData: Array of call data passed by the user - input details for the respective connectors.
- eventName: "LogSwapAggregator(string[],string,string,bytes)"  
- eventParam: Encoded data including connectors array, connector name where swap took place, eventName and eventParams returned by the connector where swap occured.

Support added for Mainnet and Matic
- Mainnet: [Swap Aggregator Subgraph](https://thegraph.com/hosted-service/subgraph/richa-iitr/swap-aggregator-subgraph?selected=playground) 
- Polygon: [Swap Aggregator Matic](https://thegraph.com/hosted-service/subgraph/richa-iitr/swap-aggregator-matic?selected=playground) 

### Query

<pre>
{
  swapAggregatorDatas {
    id
    connectors
    callData
    eventName
    eventParams
    transactionDetail {
      hash
      from
      to
      input
      value
      index
      blockNumber
      timestamp
      gasUsed
      gasLimit
      gasPrice
    }
  }
}
</pre>
