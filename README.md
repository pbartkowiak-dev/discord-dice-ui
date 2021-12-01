[![Discord Dice Ui](./public/logo.png)]() 

# 🎲 Discord Dice UI

> **Discord Dice UI** is a website based app which can be integrated easily with Discord server. In short, it offers a neat interface to roll dice and provides more advanced functions and dice manipulations for the supported systems. I conceived it as a simpler alternative to more complex VTTs, and as a more advanced alternative to traditional, command driven Discord bots.

Table of content:  
- [The App Overview](#overview)
    * Supported Systems:
        + [Call of Cthulhu 7e](#call-of-cthulhu)
        + [Warhammer](#warhammer)
        + [Wrath & Glory](#wrath-and-glory)
        + [Conan 2d20](#conan-2d20)
        + [Infinity 2d20](#infinity-2d20)
        + [Legend of the Five Rings 1e](#l5r1e)
        + [Legend of the Five Rings 5e](#l5r5e)    
        + [Narrative Dice](#narrative-dice)    
        + [Fate](#fate)    
        + [The One Ring 2e](#the-one-ring-2e)    
- [Combat Tracker](#combat-tracker)
- [X-Card](#x-card)
- [Discord Configuration](#discord-configuration)
- [Query parameters](#query-params)
- [Developers' Info](#dev-info)

## 🎲 The App Overview <a id="overview"></a>

The App interface:  
[![App interface](./public/app.png)]()

Sample results inside a Discord Chat:  
[![Sample Chat Results](./public/chat-sample-results.png)]()

Sample results inside the App:  
[![Sample App Results](./public/app-sample-results-1.png)]()

## Call of Cthulhu 7e <a id="call-of-cthulhu"></a>

After selecting the mode in the _Roll Options_ a dedicated modal will be shown for rolling d100 skill tests - with option to Push the roll and guidelines for optional spending luck.

[![Call of Cthulhu 7e Mode 2](./public/coc-mode-2.png)]()

Skill values can be stored in build-in character sheet:

[![Call of Cthulhu 7e Character Sheet Icon](./src/img/sheet-icon.png)]()

[![Call of Cthulhu 7e Character Sheet](./public/cthulhu-sheet.png)]()

## Warhammer <a id="warhammer"></a>

The app offers special support for rolling Success Levels in Warhammer 2e, Warhammer 4e and Dark Heresy II.

[![WFRP Mode - app](./public/wfrp-result-app.png)]()

The app can also help with adding and subtracting gold crowns, silver shillings and brass pennies:

[![Warhammer Money Converter Info](./public/money_converter-info.png)]()

[![Warhammer Money Converter](./public/money_converter.png)]()

## Wrath & Glory <a id="wrath-and-glory"></a>
- neat, colorful, and interactive interface
- skill test with automatical Icons calculation
- various number of Wrath Dice in a roll
- ability to reroll all dice
- ability to reroll selected dice
- abillity to increase Dice Pool after rolling the dice
- d6, d3 and d66 dice available

[![Wrath and Glory UI](./public/wrath-and-glory-01.png)]()

[![Wrath and Glory Results](./public/wrath-and-glory-02.png)]()

## Conan 2d20 <a id="conan-2d20"></a>

This mode adds special modal for testing abilities, generating Hit Location and rolling Combat Dice:

[![Conan 2d20 Mode general interface](./public/conan-mode-1.png)]()

In the modal one can define Focus, Target Number, Difficulty, select amount of dice rolled, focus and so on:

[![Conan 2d20 Mode modal](./public/conan-mode-2.png)]()

Damage Dice Result (with option to reroll selected dice):

[![Conan 2d20 Mode Combat Dice roll results](./public/conan-mode-3.png)]()

## Infinity 2d20 <a id="infinity-2d20"></a>

[![Conan 2d20 Mode general interface](./public/infinity-mode-1.png)]()

## Legend of the Five Rings 1e (classical Roll and Keep) <a id="l5r1e"></a>

Roll and Keep Results:  
[![Roll and Keep Results Modal](./public/roll-and-keep-results.png)]()

## Legend of the Five Rings 5e <a id="l5r5e"></a>

Allows to roll Skill and Ring Dice and to modify the results:  
[![L5R Pool Builder](./public/l5r-1.png)]()

Roll Results:  
[![L5r Results Modal](./public/l5r-2.png)]()

## Narrative Dice <a id="narrative-dice"></a>

Allows to build a custom dice pull from popular space opera RPG series:  
[![Narrative Dice Pool Builder](./public/narrative-dice-1.png)]()

Roll Results:  
[![Narrative Dice Pool Builder](./public/narrative-dice-2.png)]()

## Fate <a id="fate"></a>

[![Fate dice](./public/fate.png)]()

## The One Ring 2e <a id="the-one-ring-2e"></a>

The app now allows to roll unique TOR dice. It calculates the roll results automatically and takes into the consideration factors:
- Hero's conditions (_Weary_, _Miserable_)
- Rolling the _Favoured_ or _Ill-Favoured Roll_
- Rolling as an Adversary (reverses results for the Feat Die)
- Shows the results clearly on Discord chat

Interface:  
[![TOR Interface](./public/tor-interface.png)]()

Skill Test:  
[![TOR Skill Test](./public/tor-skill-test.png)]()

Results Modal:  
[![TOR Results Modal](./public/tor-results-modal.png)]()

Results on Discord:  
[![TOR Results on Discord](./public/tor-discord-results.png)]()

--------------------------------------------

## ⚔️ Combat Tracker <a id="combat-tracker"></a>

The Combat Tracker lets you organize the combat and share the current state of the battlefield with other players on Discord. It supports:
- creating combat zones and moving combatants between them
- adding descriptive conditions
- adding descriptive wounds
- sorting combatants in the initiative order
- tracking HP
- tracking the advantage (Warhammer 4e support)
- creating combatants of the same type easily with one click (the _Copy_ button)  
- saving the favorite combatants for the latter encounters

[![Combat Tracker UI](./public/combat-tracker-1.png)]()

[![Combat Tracker on Discord](./public/combat-tracker-2.png)]()

--------------------------------------------

## X-Card <a id="x-card"></a>

The X-Card is an optional tool created by John Stavropoulos that allows anyone in your game to edit out any content anyone is uncomfortable with as you play.

[![X-Card Modal](./public/x-card-2.png)]()

[![X-Card Submitted on Discord](./public/x-card-1.png)]()

You'll find more details on the X-Card under the following link: [http://tinyurl.com/x-card-rpg](http://tinyurl.com/x-card-rpg)

--------------------------------------------

## 🔧 Discord Configuration <a id="discord-configuration"></a>

In order to get started, **Discord's server admin has to create a Webhook** and share a special link with other users. Read below how to do it.

1. As a server's admin open your chat's context menu.
![how-to-1](./public/how-to-0.png)

2. Select _Server Settings_ from the context menu.
![how-to-2](./public/how-to-1.png)

3. Select _Webhooks_ in the left side menu and then press the button _Create Webhook_.
![how-to-3](./public/how-to-2.png)

4. Name your Webhook and provide an icon (optionally). **Copy a link** to obtain your unique Webhook url and press **Save** button to close the modal.
![how-to-4](./public/how-to-3.png)
🛑 **Never share your Webhook link publicly and keep it a secret. You don't want to allow strangers to publish messages in your chat.**   

5. Now you can share the Webhook url with other players in two ways:
    1. **Via link param**.  
    Provide your players a link to an app which looks like this:
    ```
    https://discord-dice-ui.herokuapp.com/?q=UNIQUE_CODE_FROM_YOUR_DICORD_WEBHOOK
    ```

    > 💡 **HINT**: You can generate the link using _Copy App Link_ button in the Setting Modal:
    >
    > ![how-to-5](./public/how-to-5.png)

    2. **Manually**.  
    Alternatively, every user has to enter the provided Webhook link url in the Settings modal inside the app. Entering the username is required as well.
    ![how-to-5](./public/how-to-4.png)

6. Saving the Webhook in the app will connect the app with the Discord server.

--------------------------------------------

## 🔗 Query Parameters <a id="query-params"></a>
Several settings can by passed directly in the URL in the following format:
<pre xmlns="http://www.w3.org/1999/html">
discord-dice-ui.herokuapp.com/<font color="green"><b>?q=</b></font>foo123<b><font color="orange">&username=</font></b>Django<font color="blue"><b>&sl=</b></font>fast
</pre>
Available parameters:
-  `q` - Discord Webhook URL
-  `username` - Discord UI Username
- `sl` - Warhammer Success Level calculation method. Available values:
  - `4e` for default Warhammer 4e Success Level
  - `fast` for Warhammer 4e Fast Success Level
  - `2e` for default Warhammer 2e Degrees of Success
  - `dh` for default Dark Heresy 2e Degrees of Success




--------------------------------------------
## 👨‍💻 Developers' Info <a id="dev-info"></a>

### Production build

1. `npm run build`.
2. `npm run start` (`serve -s build` command is required by Heroku).

### Development build

1. `npm run dev`.
