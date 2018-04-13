import React, { Component } from 'react';
import './bootstrap.min.css';
import axios from 'axios';
import Board from './components/board'
import BoardForm from './components/boardForm'
import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'
import Nav from './components/Nav'
const url = 'http://localhost:8080'
class App extends Component {
  constructor() {
    super();
    this.state = {
      boards: []
    }

  }


  componentDidMount() {


    axios.get(`${url}/boards/Mariano`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }).then(response => {
      //console.log("Response "+response.data);
      this.setState({ boards: response.data });
    })
    let socket = null;
    let stompClient = null;
    let subscription = null;

    socket = new SockJS(`${url}/weather`);
    stompClient = Stomp.over(socket);
    stompClient.reconnect_delay = 5000;
    stompClient.connect({}, () => {
      subscription = stompClient.subscribe('/topic/Mariano/boards', this.newDataHandler);

    })

  }
  newDataHandler = (frame) => {
    const newLocation = JSON.parse(frame.body);
    let newBoards = [...this.state.boards];
    newBoards.some(board => {
      const index = board.locations.findIndex(location => location.id === newLocation.id)
      if (index !== -1) {
        board.locations[index] = newLocation;
        return true;;
      }
    })



    this.setState({ boards: newBoards });

  }

  handleBoardDelete = (boardId) => {
    console.log("DeleteBoard " + boardId);
    axios.delete(`${url}/boards/Mariano/${boardId}`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then(response => {
      console.log("Response " + response.data);
      let newBoards = [...this.state.boards];
      newBoards = newBoards.filter(board => board.id !== boardId);
      this.setState({ boards: newBoards });
    }).catch(error =>{console.log(error)});
  }
  handleLocationDelete = (boardId,locationId) => {

    console.log("Delete Location " + boardId+" "+locationId);
    axios.delete(`${url}/boards/Mariano/${boardId}/locations/${locationId}`).then(response => {
    let newBoards=[...this.state.boards];
    const newBoard=newBoards.find(board=>board.id===boardId);
    newBoard.locations=newBoard.locations.filter(location=>location.id!==locationId);
    this.setState({ boards: newBoards });
  })
  }
  handleBoardAdd = (field) => {
    console.log("add Board " + field.value);
    axios.post(`${url}/boards/Mariano`, {
      name: field.value
    }).then(response => {
      console.log("Response " + JSON.stringify(response.data));
      let newBoards = [...this.state.boards];
      newBoards.push(response.data);
      this.setState({ boards: newBoards });
    })
  }
  handleLocationAdd = (boardId,city) => {
    console.log("Add location " + city+ " "+boardId);
    axios.post(`${url}/boards/Mariano/${boardId}/locations`,{city:city}).then(response =>{
      let newBoards = [...this.state.boards];
      const newBoard=newBoards.find(board=>board.id===boardId)
      if(newBoard.locations===null)
        newBoard.locations=[];
      newBoard.locations.push(response.data);
      this.setState({boards:newBoards});
    })
  }


  render() {
    const { boards } = this.state
    return (
      <div className="App">
        <Nav />
        <BoardForm handleBoardAdd={this.handleBoardAdd} />
        {boards.map(board => <Board board={board} key={board.id} handleBoardDelete={this.handleBoardDelete} handleLocationDelete={this.handleLocationDelete} handleLocationAdd={this.handleLocationAdd} />)}
      </div>
    );
  }
}

export default App;
