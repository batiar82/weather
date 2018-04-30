import React, { Component } from 'react'
import Board from './board'
import BoardForm from './boardForm'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchBoards, addBoard, deleteBoard, addLocation, deleteLocation,resetedFormHandler } from '../../actions/boardAction'
class Boards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            boardSubmitEnabled: false,
        }

    }

    componentDidMount() {
        console.log("Logged in en boards: " + this.props.loggedIn)
        if (this.props.loggedIn)

            this.props.fetchBoards();

    }

    handleBoardDelete = (boardId) => {
        console.log("Delete " + boardId);
        this.props.deleteBoard(boardId);

    }

    handleLocationDelete = (boardId, locationId) => {
        this.props.deleteLocation(locationId, boardId);

    }
    handleBoardAdd = (evt) => {
        evt.preventDefault();
        this.props.addBoard(this.state.name);
        this.setState({ name: '', boardSubmitEnabled: false })
    }
    handleNameChange = (name) => {
        if (name.trim() !== '')
            this.setState({ boardSubmitEnabled: true })
        else
            this.setState({ boardSubmitEnabled: false })
        this.setState({ name: name });
    }
    handleLocationAdd = (evt,boardId, city) => {
        if(evt!==null)
            evt.preventDefault();
        console.log("Board city "+boardId+city)
        this.props.addLocation(city, boardId);
    }
    resetedFormHandler = (boardId)=>{
        this.props.resetedFormHandler(boardId);
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
                <BoardForm
                    enabled={this.state.boardSubmitEnabled}
                    handleBoardAdd={this.handleBoardAdd}
                    name={this.state.name}
                    handleNameChange={this.handleNameChange} />

                {boards.map(board => <Board board={board}
                    key={board.id}
                    handleBoardDelete={this.handleBoardDelete}
                    handleLocationDelete={this.handleLocationDelete}
                    handleLocationAdd={this.handleLocationAdd}
                    resetedFormHandler={this.resetedFormHandler}/>)}
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
    deleteLocation,
    resetedFormHandler,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Boards)