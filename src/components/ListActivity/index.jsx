import React from 'react';
import { withFirebase } from  '../../services';
import loader from './loader.gif';

import { IconButton } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { colors } from '@material-ui/core';

function ActivityList(props) {
    const {loading, activities, editActivity,setOpenSnackbar, setSnackbarMsg, setEditing, canEdit} = props;

    const deleteActivity = (i) => {
        // Get key of activity in firebase
       const activityKey = Object.keys(activities)[i];
       // Connect to our firebase API
       const emptyActivity = {
        muscleGroup: null,
        name: null,
        sets: null,
        repetitions: null,
        duration: null,
        resistance: null,
        date: null
       };

       props.firebase.updateActivity(props.authUser.uid, emptyActivity, activityKey);

       // Show notification
       setOpenSnackbar(true);
       setSnackbarMsg('Deleted activity');
       setTimeout(() => {
        setOpenSnackbar(false)
       }, 3000)

       // stop editing
       setEditing(false);
    }

    return (
        <>
            { 
                loading === true 
                    ? <img src={loader} alt={loader}></img> 
                    : ''
            }
            
            {
                activities === 'not set' || activities === null || activities === undefined || activities.length <= 0
                    ? <p>No Exercises Added.</p>
                    :
                    <TableContainer component={Paper} >
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Muscle Group</TableCell>
                                    <TableCell>Sets</TableCell>
                                    <TableCell>Repetitions</TableCell>
                                    <TableCell>Duration (Min)</TableCell>
                                    <TableCell>Resistance</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {
                                Object.values(activities).map((activity, i) => {
                                    let {Name, MuscleGroup, Sets, Repetitions, Duration, Resistance} = activity;
                                    return (
                                        <TableRow key={i}>
                                            <TableCell>{Name ?? "New Exercise"}</TableCell>
                                            <TableCell>{MuscleGroup ?? "Default"}</TableCell>
                                            <TableCell>{Sets ?? 0}</TableCell>
                                            <TableCell>{Repetitions ?? 0}</TableCell>
                                            <TableCell>{Duration ?? 0}</TableCell>
                                            <TableCell>{Resistance ?? 0} </TableCell>
                                            <TableCell>
                                                <IconButton onClick={canEdit ? e => deleteActivity(i) : null} disabled={!canEdit}>
                                                    <DeleteIcon htmlColor={colors.black}/>
                                                </IconButton>
                                                <IconButton onClick={canEdit ? e => editActivity(i) : null} disabled={!canEdit}>
                                                    <EditIcon htmlColor={colors.black}/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                            </TableBody>
                        </Table>
                    </TableContainer>
            }
        </>
    )
};

export default withFirebase(ActivityList);