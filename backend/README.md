To run the Database on docker :
docker run --name chess-postgres -e POSTGRES_PASSWORD=postges -e POSTGRES_DB=chessdb -p 5432:5432 -d postgres