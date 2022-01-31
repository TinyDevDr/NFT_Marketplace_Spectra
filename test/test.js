const SPCToken = artifacts.require("SPCToken");
const SpectraNFT = artifacts.require("SpectraNFT");
const SaleManager = artifacts.require("SaleManager");


contract('test for all', async accounts => {
    let spcToken;
    let spcNFT;
    let saleManager;

    before(async () => {
        spcToken = await SPCToken.deployed();
        spcNFT = await SpectraNFT.deployed();
        saleManager = await SaleManager.deployed();
    })

    it('distribution of SPC token', async () => {
        console.log(accounts);

        console.log("SPCToken:", spcToken.address);
        console.log("SPCNFT:", spcNFT.address);
        console.log("SaleManager:", saleManager.address);
    })

    it('creator of NFT', async () => {
        await saleManager.setAuthentication(accounts[1], 2);
        await saleManager.setMintingFee(accounts[1], web3.utils.toBN("100"));
        await saleManager.setSellingFee(accounts[1], 10);

        await saleManager.setAuthentication(accounts[2], 2);
        await saleManager.setMintingFee(accounts[2], web3.utils.toBN("100"));
        await saleManager.setSellingFee(accounts[2], 10);

        await saleManager.setAuthentication(accounts[3], 1);
        await saleManager.setMintingFee(accounts[3], web3.utils.toBN("100"));
        await saleManager.setSellingFee(accounts[3], 10);

        await saleManager.setAuthentication(accounts[4], 1);
        await saleManager.setMintingFee(accounts[4], web3.utils.toBN("100"));
        await saleManager.setSellingFee(accounts[4], 10);


        await spcToken.mintToken(accounts[0], web3.utils.toBN("100000"));
        await spcToken.mintToken(accounts[1], web3.utils.toBN("100000"));
        await spcToken.mintToken(accounts[2], web3.utils.toBN("100000"));
        await spcToken.mintToken(accounts[3], web3.utils.toBN("100000"));
        await spcToken.mintToken(accounts[4], web3.utils.toBN("100000"));
        
        await saleManager.singleMintOnSale("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx", 0, web3.utils.toBN("500"), 10, 1, { from: accounts[1], value: web3.utils.toBN("100") });

        var getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (0) : " + getSaleInfo);

        // var arrayHash = ["111VKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx","112VKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx","113VKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx"];
        // await saleManager.batchMintOnSale(arrayHash, web3.utils.toBN("500"), 10, 1, { from: accounts[2], value: web3.utils.toBN("300")});

        // getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        // console.log("getSaleInfo (1) : " + getSaleInfo);

        await spcToken.approve(saleManager.address, web3.utils.toBN("600"), { from: accounts[2] });

        await saleManager.placeBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[2], value: web3.utils.toBN("600") });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (2) : " + getSaleInfo);

        await spcToken.approve(saleManager.address, web3.utils.toBN("700"), { from: accounts[3] });

        await saleManager.placeBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[3], value: web3.utils.toBN("700") });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (3) : " + getSaleInfo);
        console.log("+++++++++++++++++", await web3.eth.getBalance(saleManager.address));

        await spcToken.approve(saleManager.address, web3.utils.toBN("800"), { from: accounts[4] });

        await saleManager.placeBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[4], value: web3.utils.toBN("800") });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (4) : " + getSaleInfo);
        console.log("+++++++++++++++++", await web3.eth.getBalance(saleManager.address));

        var ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        balanceSPC = await saleManager.getWithdrawBalance(1, { from: accounts[4] });
        console.log("balanceSPC : ", balanceSPC);

        await saleManager.performBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[1] });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (result) : " + getSaleInfo);
        console.log("+++++++++++++++++", await web3.eth.getBalance(saleManager.address));

        ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        balanceSPC = await saleManager.getWithdrawBalance(1, { from: accounts[1] });
        console.log("balanceSPC : ", balanceSPC);

        await spcNFT.setApprovalForAll(saleManager.address, true, { from: accounts[4]});
        await saleManager.createSale('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', 0, web3.utils.toBN("900"), 10, 1, { from: accounts[4] });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (5) : " + getSaleInfo);

        ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        await saleManager.destroySale('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[4] });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (5 - 1) : " + getSaleInfo);

        ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        balanceSPC = await saleManager.getWithdrawBalance(1, { from: accounts[4] });
        console.log("balanceSPC : ", balanceSPC);

        await saleManager.createSale('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', 0, web3.utils.toBN("900"), 10, 1, { from: accounts[4] });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (5 - 2) : " + getSaleInfo);

        ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        console.log("+++++++++++++++++", await web3.eth.getBalance(accounts[1]));

        var auctionState = await saleManager.getAuctionState("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx", { from: accounts[1]});
        console.log("auctionState : " + auctionState);

        await spcToken.approve(saleManager.address, web3.utils.toBN("1000"), { from: accounts[1] });

        await saleManager.placeBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[1], value: web3.utils.toBN("1000") });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (6) : " + getSaleInfo);

        console.log("+++++++++++++++++", await web3.eth.getBalance(accounts[1]));

        await saleManager.performBid('QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx', { from: accounts[1] });
        getSaleInfo = await saleManager.getSaleInfo("QmNVKiNQoX1NkLuwVe5JbtjEy4t46Wm5uUxSZxzCZwk7rx");
        console.log("getSaleInfo (result) : " + getSaleInfo);

        ownerOfNFT = await spcNFT.ownerOf(0);
        console.log("ownerOfNFT : " + ownerOfNFT);

        var withdrawBalance = await saleManager.getWithdrawBalance(1, { from: accounts[0] });
        console.log("withdrawBalance : " + withdrawBalance);

        await saleManager.withDrawAll(1, { from: accounts[0] });
        withdrawBalance = await saleManager.getWithdrawBalance(1, { from: accounts[0] });
        console.log("withdrawBalance : " + withdrawBalance);
    })
})