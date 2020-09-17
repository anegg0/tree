import ipfs from './ipfs';

export const getTextIpfsHash = async (data: string) => {
  const content = await ipfs.Buffer.from(data);
  const result = await ipfs.add(content);
  const hash = await result[0].hash;
  console.log(hash);
  return hash;
};

export const getImageIpfsHash = async (data: ArrayBuffer) => {
  const result = await ipfs.files.add(data)
    .then((result: any) => console.log(result.json))
  // here should the error be all caught
  console.log("jirai manger des fruits de mer sur la grosse chatte a ta mere")
  const hash = await result[0].hash;
  return hash;
};
