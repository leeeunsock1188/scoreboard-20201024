import React from "react";
import './App.css'

const players = [
  {name: 'LDK', score: 30, id: 1},
  {name: 'HONG', score: 40, id: 2},
  {name: 'KIM', score: 50, id: 3},
  {name: 'PARK', score: 60, id: 4},
];

const Header = (props) => {
  console.log(props);
  // destruct assignment
  const {title, totalPlayers} = props;
  return (
    <header className="header">
      <h1 className="h1">{title}</h1>
      <span className='stats'>Players: {totalPlayers}</span>
    </header>
  );
}

const Player = (props) => (
  <div className='player'>
    <span className='player-name'>
      <button className='remove-player'
              onClick= {() => props.removePlayer(props.id)}>x</button>
      {/*<button className="remove-player'
              onclick={ props.removePlayer(props.id)} <<여기서 ()=> 써줘야 함수라는것을 인식한다. */}
    </span>
    <span className='player-name'>{props.name}</span>
    <Counter/>
  </div>
);

class Counter extends React.Component {
  state = {
    score: 0,
    a: 3
  }

  constructor(props) {
    super(props);
    // 1) this.incrementScore = this.incrementScore.bind(this);
  }

  changeScore = (delta) => {
    // 2) arrow 펑션안의 this는 lexical this
    console.log(this);
    // 1. state를 변경하는 방법
    // this.state.score += 1;
    // this.setState({score: this.state.score + 1});
    // 2. merge 된다. : 기존 속성으 그대로 유지
    // 3. 비동기로 처리
    this.setState(prevState => ({
      score: prevState.score + delta
    }));
  }

  render() {
    return (
      <div className='counter'>
        <button className='counter-action decrement'
                onClick={() => this.changeScore(-1)}> - </button>
        <span className='counter-score'>{this.state.score}</span>
        <button className='counter-action increment'
                onClick={() => this.changeScore(1)}> + </button>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    players: [
      {name: 'LDK', id: 1},
      {name: 'HONG', id: 2},
      {name: 'KIM', id: 3},
      {name: 'PARK', id: 4},
    ]
  }
  // 1) player 삭제 콜백 펑션 정의
  handleRemovePlayer = (id) => {
    console.log(id);

    // 비동기기때문에 state를 이용해야한다. 자기자신을 가르키는 this.setSteate(() => (콜백펑션)
    // 리액트 라이브러리는 다 만들어져있떄문에 가져다가 쓰기만 하는거다 그래서 setState는 첫번쨰는 이전 상태다 prev state는 json객체임
    // ex )state ={ Players : [ { name : 'LDK', score :30, id:1}.요고 )
    this.setState(prevState => ({
      players: prevState.players.filter(item => item.id !== id)
    }))
  }

  render() {
    return (
      <div className='scoreboard'>
        <Header title='My Scoreboard' totalPlayers={11} />

        {
          this.state.players.map(player => (
            <Player name={player.name} key={player.id} id={player.id}
                    removePlayer={this.handleRemovePlayer}/>
          ))
        }

      </div>
    );
  }
}

export default App;