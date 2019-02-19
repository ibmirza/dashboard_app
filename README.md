**Dashboard App and RESTful API using Node.js**

High Level Components:

Webserver - Using Express webserver to handle HTTP request and response.

Router    - Router is used to define the url endpoints and HTTP methods to map incoming requests to
            appropriate controller logic.
            
Controller- The controller layer will inspect the requests and pull data as needed to interact with
            appropriate database API's to fetch or persists data and then generate appropriate HTTP
            response.
            
Database API- The database API's will handle interactions with the database(can be called as model layer)

View - EJS view components


Load database strings:
echo "export HR_USER=hr" >> ~/.bashrc
echo "export HR_PASSWORD=oracle" >> ~/.bashrc
echo "export HR_CONNECTIONSTRING=0.0.0.0/orcl" >> ~/.bashrc
source ~/.bashrc

How to start the express server:
Command to start the web server    ->nodejs .
Command to shutdown the web server ->Ctrl C
