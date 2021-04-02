// First let's import data

// Import the file datasets/newyork-rent.csv

db.rent.findOne({}, {name:1, host_acceptance_rate:1, price:1, cleaning_fee: 1})


// The price, host response rate,and cleaning fee (among other fields), are strings due to some special characters!

// Let's convert 100$ to 100 integer

db.rent.aggregate([
    {
        $project: {
            num_accept_rate: {
                $toDouble: {
                    $substr: [
                        "$host_acceptance_rate",
                        0,
                        {
                            $subtract: [{$strLenCP: "$host_acceptance_rate" },1]
                        }
                    ]
                }
            }
        }
    }
])

// Oh no! We got some bad strings! What we can do is just filter them out beforehand with the $match operator:


db.rent.aggregate([
    {
        $match: {
            "host_acceptance_rate": {
                $ne : "N/A"
            }
        }
    },
    {
        $project: {
            num_accept_rate: {
                $toDouble: {
                    $substr: [
                        "$host_acceptance_rate",
                        0,
                        {
                            $subtract: [{$strLenCP: "$host_acceptance_rate" },1]
                        }
                    ]
                }
            }
        }
    }
])


// Great!