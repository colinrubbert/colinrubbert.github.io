---
layout: post
title: 'Installing Elixir and Phoenix in Windows Susbsytem for Linxu w/PostgreSQL on Windows 10'
permalink: installing-elixir-phoenix-in-windows-subsystem-for-linux-with-postgresql-on-windows-10
---

## Installing Elixir & Phoenix: The Steps

This guide will focus on installing all the requirements to get Elixir & Phoenix installed on a Windows 10 machine via the Windows Subsystem for Linux (WSL) and getting PostgreSQL as the primary database.
This guide will assume that you already know how to install WSL Bash on Windows 10. I won’t go over that because a simple Google search will give you plenty of useful links to get this rocking.

**Disclaimer:** I have coded absolutely **zero** things in Elixir or Phoenix. It’s always been on my todo list but haven’t had the time to sit down and bite into it. So why am I doing this then? Well because someone asked me to and why the hell not give it a go? Maybe it’ll give me the kick in the ass to learn Elixir & Phoenix but I digress…

This may also look familiar to the process and steps I took to write my Ruby on Rails WSL in Windows 10 guide that you can find here. Lets crack on.

## Installing the pre-requisites

My install is truly a fresh install of Windows 10 Pro and the WSL Bash (my primary hard drive failed so I had to start from scratch).

**Pro Tip:** If you ever run into an issue or you just need to figure out what command or procedure you need to do for specific tasks in regards to Bash on Windows you can simply Google the question and reference Ubuntu. Bash on Windows is built on top of and in partnership with Ubuntu which makes troubleshooting (Linux specific issues & procedures) quite easy.

