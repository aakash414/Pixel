// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DecentralizedPoolingPlatform {
    address public admin;

    struct Pool {
        address[] contributors;
        mapping(address => uint256) contributions;
        uint256 contributionTarget;
        bool active;
    }

    mapping(uint256 => Pool) public pools;
    uint256 public poolIdCounter;

    event PoolCreated(uint256 poolId);
    event ContributionAdded(
        uint256 poolId,
        address contributor,
        uint256 amount
    );
    event OrderPlaced(uint256 poolId, uint256 orderAmount);

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    function createPool(uint256 _contributionTarget) external {
        poolIdCounter++;
        pools[poolIdCounter].active = true;
        pools[poolIdCounter].contributionTarget = _contributionTarget;
        emit PoolCreated(poolIdCounter);
    }

    function joinPool(uint256 _poolId) external {
        require(pools[_poolId].active, "Pool is not active");
        require(
            pools[_poolId].contributions[msg.sender] == 0,
            "Contributor already joined"
        );
        pools[_poolId].contributors.push(msg.sender);
    }

    function contributeToPool(uint256 _poolId) external payable {
        require(pools[_poolId].active, "Pool is not active");
        require(msg.value > 0, "Contribution amount must be greater than zero");
        require(
            pools[_poolId].contributions[msg.sender] + msg.value <=
                pools[_poolId].contributionTarget,
            "Contribution exceeds target"
        );

        pools[_poolId].contributions[msg.sender] += msg.value;
        emit ContributionAdded(_poolId, msg.sender, msg.value);
    }

    function placeOrder(
        uint256 _poolId,
        uint256 _orderAmount
    ) external onlyAdmin {
        require(pools[_poolId].active, "Pool is not active");
        require(
            _orderAmount <= address(this).balance,
            "Insufficient balance for order"
        );
        // Logic for placing order with pooled funds
        emit OrderPlaced(_poolId, _orderAmount);
        // Transfer order amount to supplier or perform order-related operations
        // For simplicity, just sending the order amount to the admin
        payable(admin).transfer(_orderAmount);
    }

    function deactivatePool(uint256 _poolId) external onlyAdmin {
        require(pools[_poolId].active, "Pool is not active");
        pools[_poolId].active = false;
    }

    function withdrawContribution(uint256 _poolId) external {
        require(!pools[_poolId].active, "Pool is still active");
        require(
            pools[_poolId].contributions[msg.sender] > 0,
            "No contribution to withdraw"
        );

        uint256 amountToWithdraw = pools[_poolId].contributions[msg.sender];
        pools[_poolId].contributions[msg.sender] = 0;
        payable(msg.sender).transfer(amountToWithdraw);
    }

    function getPoolDetails(
        uint256 _poolId
    )
        external
        view
        returns (
            address[] memory contributors,
            uint256 contributionTarget,
            uint256 totalContributions,
            bool active
        )
    {
        return (
            pools[_poolId].contributors,
            pools[_poolId].contributionTarget,
            address(this).balance,
            pools[_poolId].active
        );
    }
}
