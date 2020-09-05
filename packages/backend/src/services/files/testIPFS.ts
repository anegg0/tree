import { BlockStore, Peer } from '@textile/ipfs-lite';
// Use any interface-datastore compliant store
import { MemoryDatastore } from 'interface-datastore';
require('./types.d');

const store = new BlockStore(new MemoryDatastore());

(async function() {
  // Bring your own libp2p host....
  const host = new LibP2p({
    modules: {
      transport: [TCP],
      connEncryption: [SECIO],
      streamMuxer: [MPLEX]
    }
  });
  // modules: {
  //   transport: [TCP],
  //   connEncryption: [SECIO],
  //   streamMuxer: [MPLEX]
  // }
  // // ...or, use a full-featured default host
  // const host = await setupLibP2PHost()
  const lite = new Peer(store, host);

  await lite.start();

  const cid = 'QmWATWQ7fVPP2EFGu71UkfnqhYXDYH566qy47CnJDgvs8u';
  const data = await lite.getFile(cid);
  console.log(data.toString());
  // Hello World
  await lite.stop();
});
