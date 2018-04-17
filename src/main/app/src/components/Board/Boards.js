import React, { Component } from 'react'
import Board from './board'
import BoardForm from './boardForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBoards, addBoard, deleteBoard, addLocation, deleteLocation } from '../../actions/boardAction'
class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [],
        }

    }

    componentDidMount() {

        if (this.props.loggedIn)
            this.props.fetchBoards(this.props.userData.username);

    }

    handleBoardDelete = (boardId) => {
        console.log("Delete " + boardId);
        this.props.deleteBoard(boardId, this.props.userData.username);

    }

    handleLocationDelete = (boardId, locationId) => {
        this.props.deleteLocation(locationId, boardId, this.props.userData.username);

    }
    handleBoardAdd = (field) => {
        console.log("add Board " + field.value);
        this.props.addBoard(field.value, this.props.userData.username);

    }
    handleLocationAdd = (boardId, city) => {
        this.props.addLocation(city, boardId, this.props.userData.username);
    }


    render() {
        const { boards } = this.props
        if (!this.props.loggedIn) {
            console.log("redirecting");
            return (
                <Redirect to={{ pathname: '/user/login' }} />
            )
        }
        return (
            <div>
                <BoardForm handleBoardAdd={this.handleBoardAdd} />
                {boards.map(board => <Board board={board} key={board.id} handleBoardDelete={this.handleBoardDelete} handleLocationDelete={this.handleLocationDelete} handleLocationAdd={this.handleLocationAdd} />)}
            </div>
        )
    }
}
const mapStateToProps = state => ({
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