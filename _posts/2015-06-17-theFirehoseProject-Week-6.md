---
layout: post
title: The Firehose Project - Week 6
permalink: blog/2015/6/17/thefirehoseproject-week-6
thumbnail: places-47-thumb.jpg
image-category: places
hero: places-47.jpg
---



Another week in the bank, today I’m rounding out week 6 of theFirehoseProject bootcamp. Like every week of this bootcamp I’ve learned some cool things, battled with a few others, and found some wonderful pieces of advice. I’ve gone from sticking to a template and building a simple CRUD application to starting to implement my own features. Finding the resources necessary to solve a problem isn’t too difficult in the Rails community, in fact most everything has been done in one way or the other, doing some Googling usually comes up with a dozen posts and articles about that can be extrapolated to your own needs. Let’s get started with what I learned this week.

Battling nested resources is a bitch, plain and simple. While it can make some things very easy and intuitive it will leave others to become an impossible battle of attrition. My intention was to have my ‘workorders’ resources to be nested inside of my ‘customers’ resources. Seemed logical at the time, my workorders belong to my customers and I want my customer’s id to be tagged in my workorder so that I can do some filtering, makes complete sense. Because I must be a glutton for punishment and want to complicate things further I wanted to make sure my ‘techs’ (the users of my applications) to be able to have their id’s tagged in my customer’s workorders. On paper this seems to be a very easy thing but in reality it was like running up a steep hill trying to pull a semi up with you, wasn’t happening. Especially not in any elegant or beautiful way.

The battle ensued, not willing to give up I tried numerous things that I had found in SO posts, random blog postings, anything that could potentially give me a leg up on this situation. This brought me to dealing with relationships of models. Fiddling around with how the relationships interacted with each other I finally got it to work after 3 hours of battling what was going on. **BOOM**! Tech_id is being stored in my workorders! But wait, what happened to my customer_id!? AHHH!!!! This is a losing battle, I fix one thing and another breaks. I had to take a break, it was late, I was frustrated, and neither of those were working for me.

**Lesson 1 of week 6: Sometimes you need to step away from the problem and come back with fresh eyes later.**

After talking with my mentor and him giving me an example of ‘has_many through’ relationships, something he thought would be much better than how I was going about it (he was right), I decided to scrap all the work I had done the previous day. Nested routes are not the way to go in this situation and it’s causing more headaches than it’s worth.

**Lesson 2 of week 6: Sometimes you just have to burn it all down and start from scratch, what seems like the right direction in your head may not be the best practical approach.**

Removing the nested resources and leaving each model to themselves gave me the solution I was looking for; functional and simplistic. At this point I realized that an acronym I learned at quite a young age fits perfectly with coding; KISS - keep it simple, stupid. I moved forward building out my models, controllers, and relationships, things were moving now. With every new customer and workorder my tech_id was tagged with the entry, exactly what I wanted, however, because of the resources not being nested anymore it left a new challenge, how do I get my customer_id to be tagged in my workorders?

In comes the invaluable resource of a mentor. Being completely frustrated after a few hours of research and trying to find out how or why my customer_id wasn’t being passed along to the workorder I decided this would be the best thing we could talk about in our mentor session because I was lost. This decision turned out be a great because he was able to challenge me and send me down a road to learning something new. He gave me 3 words and sent me on my way to find the solution “string query passing”. String query passing is the method of passing along a string query (specific parameters) to the url to store your parameters on the next page. This was the solution I was looking for and with renewed excitement I diligently searched the internet for an example. What I was able to do is click on a customer, it brings me to the ‘show’ page for the customer and when I click on the ‘create new workorder’ button it sends me to the page to create a new work order. However, inside of the <% link_to %> what I ended up doing is pulling the customer’s id and passing it onto the next page essentially storing that customer’s id in the url so when I pressed submit on the work order I could pull that stored customer_id. BINGO. Bob’s your uncle. <insert more colloquialisms about getting something right>

**Lesson 3 of week 6: You don’t have all the answers, get advice, ask people who are smarter and more experienced that you.**

For the rest of the week things moved on smoothly. I knocked out another coding challenge which I ended up learning quite a bit about Ruby Marshaling which is the method of serializing data into binary and storing that information outside of your script so that you can come back to it later and retrieve the stored values, a nifty little feature of Ruby. This method made my coding challenge quite a bit more simplistic which is always wonderful.

The final thing of this week that I learned was adding a simple search function to my application. This is where I start to leave the script a bit more. I started to build out my own features to implement in my application. Not having much to go on as far as how to implement it in Rails I go on a search for the answer. This is a feature that I have wanted for awhile but was unsure on how to implement it or even where to start, with some good advice from Ben and Ken I found how to do the search; ActiveRecord Querying. This rabbit hole led me to finding the solution to my problem. Testing out the solution in my rails console I found that this is exactly what I was looking for “Table_name.where(“lower(column_name) LIKE ?”, “%#{search_params}%”)” this one line is the meat and potatoes of my search functionality. I had the key now I had to find the door. After a little bit of googling I found some great resources for building out the search functionality and after about an hour of working on it have a fully functional search feature.

**Lesson 4 of week 6: Your passion project will expand your knowledge, the features you want in your app will give you the direction to learn new things outside of any tutorials.**

Overall week 6 was great, I learned a lot more than I had expected and knocked out a lot of features and functionalities of my passion project. I found some great rabbit holes to run down, leveraged smarter people’s experiences to find the path to my solutions, and humbled myself once again by having to learn the value of stepping away from a problem, pride be damned. Another week in the bag and another step forward with an armful of new knowledge and insights.
