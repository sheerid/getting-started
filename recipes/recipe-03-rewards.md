![SheerID](http://developer.sheerid.com/common/img/sheerid-logo-small.png)

Rewards and Reward Pools
========================

Typically, our users will take the result of the responses and do something with it. There are times that our customers want us to manage some sort of key or coupon code, and distribute it to a successfully-verified individual. This recipe will go through the steps to distribute unique product keys from a pool of keys stored on SheerID's servers.

Create a RewardPool
-------------------

    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/rewardPool \
        -d name=SoftwareSerials

Example response:

        {
            "warnThreshold": 0, 
            "totalEntries": 0, 
            "remainingEntries": 0, 
            "id": "1bec5a2abbf4ee2c8bfdde8d", 
            "name": "SoftwareSerials"
        }

Add RewardEntries to the RewardPool
-----------------------------------

The addRewardEntry call can be used to add multiple RewardEntries to a RewardPool. Try to keep the number of entries submitted below 500 per call, though there is no hard limit at this time.

    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/rewardPool/1bec5a2abbf4ee2c8bfdde8d \
        -d entry=ead897bd4efc4bc5 \
        -d entry=c71a0d3cda2a7fbe \
        -d entry=01e2d17ccfca6d26

This API call does not return a JSON response, and HTTP status code `204` indicates success.

Set up a Reward entity
----------------------

There are two kinds of rewards, and we're setting up the kind that sources its reward from a Pool. The configuration call looks like this:


    curl -H "Authorization: Bearer $TOKEN" \
        https://services-sandbox.sheerid.com/rest/0.5/reward \
        -d productKey=pooled:1bec5a2abbf4ee2c8bfdde8d \
        -d name=ACME-Software-Academic

Example response:

        {
            "data": {
                "productKey": "pooled:1bec5a2abbf4ee2c8bfdde8d"
            }, 
            "id": "j31ltfxo4hz1j2yhq6832e6c", 
            "name": "ACME-Software-Academic"
        }

Modify the Verification Request
-------------------------------

Once your Reward and pool are set up, on each verification request that will yield a reward you will need to include the Reward ID that it will use. The parameter looks like this:

`_rewards=j31ltfxo4hz1j2yhq6832e6c`

And inside an example request:

    curl -H "Authorization: Bearer 36ec91954e67a9301bf7ae469d1862bc" \
        -d "_affiliationTypes=STUDENT_FULL_TIME,STUDENT_PART_TIME&organizationId=3425& \
        FIRST_NAME=Test&LAST_NAME=User&BIRTH_DATE=1992-03-20&EMAIL=student@example.edu& \
        _rewards=j31ltfxo4hz1j2yhq6832e6c" \
        https://services.sheerid.com/rest/0.5/verification
