# Flow
## Webapp for event-driven and GM-less Roleplaying
### Creative Coding I. "Design & Communication" -- Filmuniversität Babelsberg 

Flow is an RPG System implemented as Webapp, that tries to rethink the roleplaying formula with a webapp.
For more informations refer to the [concept](https://github.com/seb-ctech/cc1-flow/wiki/concept)

Even though the System is implemented as a publically available Webapp, the System as a result of it's ruleset is the product of a long creative process and therefor intellectual property (c) 2021.


## Scope of the Project

This project provides a basic server and frontend setup to support the basic mechanic: a session where players can join and create events, by mentioning past events. The frontend is responsible for displaying the event history and the event relation in a pleasing and clear way, aswell as providing a good user experience for the process of the event creation. The server handles the connection of players and feeds the past events via "GET" requests and stores the events in a database via "POST" requests.

Take a look [at the rules](https://github.com/seb-ctech/cc1-flow/wiki/rules) to understand the system.

A Session is the hearbeat of the webapp. Players can create a session, join a session or follow a public session. The scope only covers one global session, where players can join anonimously (no login required). The creator of the session will do so by also creating the origin event. This main event does not only represent the starting point but also functions as teaser to attract other potential players who are looking for a session to join. When a player joins he must step through the three "phases". First of all he adds a new global event in the "background phase" in his active stage, then the other players add an event in the reactive stage. Then he creates his character in the "character phase" with the origin event. Then he takes several turns to build his character up with additional events in his active stage and accept additional events in his reactive stage. This can be done asynchronously. A player can join an ongoing session similarly how some characters get introduced later in a book or series. The player who joins later can use any shift, twist or background event to mention in his character's defining events. 

The session contains the chain of events in chronological order. There can be options to only focus on one characters plot line or to read all background events (these options are however not covered within the scope of this project). However the main line of action is told linearly, making it very clear which player's turn it is! Players can invalidate events in form of vetos, to keep it fair. An event will always be created. Only if a player feels that the event does not follow the rules he can put it up for a validation vote. In the future there could also be a option to vote for events, which can be displayed on the landing-page feed as a memorable "moment", to showcase and praise a player's creativity and writing skill. (This option is taken into consideration but not implemented) 

To understand the correlation to the entire architecture and system, refer to [this diagram](https://miro.com/app/board/o9J_lWt0oK4=/)

This project will focus on and implement the highlighted (orange) components, however the other highlighted (cyan) components were taken into consideration for future scalability when building the overall server and frontend architecture. The focus of this project is solely on event creation and linking. There will be no phases, flow units, active and reactive stages, or trackable characters yet. This would require keeping track of players, which would need to log in. 

The options and functionality are showcased in the [user story](https://miro.com/app/board/o9J_lWt0oK4=/)