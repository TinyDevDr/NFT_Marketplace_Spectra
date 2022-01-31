var Marketplace = artifacts.require("./Marketplace.sol");

module.exports = async function (deployer) {
    await deployer.deploy(Marketplace, "SPCCollection", "SPCNFT", "SPC");
    const inst = await Marketplace.deployed();
    console.log (inst.address);
};