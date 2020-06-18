# blackjack (21)
BlackJack built with Vue and Vuex
Animations are performed via Vue transitions and CSS3

- This project is created with `Vue CLI 3` ( [link](https://cli.vuejs.org/) )
- It uses vuex state management system

![alt text](https://github.com/Nirav1210/blackjack/blob/master/public/Screen_Shot-blackjack.png "screenshot of blackjack")

## Rules
- Initial bet is always one chip
- 6 Decks, shuffled after 50% have been played
- BlackJack: player wins the bet (3-to-1)
- Win: player wins the bet (2-to-1)
- Bust, Lose: player loses the bet (0-to-1)
- Stand-off(tie): nobody wins/loses (1-to-1)
- Dealer stands on any 17

## Project setup

### Clone the repo and go into the directory
```
git clone https://github.com/Nirav1210/blackjack.git
cd blackjack
```

### Install all the depedencies
```
npm install
```

### Compiles for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test
```

### References
* CSS animated background: https://codepen.io/mohaiman/pen/MQqMyo


## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-Present, Nirav Bhut

