import React, { Component } from 'react'
import Board from './board'
import BoardForm from './boardForm'
import axios from 'axios';
import SockJS from 'sockjs-client'
import Stomp from '@stomp/stompjs'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {fetchBoards,addBoard,deleteBoard,addLocation,deleteLocation} from '../../actions/boardAction'
const url = 'http://localhost:8080'
class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        }

    }

    
    componentDidMount() {

        if(!this.props.loggedIn)
        {    
        this.props.fetchBoards("Martin");
        let socket = null;
        let stompClient = null;
        
        socket = new SockJS(`${url}/weather`);
        stompClient = Stomp.over(socket);
        stompClient.reconnect_delay = 5000;
        stompClient.connect({}, () => {
          stompClient.subscribe('/topic/Mariano/boards', this.newDataHandler);
    
        })
    }
      }
      newDataHandler = (frame) => {
        const newLocation = JSON.parse(frame.body);
        let newBoards = [...this.state.boards];
        newBoards.some(board => {
          const index = board.locations.findIndex(location => location.id === newLocation.id)
          if (index !== -1) {
            board.locations[index] = newLocation;
            return true;
          }return false;
        })
    
    
    
        this.setState({ boards: newBoards });
    
      }
    
      handleBoardDelete = (boardId) => {
          console.log("Delete "+boardId);
        this.props.deleteBoard(boardId,"Martin");

      }
     
      handleLocationDelete = (boardId,locationId) => {
        this.props.deleteLocation(locationId,boardId,"Martin");
        /*console.log("Delete Location " + boardId+" "+locationId);
        axios.delete(`${url}/boards/Mariano/${boardId}/locations/${locationId}`).then(response => {
        let newBoards=[...this.state.boards];
        const newBoard=newBoards.find(board=>board.id===boardId);
        newBoard.locations=newBoard.locations.filter(location=>location.id!==locationId);
        this.setState({ boards: newBoards });
      })*/
      }
      handleBoardAdd = (field) => {
        console.log("add Board " + field.value);
        this.props.addBoard(field.value,"Martin");

      }
      handleLocationAdd = (boardId,city) => {
        this.props.addLocation(city,boardId,"Martin");
      }
    

    render() {
        //const { boards } = this.state
        const { boards } = this.props
        /*if (!this.props.loggedIn) {
            console.log("redirecting");
            return(
            <Redirect to={{ pathname: '/user/login' }} />
            )
          }*/
        return (
            <div>
                <BoardForm handleBoardAdd={this.handleBoardAdd} />
                {boards.map(board => <Board board={board} key={board.id} handleBoardDelete={this.handleBoardDelete} handleLocationDelete={this.handleLocationDelete} handleLocationAdd={this.handleLocationAdd} />)}
            </div>
        )
    }
}
const mapStateToProps = state =>({
    userData: state.user.userData,
    loggedIn: state.user.loggedIn,
    boards: state.board.boards
})
const mapDispatchToProps = dispatch => bindActionCreators({
    fetchBoards,
    addBoard,
    deleteBoard,
    addLocation,
    deleteLocation
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Boards)