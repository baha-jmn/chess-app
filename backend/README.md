To run the Database on docker :
docker run --name chess-postgres -e POSTGRES_PASSWORD=postges -e POSTGRES_DB=chessdb -p 5432:5432 -d postgres

Backend Structure and versions : 
IDE: Intellij
Maven 3.9.11
Java 21
Spring boot 3.5.6

to run the backend 
under Run/Debug Configurations (Edit) :
Active profile : dev
add the 2 files sended by email under main/resouces:
application-dev.yml
application-prod.yml