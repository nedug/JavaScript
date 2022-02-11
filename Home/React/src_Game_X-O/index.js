import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component {

    render() {
        return (
            <button className={'square'}
                    // onClick={() => console.log('клик Х')}>
                    // onClick={this.handleClick}>
                    onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        )
    }
}


class Board extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {value: [].fill(null, 0, 8)};
        // this.handleClick = this.handleClick.bind(this);
        const arrState = new Array(9).fill(null);
        this.state = {value: arrState,
                      playerX: true};
    }

    handleClick(i) {
        // this.state.value[i] = 'x';
        // console.log(this.state.value[i]);
        // const tt = this.state.value[i] = 'x';
        // this.setState({value: this.state.value[i] = 'X'});

        const arrState = [...this.state.value];

        if (calculateWinner(arrState) || arrState[i]) {
            return;
        }

        arrState[i] = this.state.playerX ? 'X' : 'O';

        this.setState({value: arrState,
                             playerX: !this.state.playerX});
    }

    renderSquare(i) {
        return (
            <Square value={this.state.value[i]}
                    onClick={() => this.handleClick(i)} />
            )
    }

    render() {

        const winner = calculateWinner(this.state.value);
        console.log(winner);

        const status = winner ? `Won player: ${winner}` : `Next player: ${this.state.playerX ? 'X' : 'O'}`;


        // const status = `Next player: ${this.state.playerX ? 'X' : 'O'}`;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}


class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>


                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);