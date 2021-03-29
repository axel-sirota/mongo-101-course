1. Indexes:

- { qty: 1 }
- { item: 1 }

Query: 

db.orders.find( { item: "abc123", qty: { $gt: 15 } } )

2. Indexes:

- { qty: 1 }
- { status: 1, ord_date: -1 }

Query: 

db.orders.find( { qty: { $gt: 10 } , status: "A" } )

3. Indexes:

- { status: 1, ord_date: -1 }

Queries: 

- db.orders.find{{ord_date: { $gt: new Date("2014-02-01") }, status: {$in:[ "P", "A" ] }})
- db.orders.find( { ord_date: { $gt: new Date("2014-02-01") } } )
- db.orders.find( { } ).sort( { ord_date: 1 } )

4. Indexes:

- { status: 1}
- {ord_date: -1 }

Queries: 

- db.orders.find{{ord_date: { $gt: new Date("2014-02-01") }, status: {$in:[ "P", "A" ] }})
- db.orders.find( { ord_date: { $gt: new Date("2014-02-01") } } )
- db.orders.find( { } ).sort( { ord_date: 1 } )
