# Udemy Course: Working with React and Go

Course: [udemy](https://www.udemy.com/course/working-with-react-and-go-golang/)
Author: [Trevor Sawler](https://www.udemy.com/user/trevor-sawler/)

## Resources
* Go
  * httprouter: [github](https://github.com/julienschmidt/httprouter)
* Netskope
  ```
  # at terminal not within the container
  $ sudo launchctl unload /Library/LaunchDaemons/com.netskope.client.auxsvc.plist
  $ sudo ps aux | grep Netskope | grep -v grep | awk '{ print "kill -9", $2 }' | sudo sh
  ```

## Postgres
* pgAdmin: [local](http://localhost:5050/browser/#)  
  note: see docker-compose.yml pgadmin service for username/password
* course database import:  
  ```
  # from the .devcontainer directory

  # get the name of the 
  $ docker compose ls

  $ docker compose -p udemy_workingwithreactandgo_devcontainer cp ../sql/go_movies.sql db:/tmp
  $ docker compose -p udemy_workingwithreactandgo_devcontainer --user postgres exec db bash

  # in the db service container -- after creating new "go_movies" in postgres using pgAdmin
  db:$ cd /tmp
  db:$ ls -lah
  db:$ psql -d go_movies -f go_movies.sql
  ```  
  Note: directions and the exported database file [here](https://www.udemy.com/course/working-with-react-and-go-golang/learn/lecture/26508808#overview)
* 
