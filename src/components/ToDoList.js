import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


class ToDoList extends Component {

    render() {
        return (
            <DragDropContext onDragEnd={this.props.onDragEnd}>
                <Droppable droppableId="droppable">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef}>
                            <List>
                                {this.props.data.map((item, index) => (
                                    <Draggable draggableId={item.id} key={item.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <ListItem key={item.id}>
                                                    <ListItemAvatar {...provided.dragHandleProps}>
                                                        <Avatar>
                                                            <Icon>pan_tool</Icon>
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={item.name}
                                                    />
                                                    <ListItemSecondaryAction onClick={() => { this.props.handleClick(item.id) }}>
                                                        <IconButton aria-label="Delete">
                                                            <DeleteIcon className='delete' />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        );
    }
}

export default ToDoList;