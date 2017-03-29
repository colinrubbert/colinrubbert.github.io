---
layout: post
title: 'Installing Ruby on Rails in Windows 10 w/Bash & PostgreSQL'
permalink: installing-ruby-on-rails-in-windows-10-with-bash-and-postgresql
---


## Installing Rails: The Steps

This will focus on installing Ruby, Rails, and getting PostgreSQL to play nicely with Rails and Bash on Windows 10. We will be leveraging the Linux subsystem on Windows 10. This article will not go over installing the Linux Subsystem and getting Bash up and running, there's already great articles on that very subject. Here is Microsoft's guide on installing the [Linux Subsystem](https://msdn.microsoft.com/en-us/commandline/wsl/install_guide).

Let's continue on to installing Ruby, Rails, and getting PostgreSQL up and running so that we can use Windows 10 as a development environment for Rails web development.

## Installing the pre-requisites

First we need to make sure that are current install of Bash on Windows is update to date.

**Pro Tip:** If you ever run into an issue or you just need to figure out what command or procedure you need to do for specific tasks in regards to Bash on Windows you can simply Google the question and reference Ubuntu. Bash on Windows is built on top of and in partnership with Ubuntu which makes troubleshooting (Linux specific issues & procedures) quite easy.

Lets update and install some prerequisites.

```bash
sudo apt-get update
sudo apt-get install git-core curl zlib1g-dev build-essential libssl-dev libreadline-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt1-dev libcurl4-openssl-dev python-software-properties libffi-dev postgresql-client-common postgresql-client libpq-dev
```

The terminal will likely prompt you to make sure that it's okay to install a specific package, just type `Y` and hit `Enter`.

```bash
After this operation, 6,082 kB of additional disk space will be used. Do you want to continue? [Y/n] Y
```

That should cover all of the pre-requisites that we will need to be installed to continue on with the process. The pre-reqs are required to get Ruby installed and PostgreSQL (which we will be going over a little bit later).

## Installing Ruby

In order for us to install Rails we first need to install Ruby. For the purpose of this article we will be installing `Ruby 2.4.1`, your version may differ but at the time of writing this `Ruby 2.4.1` is the latest stable build.

In order to install Ruby we will be using `rbenv` to handle the install and management of our Ruby gems.

Here is a script that will make life for us just a little bit easier. You should be able to just copy and paste this into your terminal but just like life, your mileage may vary.

```bash
cd
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
exec $SHELL

git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> ~/.bashrc
exec $SHELL
```

Now that we have our path built and plugin directory installed for rbenv and Ruby we can now install the latest Ruby version.

Installing Ruby this way takes a bit running through the terminal; patience young grasshopper.

```bash
rbenv install 2.4.1
rbenv global 2.4.1
ruby -v
```

**Disclaimer** if you are like me and already had rbenv & Ruby previously installed and are getting a message that says…

```
ruby-build: definition not found: 2.4.1

The following versions contain `2.4.1' in the name:
  rbx-2.4.1

See all available versions with `rbenv install --list'.

If the version you need is missing, try upgrading ruby-build:

  cd /home/cr/.rbenv/plugins/ruby-build && git pull && cd -
```

… you will need to pull the latest version of rbenv and it's definitions so that you can install the latest version of Ruby. To do that simple input this into your terminal.

```bash
cd ~/.rbenv/plugins/ruby-build/
git pull origin master
cd -
```

Now you can go back to the previous step and install the latest Ruby version you have in your definitions.

## Installing Bundler

Next we need to install `Bundler` Ruby's package manager. This one is pretty simple.

```bash
gem install bundler
```

Now we need to `rehash` our gems, this updates the pointers to the right location of the new packages.

```bash
rbenv rehash
```

## Installing Ruby on Rails Pre-requisites

Rails is dependent on NodeJS for runtimes in the asset pipeline so we will need to first install NodeJS.

Lets add NodeJS official repository to our system.

```bash
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
```

Now that the official respository is mapped to our system we will need to install NodeJS.

```bash
sudo apt-get install -y nodejs
```

Awesome, lets just take a minute to make a little sanity check before we continue on installing Rails. Lets just make sure that NodeJS is installed.

```bash
nodejs -v
```

You should get something like `v4.8.1`. If you get a version with the last command lets continue on installing Rails.

## Installing Ruby on Rails

Now that we've got Ruby and all of our pre-requisites for Rails installed we can go ahead and install Rails.

```bash
gem install rails
```

Pretty straightforward really but we have to remember to `rehash` our environment so we have all the correct pointers.

```bash
rbenv rehash
```

Now lets check to see we have the correct version of Rails installed.

```bash
rails -v
```

We should hopefully get `v5.0.2` or a similar version. Again mileage may vary.

**AWESOME!** We've got Rails installed on our system!

Lets not get in front of ourselves though, we still can't really use it. We need to setup our database infrastructure.

## Installing PostgreSQL

At this point I'm going to state that the current, easiest and most supported database environment that works without workarounds with Rails is MySQL. That being said nearly every developer and bootcamp I can think of uses PostgreSQL and really that's likely why you are here, so can we use PostgreSQL w/Rails on Windows 10 Bash Linux Subsystem?

Well, we can, we just have to do a little bit of working around. Instead of our typical route of installing PostgreSQL through the terminal we will have to install PostgreSQL as a Windows binary and getting our two systems to connect to each other.

I'll be honest, it's a bit of a pain in the ass but Microsoft is currently working on the issue and hopefully we won't have this issue in the near future. They've done good work listening to the community and pushing through the work quickly so I'm hopeful.

Lets download and install the latest stable version of PostgreSQL Windows binary.

*PostgreSQL 9.6.2 provided by BigSQL:* [Download](http://oscg-downloads.s3.amazonaws.com/packages/PostgreSQL-9.6.2-2-win64-bigsql.exe)

Now that we have the PostgreSQL downloaded, lets begin to install it.

Follow along with the "Setup Wizard" leaving the defaults checked. If you want to install the additional packages you can but it's not necessary and we don't need the extra bloat.

Once you get to the "Password" section set up your password that you want for your `postgres` user account. I choose to just have my password be `password` for ease of use in my local environment. You can choose whatever password that you want but you will need to remember it later on in our work.

**DO NOT USE "PASSWORD" FOR YOUR PASSWORD IN YOUR PRODUCTION ENVIRONMENT!!!**

Great we got that installed, we got our password set, lets do a quick sanity check to make sure that our Bash Linux Subsystem is connecting to our Windows installation of PostgreSQL.

Run this command from your Bash terminal.

```bash
psql -p 5432 -h localhost -U postgres
```

If everything was installed properly you should get a response similar to this and the postgres shell prompt.

```bash
psql (9.5.6, server 9.6.2)
WARNING: psql major version 9.5, server major version 9.6.
         Some psql features might not work.
Type "help" for help.

postgres=#
```

Great we got it working. Now type `\q` to exit the postgres shell.

## Creating our Rails application

First we want to make sure that we are in the correct directory. I use a directory on my desktop to keep my files organized, again your mileage may vary. We will use my file locations for an example and you will have to substitute where it is necessarry.

```bash
cd /mnt/c/Users/User/Desktop/projects/applications
```

Note that we are storing our application in our **Windows** filesystem and **NOT** our Linux Subsystem. This is why we are changing directory into `/mnt/c/Users` from here you will have to identify your Windows user account, you can do this by running `ls` and seeing what shows up. For me my user account name is `User`. After that you will have to `cd` your way to the directory that you want to work in.

Now that we are in the proper directory lets create our first application.

```bash
rails new windows_bash_test_application --database=postgresql
```

We should see rails creating the application.

Change directory into your application.

```bash
cd windows_bash_test_application
```

Lets setup our `database.yml` file real quick just to make sure everything is still going good with our PostgreSQL installation.

```
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  host: localhost

development:
  <<: \\\*default
  database: windows_bash_test_application_development
  username: postgres
  password: password

test:
  <<: \\\*default
  database: windows_bash_test_application_test
  username: postgres
  password: password

production:
  <<: \\\*default
  database: windows_bash_test_application_production
  username: windows_bash_test_application
  password: <%= ENV['WINDOWS_BASH_TEST_APPLICATION_DATABASE_PASSWORD'] %>
```

Now from our terminal lets create our database.

```bash
rake db:create
```

If everything is working good we should get a message saying our development and test database was created.

```bash
Created database 'windows_bash_test_application_development'
Created database 'windows_bash_test_application_test'
```

Lets run our Rails server and make sure everything is working.

```
rails s
```

Now in your browser go the your `localhost:3000` and you should be presented with verification that Rails is indeed running and installed.

![](/uploads/versions/rails-verification---x----511-375x---.png)

## Conclusion

That's it, you're all set to go. We now have Rails running with PostgreSQL on a Windows 10! Give yourself a pat on the back!! Woohoo!!!

If you have any questions you can contact me and I will do my best to help you along, there are some pretty common gotchas but if you just spend a few minutes Googling them you should find your resolution. Remember Google is your friend. If you still are having issues reach out and I'll see what I can do to give you a hand.