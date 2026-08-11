// Heads Off case study. Designer-voiced, no em dashes.
export const HEADSOFF_STUDY = `# Designing a social word game around one deceptively simple mechanic

*Heads Off · iOS Word Game · Product Design Case Study*

Heads Off is a mobile word game built around a simple rule: **solve the first clue, remove the first letter, then solve the second clue.**

**Clue 1:** A pointed throwing weapon. **Answer:** SPEAR

Remove the first letter.

**Clue 2:** A fruit. **Answer:** PEAR

The challenge is designing pairs where both words work, making the moment of removing the first letter feel satisfying rather than confusing.

## Where it comes from

This game is not something I invented. It's something I grew up with.

In Israel there's a word game called **"קפד ראשו"**, which roughly translates to "off with its head." It needs no board, no pieces, no screen. Someone makes up a clue pair, everyone else guesses. I used to play it with my dad on long car rides: he would throw out the first clue, I would shout answers from the back seat, and the best moment was always the beheading, when the first letter dropped and a whole new word appeared inside the one you'd just solved.

Living in New York now, the game is one of those small things that reminds me of home. Heads Off started as a way to carry it with me: take the game from those car rides and give it a life on the iPhone, in English, with friends who never heard a word of Hebrew.

The name's guillotine energy naturally led to the visual world of the Queen of Hearts, playing cards, crowns, and Wonderland. But the goal wasn't to build a novelty Alice in Wonderland game. The goal was to turn the game I grew up on into something that feels **modern, competitive, social, and replayable on iPhone.**

## The problem

Most word games fall into one of two categories. They are either extremely simple daily puzzles like Wordle, or much heavier games filled with levels, currencies, boosters, maps, and progression systems.

Heads Off needed to sit somewhere in between. I wanted the game to be understandable within seconds, but still have enough personality and social interaction to make people come back.

The main product questions became:

- How quickly can a new player understand the mechanic?
- How do we visually explain that the two clues are connected?
- How do we make removing the first letter feel like the core moment of the game?
- How do we create replayability beyond solving riddles alone?
- How much theme can we introduce before it starts hurting usability?
- How do we make a word game feel premium without making it feel old-fashioned?

## Product goal

The core product principle became:

> **Easy to understand. Hard to solve. Fun to send to someone else.**

Instead of building around an endless level map, I focused the experience around two modes.

### Play Solo

A quick way to learn the game and solve riddles independently.

### Play Against Friends

An asynchronous multiplayer mode where players can challenge friends and take turns solving the same set of riddles.

The multiplayer mode is especially important because it creates a natural growth loop: **solve, challenge a friend, friend installs, friend challenges someone else.**

## Research

I started by studying how existing word and casual games teach mechanics, structure sessions, and encourage repeat play. Rather than copying any one game, I looked at the strengths of several different models.

### Wordle

Wordle proved how powerful a game can be when the rules are immediately understandable. There is almost no interface beyond the puzzle itself. The lesson for Heads Off: remove anything that doesn't help the player understand or solve the current puzzle.

### Connections

Connections shows how important presentation is when the puzzle itself contains relationships between words. The interface doesn't explain every possible connection upfront. It gives players enough structure to discover the relationship themselves. For Heads Off, I wanted the relationship between the two clues to feel similarly discoverable.

### Draw Something

Draw Something was especially relevant for multiplayer. The game wasn't about sitting online together. You played a turn, sent it to someone, and waited for them to respond. That asynchronous model works naturally for Heads Off. Players shouldn't have to coordinate schedules just to play a word game together.

### NYT Games

NYT Games demonstrates how a collection of simple mechanics can feel premium through typography, spacing, restraint, and strong interaction design. That influenced my decision to keep the actual gameplay interface much cleaner than the visual identity might suggest.

## Key research insight

The most important realization was that **the two clues cannot simply look like two separate cards.**

In early explorations I displayed the two clues inside two visually separate cards. They looked nice, but the relationship between them wasn't obvious. A player could easily interpret them as **Question 1** followed by **Question 2** instead of **one transformation puzzle.**

That became the central UX problem of the game.

## Designing the core interaction

The mechanic needs to communicate three things:

1. Solve the first word.
2. Remove its first letter.
3. Use the remaining letters to solve the second clue.

The interface therefore has to visually show the transformation rather than relying on instructions. Once the first answer is solved, the first letter becomes the focus. The game then removes it, and the remaining letters become the starting point for the second answer.

The transition itself becomes part of the reward. Instead of simply showing **Correct!**, the interface physically demonstrates the rule. That moment is where the name **Heads Off** starts to make sense.

## Progressive disclosure

I didn't want to explain the entire game with onboarding screens. The better approach was to teach through interaction.

On the first puzzle, the game briefly shows **Solve the first clue**. After the player succeeds: **Off with its head.** The first letter disappears. Then the second clue becomes active.

After experiencing that once, the player understands the game. No tutorial carousel required.

## Information hierarchy

The gameplay screen prioritizes only a few pieces of information.

1. **The clue.** The player's attention should immediately go to the current riddle.
2. **The word.** Answer slots sit directly beneath the clue.
3. **The keyboard.** Typing should require almost no visual travel.
4. **Hints.** Accessible without competing with the puzzle.
5. **Progress.** Round, lives, and match information sit around the edges.

Everything else is secondary.

## Rethinking the two riddles

One of the biggest iterations was how the two clues appear. My first version gave both clues almost equal visual weight. That created ambiguity.

The improved model treats them as **two stages of one puzzle**.

### Active clue

Full contrast and full emphasis.

### Upcoming clue

Visible enough to establish that something comes next, but visually muted.

### Transformation

A clear visual connector communicates that the answer from clue one becomes the starting point for clue two.

This creates a hierarchy of **solve, transform, solve again** instead of **question, question**.

## Solo vs multiplayer

Initially I treated Solo as the primary action and multiplayer as secondary. That created another product problem: if social play is one of the main reasons Heads Off could spread, hiding it behind a secondary button works against the product strategy.

I changed the home screen so both modes receive similar visual weight.

- **Play Solo.** Challenge yourself.
- **Play Against Friends.** Invite and play.

Neither is buried inside a tab or menu. The player understands the two ways to play immediately.

## Async multiplayer

I intentionally chose asynchronous play instead of real-time multiplayer. Real-time multiplayer introduces friction:

- both players must be online
- matchmaking becomes necessary
- networking becomes more complicated
- sessions become harder to start

Async play works much better for a lightweight word game. A player completes their turn and the opponent sees **Your Turn** on their home screen. This creates a lightweight reason to return without requiring both people to be available at the same time.

## The home screen

The home screen is designed around three questions.

1. **What can I do right now?** Play Solo. Play Against Friends.
2. **Is anyone waiting for me?** Your Turn.
3. **What state am I in?** Lives, hints, profile.

I intentionally avoided a traditional tab bar. The game doesn't have enough top-level destinations to justify one. The main screen itself acts as the navigation system.

## Visual direction

The name Heads Off immediately creates a strong visual universe. The obvious direction would have been to fully embrace ornate Wonderland imagery. I explored that, but quickly found that too much decoration made the game feel more like a themed casino or card game than a modern word game.

The final visual direction balances two worlds.

### Wonderland

Queen of Hearts, crowns, hearts, playing-card characters, deep red, gold details.

### Modern iOS

Simple layouts, large tap targets, clear hierarchy, restrained shadows, minimal navigation, generous spacing, limited ornamentation during gameplay.

The theme creates identity. The UI still does the work.

## Color system

The palette is intentionally small.

- **Black.** The primary background creates contrast and makes the game feel more premium.
- **Deep Red.** Primary actions, hearts, active states, and the Queen of Hearts identity.
- **Warm Cream.** Important surfaces and typography. It references playing cards without using pure white.
- **Gold.** Used sparingly for borders, crowns, progress details, and rewards. An accent rather than the main interface color.

## Typography

The display typography is intentionally theatrical. The **Heads Off** wordmark is closer to an illustration than UI typography, so I treat it as a graphic asset. Functional typography remains native and much simpler.

This separation prevents the entire application from becoming difficult to read. **Brand typography creates personality. UI typography creates clarity.**

## Game economy

For the initial version, I wanted the economy to remain extremely lightweight. Players receive **3 hints**. Hints can reveal information when the player gets stuck.

Future monetization could include rewarded ads or additional hint packs, but the core puzzle should remain playable without purchases. I deliberately avoided adding coins, gems, XP, chests, streak currencies, and other systems before proving the core game is fun.

## Product principles

Throughout the design process I used five principles to evaluate decisions.

1. **The puzzle comes first.** Theme should never compete with solving.
2. **Teach by playing.** Players should understand the mechanic through their first puzzle rather than through instructions.
3. **Make transformation visible.** Removing the first letter is the signature interaction. It should feel physical and satisfying.
4. **Multiplayer should be effortless.** Starting a game with a friend should require as few steps as possible.
5. **Personality without clutter.** Unmistakably Heads Off without covering every surface in Wonderland decoration.

## Core user flow

1. Open app, land on Home
2. Choose a mode: Play Solo or Play Against Friend
3. Round begins, read clue 1
4. Enter answer, correct
5. **HEADS OFF.** First letter removed
6. Clue 2 becomes active, solve the second word
7. Round result, next round, match result`;
