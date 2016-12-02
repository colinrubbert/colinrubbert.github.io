---
layout: post
title: The Firehose Project - Week 4
permalink: blog/2015/6/3/thefirehoseproject-week-4
thumbnail: places-12-thumb.jpg
image-category: places
hero: places-12.jpg
---



Oh boy what an exciting and brutal week! The training wheels were taken off and I’m a bit wobbly still. My forward momentum isn’t quite efficient enough to keep me from touching down a foot frequently to brace myself from impacting the ground. The week was surrounded with free reign to build something I’m passionate about.

Like I mentioned last week my mentor and I decided I would get the most out of our mentor sessions if I built something I am passionate about and that’s exactly what I am doing. I wouldn’t say that I’m necessarily die hard passionate about it but there is definitely a niche that can be filled, I have the industry knowledge to understand what is necessary and I currently dislike the status of this space.

What makes it an interesting project is that I get to disrupt a sector that is otherwise only inhabited by one small company not even selling their product as a primary service. Coming from an IT background with a focus on customer computer, device, and server repair I have a deep need to be able to keep track of my repairs of my customer’s devices. That’s where my app comes into play.

I’ve decided to build my device repair tracker and situate as a SAAS application so to be sold to the public. I’m getting the best of both worlds, a passion project and practical development of my skills. This little passion project will and has already taken me down various roads and technologies.

That’s the exciting part of my fourth week of theFirehoseProject, I have a passion project. With that though, it has also brought on some unruly headaches, bouts of utter confusion, and moments of complete “WHAT THE FUCK! WHY WON’T YOU WORK!”. Good news, I’m still at it.

So what are some of the things that I actually learned this week? For one, database design and data design is very important. Let’s repeat that with a little bit more emphasis **database and data design is VERY important!** When going about designing an application one should take the time to try and figure out how everything will connect with each other. Having to burn down hours of coding because you didn’t think about data relationships will leave you extremely frustrated.

I spent hours building multiple models and controllers just to hit a wall and realize this is all repetitive and doesn’t make any sense. *GRABS TORCH TO BURN IT ALL DOWN* Start from scratch this time with the knowledge of how things should relate to each other. Ah yes, that feels better. Smooth sailing from here on out… Oh wait, what’s that?

INFLECTIONS! Unexpected introduction to how Rails is configured to do certain tasks. While adding some columns to my ‘Tech’ model I realized that rails kept renaming this table name to ‘teches’, well what the fuck! That’s not the pluralization of the word ‘Tech’, go figure after excessive hours of rebuilding my models, controllers, and user models I run into an edge case.
Naturally, the little OCD demon kicked and couldn’t have that pluralization error stay there. Do a little research on how to rename tables in rails and boom I’m making a database migration for renaming a table. Looks to have worked exactly how I wanted it to, oh wait! No it didn’t, **‘AHHHH!’ ‘WHAT THE HELL IS WRONG WITH YOU! WHY WON’T YOU SPELL THIS CORRECTLY’. **

Enter hours of chasing down vague database errors. A couple hours into my research and multiple attempts to rename the table and multiple drops and recreation of my databases I learned about inflections. Inflections in Rails is the action of singularizing and pluralizing words, seems legit and extremely helpful, however, English is not a sane language it’s got a ton of random rules that don’t make sense and tons of edge cases where rules just get tossed right out the window. More hours spent, few head smacks against the keyboard, some bitching at my monitors and I finally figured out how to solve the problem I’ve been encountering. 99% of the time you would never run into this issue but I managed to fall into that 1% and so I learned all about inflections in Rails.

I am back on track though. Starting to flesh out what I want to do with my device repair tracker and I’m making solid progress. The frustrations of the mistakes have been excellent learning experiences and have only grown my knowledge and skillset. I’ve always been a big proponent of learning from your mistakes but man this journey on becoming a web developer has really solidified the value of mistakes and just how much you can learn from them. Still loving what I’m doing and getting more comfortable with it each day. The journey so far has been amazing.
