// First let's import data

// mongoimport -c rent -d {DATABASE}} --drop --type csv --headerline --uri "mongodb://{USERNAME}:{PASSWORD}@{HOSTNAME}:27017/{DATABASE}" database/newyork-rent.csv

mongoimport -c rent -d axel-sirota --drop --type csv --headerline --uri "mongodb://localhost:27017/axel-sirota" datasets/newyork-rent.csv