First let me state that this information and process is being pulled straight from both the [Elixir](https://elixir-lang.org/getting-started/introduction.html) and [Phoenix](https://hexdocs.pm/phoenix/installation.html#content) docs so if you need reference points you can check them there, this is just an attempt to get it in a single, easy to read, guide for everyone to be able to get up and running.

Let’s start with updating our instance of WSL via the Bash command line.

```
sudo apt-get update
```

Now we need to add some repositories to our instance of WSL. First we will add the Erlang repository. If you are unaware Elixir is built on top of the Erlang language.

```
wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i erlang-solutions_1.0_all.deb
```

Now that we’ve got the Erlang repository added to our instance lets make sure we update our system again. To do this we will run the update package command again.

```
sudo apt-get update
```

Sweet, looks like we’re getting our packages we required from Erlang pulled into our system. Our first win!

Now we need to install the Erlang/OTP platform and all of the required applications associated with it.

```
sudo apt-get install -y esl-erlang
```

Fantastic, no errors! Now that we’ve got all the Erlang dependencies we can now install Elixir.

```
sudo apt-get install -y elixir
```

Sweet! Let’s just verify that we’ve got access to Elixir and that it was installed properly by checking the version number.

```
elixir --version
```

As of writing this I’ve got version `Elixir 1.5.1` installed.

Just to be on the safe side let’s just double check we can do Elixir things. We’re going to open up the **Interactive mode** so that we can just do some simple math inside of Elixir’s interactive mode which is very similar to Ruby’s interactive mode.

```
iex
```

This command will get you into the interactive mode. Now for some simple commands.

```
5 + 5
```

This should result in this.

```
iex(1)> 5 + 5
10
```

All good? Great. Now press `ctrl + c` twice to exit out of the interactive menu.

Perfect. We’ve got Erlang, Elixir and all the required dependencies for both installed.

## Installing Phoenix web framework

We got most of our dependencies installed for Phoenix but just like Rails needs Bundler, Phoenix needs Hex. So let’s install the hex package manager.

```
mix local.hex
```

Now that we’ve got all of our essential Phoenix dependencies we can grab our Phoenix archive and install it on our system.

```
mix archive.install https://github.com/phoenixframework/archives/raw/master/phx_new.ez
```

Perfect, Phoenix is now installed. There will be some dependencies that will need to be installed but we will let Phoenix handle those once we build our first application.

## The odds and ends

Like Rails, Phoenix utilizes some `npm` packages to handle static assets specifically brunch.io. What we will need to do is install Node.js to get all the essential files.

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

Let’s just make sure we got the right version.

```
npm -v
node -v
```

As of writing this article I’ve got `npm 3.10.10` and `node v6.11.3`. That should work. We will additionally need the `build-essential` package for additional node/npm addons as well as `inotify-tool` so that we can have live reloads for our Phoenix server later on.

```
sudo apt-get install -y build-essential inotify-tools
```

## Installing PostgreSQL in Bash on Windows (primary)

The last piece of our puzzle is to install PostgreSQL on our system. Now let me make a disclaimer right here: **I’ve got no idea how well this will work, your mileage may vary depending on your Windows 10 version**. I’m feeling a bit saucy so we’re going to try this.

If it doesn’t work with your version I will include a workaround that we had to use for the Rails installations because WSL wasn’t ready for handling postgres stuff.

First we will have to install our postgres repository.

```
sudo sh -c "echo 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main' > /etc/apt/sources.list.d/pgdg.list"
wget --quiet -O - 
http://apt.postgresql.org/pub/repos/apt/ACCC4CF8.asc | sudo apt-key add -
```

Now let’s update our package lists and install the actual postgres packages.

```
sudo apt-get update
sudo apt-get install postgresql-common
sudo apt-get install postgresql-9.5 libpq-dev
```

Great, that looks like it worked. We won’t truly know until we build our application if the database connectors work. Let’s keep on keepin’ on.

Before we setup our user’s password we need to make sure our postgres server is running.

```
sudo service postgresql start
```

We should’ve got a message indicating that the service is starting. 

**Side note:** you will likely have to do this every time you start bash and want to use your postgres database and that's because it doesn't, by default, automatically start at startup.

Let’s setup a user for our postgres dev environment that we can use for our applications authentication. We will be using the built in `postgres` user since the default Phoenix application build process assumes this to be the case.

First we need to be in the postgres console.

```
sudo -u postgres psql
```

We should see this (or a very close variation of this depending on the versioning).

```
psql (9.5.9)
Type "help" for help.
postgres=#
```

Now to set the password as `postgres`. **Disclaimer: NEVER EVER EVER set your password as POSTGRES in a production database, NEVER. Did I say NEVER yet, don’t do! EVER!** This username/password combo should and only be used in a local development environment that **DOESN’T** use actual customer/client/user/consumer information.

Now onto setting the password. Type `\password postgres`. This will start the password prompt for the postgres user. This is what the prompt will look like.

```
psql (9.5.9)
Type "help" for help.
postgres=# \password postgres
Enter new password:
```

Now type the password `postgres` twice. See previous disclaimer! Things should now look like this. The prompts will be blank as you type the password.

```
psql (9.5.9)
Type "help" for help.
postgres=# \password postgres
Enter new password:
Enter it again:
postgres=#
```

Perfect, finally we have to type `\q` to exit out of the psql console.

PosgresSQL should now be installed and a user configured for our application.

**DISCLAIMER: Phoenix assumes your password for postgres will be `postgres` with the default username of `postgres`**

## Installing PostgreSQL in Bash on Windows (alternative)

As of Windows build version 15024 this should’ve been patched, however, if you are not currently on this build or have issues we will need to setup postgres the old fashion way.

This is the **workaround** version for getting postgres to work if you don’t need this skip this part.

First we need to go and grab the binary (.exe) for the PostgreSQL installation. Let’s download and install the latest stable version of PostgreSQL Windows binary.

PostgreSQL 9.6.2 provided by BigSQL: [Download](http://oscg-downloads.s3.amazonaws.com/packages/PostgreSQL-9.6.2-2-win64-bigsql.exe)

Now that we have the PostgreSQL downloaded, let’s begin to install it.
Follow along with the “Setup Wizard” leaving the defaults checked. If you want to install the additional packages you can but it’s not necessary and we don’t need the extra bloat.

Once you get to the “Password” section set up your password that you want for your `postgres` user account. Phoenix assumes that the password will be `postgres` as such we need that to be our password

**DO NOT USE “POSTGRES” FOR YOUR PASSWORD IN YOUR PRODUCTION ENVIRONMENT!!!**

Great we got that installed, we got our password set, lets do a quick sanity check to make sure that our Bash WSL is connecting to our Windows installation of PostgreSQL.

Run this command from your Bash terminal.

```
psql -p 5432 -h localhost -U postgres
```

If everything was installed properly you should get a response similar to this and the postgres shell prompt.

```
psql (9.5.6, server 9.6.2)
WARNING: psql major version 9.5, server major version 9.6.
         Some psql features might not work.
Type "help" for help.
postgres=#
```

Great we got it working. Now type `\q` to exit the postgres shell.

## Building our first Phoenix application

Now as a reminder, this is uncharted waters for me so cross our fingers and hope this all works!

By this point we should have all our dependencies installed: Erlang, Elixir, Hex, Phoenix, Node.js and PostgreSQL.

Before we run our first command to create our application we should probably migrate to our Windows C:\ drive where we will keep our development files. For me that will be a folder on my Desktop. From here you will have to substitute in your folder location since it will be slightly different from mine. Here is where I will be changing directory to and storing my project files.

```
cd /mnt/c/Users/Colin/Desktop/projects/phoenix
```

See how my username name is `/Colin/` this is likely where you will have to input your Windows username and your local file path. Unless of course your name is Colin, which case internet high five!

![Horse Head High Five](https://media.giphy.com/media/GYU7rBEQtBGfe/giphy.gif)

So yeah, there’s that…

Let’s proceed. Run the command to start the application creation and build process. Accept the `fetch and install` question that you may be prompted with. Also, the structure of creating your app will be `mix phx.new [the name of your application]` just as an aside.

```
mix phx.new hello
```

We should see this as the result (this is just the bottom section of the output).

```
We are almost there! The following steps are missing:
$ cd hello
    $ mix deps.get
    $ cd assets && npm install && node node_modules/brunch/bin/brunch build
Then configure your database in config/dev.exs and run:
$ mix ecto.create
Start your Phoenix app with:
$ mix phx.server
You can also run your app inside IEx (Interactive Elixir) as:
$ iex -S mix phx.server
```

Now we have to change directory into our applications folder.

```
cd hello
```

Before we create our database we need to grab some dependencies and build our assets.

```
mix deps.get
```

Build the assets.

```
cd assets && npm install && node node_modules/brunch/bin/brunch build
```

Now we can create our database for our application (fingers crossed), we also need to change our directory one level up to the root of our project’s folder in order to use ecto.create (install any dependencies it asks for).

```
cd ..
mix ecto.create
```

w00t!!! Hopefully you get this message!

```
The database for Hello.Repo has been created
```

Let’s start our Phoenix server.

```
mix phx.server
```

Now we need to open up our browser and navigate to localhost:4000 if all worked out as intended you should see this webpage. If you see it **CONGRATULATIONS!!!!**

![Welcome to Phoenix Landing Page](https://cdn-images-1.medium.com/max/800/1*t_wg-0zuTTvgEVm0pL2w-A.png)

## Conclusion
Hot damn we got it installed and running! That should be it folks. Elixir and Phoenix up and running on Windows Subsystem for Linux in Windows 10.

![Too Cool](http://media.giphy.com/media/62PP2yEIAZF6g/giphy.gif)
