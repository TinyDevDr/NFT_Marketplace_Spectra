const SaleManager = artifacts.require("SaleManager");
const SpectraNFT = artifacts.require("SpectraNFT");
const SPCToken = artifacts.require("SPCToken");

module.exports = async (deployer) => {
  await deployer.deploy(SPCToken);
  const token = await SPCToken.deployed();
  console.log("SPC token", token.address);

  await deployer.deploy(SpectraNFT);
  const spectraNFT = await SpectraNFT.deployed();
  console.log("spectra NFT", spectraNFT.address);

  await deployer.deploy(SaleManager, spectraNFT.address, token.address);
  const saleManager = await SaleManager.deployed();
  console.log("sale manager", saleManager.address);
};
