import ipfs from './ipfs';

export const getImageIpfsHash = async (data: ArrayBuffer) => {
  const result = await ipfs.files.add(data);
  const hash = await result[0].hash;
  console.log(hash)
  return hash;
};

export const getImageByHash = async (hash: string) => {
  const result = await ipfs.files.get(hash);
  // const hash = await result[0].hash;
  console.log(result)
  return result;
};
