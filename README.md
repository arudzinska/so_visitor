## so_visitor

**NOTE from @arudzinska**: This bot did not work well for me as of autumn'18 (headless mode bugs with Xvfb), therefore I created my own in Python: https://github.com/arudzinska/stackoverflow_golden_bot

Node.js bot, that allows you to get "Fanatic" badge in StackOverflow. 

Edit by @arudzinska: changed mailgun to nodemail, so that you don't need a mailgun account.

### Requires
1. Nightmare.js
2. Gmail account (or other mail)
3. Xvfb (for headless mode)

### Setup
1. Edit `conf.example.json` and save as `conf.json`;
2. Put this line in your Crontab: `30 9 * * * xvfb-run node /home/user1/so_visitor/index.js`
3. Wait 100 days;
4. Congrats, now you have the Fanatic badge. 
