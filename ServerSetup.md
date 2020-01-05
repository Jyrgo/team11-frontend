#Server setup guide
So you want to install the team11 backend project to your server. Thats great!
I will be your guide to show you the way step by step, so let's get into it! :)
This part expects that you have already set up your backend project, if not, do that first and come back, the this guide. 
The backend part of this setup is also included in this setup guide, but if you have done all of that refer to the parts 
with the Fronted prefix.

#Create your server using Amazon Web Services(AWS)
1. After you have created your AWS account log in and find the AWS management console .
2. Find EC2 (EC2 is a virtual machine provided by Amazon, this is where your code will be running)
3. Navigate to "Instances". You should find it on the left hand side of the page. 
4. Select Ubuntu Server 18.04 LTS (HVM), SSD Volume Type. 
5. Pick t3.micro (free tier eligible)
6. Click next till you reach storage. Set storage to 16-30Gb. (Extra storage will enable to turn on virtual memory)
7. Click next till you reach security groups. Add another security group.
8. Click Add. Select All traffic and source is 0.0.0.0/0, ::/0
- You can update it later: [follow the guide here](https://stackoverflow.com/questions/26818456/amazon-ec2-not-working-when-accessing-through-public-ip)
- This will allow rest of the world to access our front-end application
- Don't remove ssh security group
9. Click Launch and review. Then Launch.
10. It will prompt you for public/private keys.
- Create new and save it
- If you delete or loose the private key you won't be able to access your EC2 instance.
11. Launch instances

#Connecting to your EC2 instance 
##For linux and mac
1. Go to AWS management console
2. Navigate to Instances from the left hand menu
3. Click on Connect 
4. When you click on connect, a window appears with instructions to ssh to your server.
5. Locate the private key file on your system (yourPrivateKey.pem)
6. The key must not be publicly viewable for ssh to work and for this you must enter the command:
 ```bash
 chmod 400 yourPrivateKey.pem
 ```
- chmod 400 tells your system that this file is read only. 
7. Close the Connect window and find the Public DNS (IPv4) of your running instance. It is located under the description panel. 
the public DNS should look something like this: "ec2-13-53-201-12.eu-north-1.compute.amazonaws.com"
8. On your mac or linux terminal screen write the following command to connect to the server remotely:
```bash
 ssh -i "yourPrivateKey.pem" ubuntu@your-public-dns-goes-here.
```
An example of this would be:
```bash
 ssh -i "jyrgodevKey.pem" ubuntu@ec2-13-53-201-12.eu-north-1.compute.amazonaws.com
``` 

##For Windows
It is generally much more straight forward to connect to servers on unix based machines, however, if you lack the option to 
use linux then I reccommend using putty. 
1. Download and install the latest version of putty from their official [website](https://www.chiark.greenend.org.uk/~sgtatham/putty/)
2. The full guide on how to connect using putty can be found [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/putty.html)

#Adding virtual memory 
By default the free tier EC2 instance has only 1Gb of RAM. Front-end builds run out of memory and for that we need to increment it.
The solution is to turn on / increase virtual memory size.
By default virtual memory is turned off.

##Add virtual memory to your linux server
Log into EC2
```bash
 ssh -i "yourPrivateKey.pem" ubuntu@your-public-dns-goes-here.
```
Install htop(linux task manager alternative)
```bash
 sudo apt-get install htop
```
Run "htop" to see virtual memory
```bash
 htop
```
For 2Gb of virtual memory run the following commands one line at a time.
```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo swapon --show
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
restart server and check whether virtual memory change was permanent using htop
```bash
sudo reboot
```

##Adding virtual memory to your windows server
1. Delete your windows server.
2. Install a linux server.
3. Refer to the "Add virtual memory to your linux server" part of this readme.

#Install open-jdk for Gitlab to build code and open-jre to run .jar 
ssh into the server:
 ```bash
  ssh -i "yourPrivateKey.pem" ubuntu@your-public-dns-goes-here.
 ```
Update the system: 
```bash
 sudo apt-get update
```
Install open-jdk: 
```bash
 sudo apt-get install openjdk-11-jre openjdk-11-jdk
```

#Backend: Install gitlab runner to your EC2 server
EC2. Follow [this guide](https://docs.gitlab.com/runner/install/linux-manually.html) to install the runner
- no need to configure docker, at the moment we will not be using it

1. Go to the gitlab project page.
3. Navigate to Settings -> CI/CD -> Runners
4. Look for the "Set up a specific Runner manually" part of the page
5. When setting up the runner on the server you will need the token and the URL.
6. To set up the runner follow [this guide](https://docs.gitlab.com/runner/register/index.html) 
 - use the url and token you found under the "Set up a specific Runner manually" part of the page
 - executor is shell
 7. There is a gitlab-ci.yml file in the project root, this is the file that specifies the tasks for the runner to execute.
 There is no need to change it, however, if you want more information on how it works read the [following documentation](https://docs.gitlab.com/ee/ci/yaml/)
 8. When pushing changes to the branch where the gitlab-ci.yml file exists the runner will execute commands specified in the 
  gitlab-ci.yml file and when it succeeds it will update the project and restart it on the server. 

#Backend: define backend as linux service
We assume that gitlab puts backend jar into /home/gitlab-runner/api-deployment
We assume that jar is called team_11_backend-0.0.1-SNAPSHOT.jar

Navigate to the system directory:
```bash
  cd /etc/systemd/system/
 ```
Create the team11 service: 
```bash
  sudo touch team11.service
 ```
Copy the text below to the team11.service file: 

```bash
[Unit]
Description=dashboard team11 service
After=network.target
[Service]
Type=simple
User=gitlab-runner
WorkingDirectory=/home/gitlab-runner/api-deployment
ExecStart=/usr/bin/java -jar team_11_backend-0.0.1-SNAPSHOT.jar
Restart=on-abort
[Install]
WantedBy=multi-user.target
```

Reload the configuration: 
```bash
  sudo systemctl daemon-reload
 ```
Enable the process:
```bash
  sudo systemctl enable team11
 ```
Start the service: sudo service heroes restart
```bash
  sudo service heroes restart
 ```
To check backend use (or check your logfiles): 
```bash
  sudo service team11 status
 ```

#Backend: Where is the backend running?
The template url looks like this: 
```text
  http://ip_address:port/api_or_other_base_url/rest_url
 ```
To find the ip address where the EC2 virtual machine is running navigate to your AWS management console and under 
instances find the ipv4 address of your server. For example: http://13.53.201.12:8080/api/games
Some servers (TalTech) don't expose random ports, only 80 and 443. Therefore configuring ports can 
be important if you are dealing with other servers.

#Backend: Install nginx.
Use the following commands in your EC2 instance:
```bash
  sudo apt-get install nginx
 ``` 
After it succeeds your IPv4 Public IP will direct you to the nginx greeting page.
 
#Backend: setup nginx sites-enabled
Navigate to /etc/nginx/sites-available on your server:
 ```bash
 cd /etc/nginx/sites-available.
``` 
Create a new config file by copying default file using the command: 
```bash
 sudo cp default team11
```
Navigate to /etc/nginx/sites-enabled: 
```bash
 cd /etc/nginx/sites-enabled
```
Make symlink from sites-enabled to sites-available:
```bash
 sudo ln -s /etc/nginx/sites-available/team11 /etc/nginx/sites-enabled/
```
In sites-enabled delete the default symlink:
```bash
 sudo rm default
```

#Backend: setup nginx to proxy backend
Navigate to /etc/nginx/sites-available:
 ```bash
  cd /etc/nginx/sites-available
```
Open the editor in the terminal, we are using nano for this: 
```bash
  sudo nano heroes
```
Add following code (change port if necessary) to the server portion of the file:
```text
  location /api/ {  
           proxy_pass   http://localhost:8000;  
  }
```
Restart the nginx service:
```bash
  sudo service nginx restart
``` 
Try accessing the api without the port for example:  
```text
  http://13.53.201.12/api/game.
``` 

#Backend: restart backend service after build 
Manually restart the service in the server: 
```bash
  sudo service team11 restart
``` 
To allow gitlab-runner to use sudo when restarting team11 service edit the permissions file: 
```bash
  sudo visudo
```  
Add the following text to the end of the file:
```text
  gitlab-runner ALL = NOPASSWD: /usr/sbin/service heroes *
``` 
 
#Frontend: install node and yarn for gitlab runner to build frontend code 
```bash
  sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```
To install yarn run:
```bash
  sudo npm install -g yarn
```

#Frontend: Add a Gitlab runner for the front end part of your project.
Follow the same points described in the "Backend: Install gitlab runner to your EC2 server" portion of this guide. 

#Frontend: nginx final configuration
Navigate to /etc/nginx/sites-available: 
```bash
  cd /etc/nginx/sites-available
```
Edit the team11 file:
```bash
  sudo nano team11
``` 
Add the following text to the file:
```text
  root   /var/www/front-deployment;
``` 
Make sure your team11 file looks like the following example
```text
  server {
        listen       80;
        server_name  localhost;
    
        root   /var/www/front-deployment;
    
        location /api/ {
            proxy_pass   http://localhost:8080;
        }
    
        location / {
            index  index.html index.htm;
            if (!-e $request_filename){
              rewrite ^(.*)$ /index.html break;
            }
        }
    }
```

And thats it! Your project should be up and running on your server.
