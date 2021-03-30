var mapFunction = function() {
    for (var idx = 0; idx < this.items.length; idx++) {
        var key = this.items[idx].sku;
        var value = { count: 1, qty: this.items[idx].qty };
        emit(key, value);
    }
};

var reduceFunction = function(keySKU, countObjVals) {
   reducedVal = { count: 0, qty: 0 };

   for (var idx = 0; idx < countObjVals.length; idx++) {
       reducedVal.count += countObjVals[idx].count;
       reducedVal.qty += countObjVals[idx].qty;
   }

   return reducedVal;
};

var finalizeFunction = function (key, reducedVal) {
  reducedVal.avg = reducedVal.qty/reducedVal.count;
  return reducedVal;
};

queryAndOutput = {
    out: { merge: "reduced_orders" },
    query: { ord_date: { $gte: new Date("2020-03-01") } },
    finalize: finalizeFunction
  }


db.orders.mapReduce(
    mapFunction,
    reduceFunction,
    queryAndOutput
)