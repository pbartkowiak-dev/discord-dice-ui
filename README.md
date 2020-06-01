<a href="http://fvcproductions.com"><img src="./public/logo192.png" title="Discord Dice Ui" alt="Discord Dice Ui"></a>

<!-- [![Discord Dice Ui](./public/logo192)](http://fvcproductions.com) -->

# Discord Dice UI

> They are plenty of Discord bots that allow you to roll dice in the chat. They may by great, but I never felt like typing while playing an RPG game. So I created this connector in which you can just select and click a die you want to roll on Discord's chat.

The app is intended to use as a graphical interface dice roller for Discord. You can connect it with your Discord chat and use to roll some dice! 🎲🎲
>
 You can modify how the result is displayed by selecting different _Roll Options_:
- Keep highest
- Keep lowest
- Sum results
- Add modifier
- Call of Cthulhu 7e Mode (read below)
- Warhammer Mode (read below)

#### App Interface
[![App overview](./public/app.png)]()

#### Sample results inside Discord's Chat
[![Sample Chat Results](./public/chat-sample-results.png)]()

#### Sample results inside the App
[![Sample App Results](./public/app-sample-results-1.png)]()
[![Sample App Results](./public/app-sample-results-2.png)]()


### Call of Cthulhu 7e Mode

The app offers special support for Call of Cthulhu 7e RPG game. After selecting the mode in the _Roll Options_ a dedicated modal will be shown for rolling d100.

[![Call of Cthulhu 7e Mode 1](./public/coc-mode-1.png)]()

[![Call of Cthulhu 7e Mode 2](./public/coc-mode-2.png)]()

### Warhammer Mode

The app offers special support for rolling Success Levels in Warhammer 2e, Warhammer 4e and Dark Heresy II.

[![WFRP Mode - modalp](./public/wfrp-modal.png)]()

[![WFRP Mode - app](./public/wfrp-result-app.png)]()

[![WFRP Mode - discord](./public/wfrp-result-discord.png)]()


## Setup

In order to get started, **Discord's server admin has to create a Webhook** and share a special link with other users. Read below how to do it.

1. As a server's admin open your chat's context menu.
![how-to-1](./public/how-to-0.png)

2. Select _Server Settings_ from the context menu.
![how-to-2](./public/how-to-1.png)

3. Select _Webhooks_ in the left side menu and then press the button _Create Webhook_.
![how-to-3](./public/how-to-2.png)

4. Name your Webhook and provide an icon (optionally). **Copy a link** to obtain your unique Webhook url and press **Save** button to close the modal.
![how-to-4](./public/how-to-3.png)
🛑🚧🚧🚧🛑  
**Never share your Webhook link publicly and keep it a secret. You don't want to allow strangers to publish messages in your chat.**  
🛑🚧🚧🚧🛑  

5. Now you can share the Webhook url with other players in two ways:
    1. **Via link param**.  
    Provide your players a link to an app which looks like this:
    ```
    https://discord-dice-ui.herokuapp.com/?q=UNIQUE_CODE_FROM_YOUR_DICORD_WEBHOOK
    ```

    2. **Manually**.  
    Alternatively, every user has to enter the provided Webhook link url in the Settings modal inside the app. Entering the username is required as well.
    ![how-to-5](./public/how-to-4.png)

6. Saving the Webhook in the app will connect the app with the Discord server.

## Demo preview:

![Demo](./public/app-demo.gif)