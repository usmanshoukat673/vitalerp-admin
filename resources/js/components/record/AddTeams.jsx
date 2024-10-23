import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { saveRecordDetails, setCompanyTeams, setRelatedRecord } from "../../actions";
import axiosInstance from "../../api/api";
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';

function idExists(array, targetProperty, targetId, question_id) {
    // Use Array.some() method to check if any object in the array has the targetId
    let target = array.find(item => {
        return item[targetProperty] === targetId ? item : undefined;
    });
    return target != undefined && target['question_id'] == question_id;
  }

const AddTeams = ({ question_id }) => {

    const dispatch = useDispatch();

    const [creating, setCreating] = useState(false);

    const [selected_teams, setSelectedTeams] = useState([]);
    const [add_team, setAddTeam] = useState(false);
    const [add_team_name, setAddTeamName] = useState('');


    const { record_details, record, teams } = useSelector((state) => ({
        record_details: state.lanscape.record_details,
        record: state.lanscape.record,
        teams: state.orgs.teams,
    }));

    const handleSubmit = () => {
        setCreating(true);
        axiosInstance.post(`/api/user/records/teams/add`, {
            selected_teams,
            add_team,
            add_team_name,
            module_id: record.module_id,
            parent: record.id,
            question_id
        })
            .then(e => {
                dispatch(saveRecordDetails({
                    ...record_details,
                    teams: e.data.record_teams,
                }));
                dispatch(setCompanyTeams(e.data.teams));
                setSelectedTeams([]);
                handleClose();
            })
            .catch(err => {
            }).finally(() => setCreating(false));
    }

    const handleClose = () => {
        // The reason adding timeout here is because we want to wait if document is still saving the chagnes 
        // if the document waiting to save changes then it will take some time to update redux back again. 
        setTimeout(() => {
            dispatch(setRelatedRecord({
                open: false,
            }));
        }, 50);
    }

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <div className="create_record_input_group">
                {
                    !add_team && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_team_name">Select Team:</label>
                        <Select
                            id={`team`}
                            size="small"
                            multiple
                            value={selected_teams}
                            onChange={(e) => setSelectedTeams(e.target.value)}
                            input={<OutlinedInput label="Team" />}
                            renderValue={(selected) => selected.map(id => {
                                let teamFound = teams.find(te => te.id === id);
                                return `${teamFound.name}`;
                            }).join(', ')}
                        >
                            {
                                _.map(teams, te => {
                                    return (!idExists(record_details.teams, 'team_id', te.id, question_id)) && (
                                        <MenuItem key={`team_${te.id}`} value={te.id}>
                                            <Checkbox checked={selected_teams.indexOf(te.id) > -1} />
                                            <ListItemText primary={`${te.name}`} />
                                        </MenuItem>
                                    )
                                })
                            }
                        </Select>

                        {
                            _.size(selected_teams) > 0 ? <p style={{ color: '#ccc' }}>
                                Click here to add new Team
                            </p> : <Link className="chand" underline="none" onClick={() => setAddTeam(true)}>
                                Click here to add new Team
                            </Link>
                        }
                    </FormControl>
                }
                {
                    add_team && <FormControl fullWidth sx={{ m: 1 }}>
                        <label htmlFor="add_team_name">Team Name:</label>
                        <TextField
                            id=""
                            size="small"
                            label="Add New Team"
                            name="add_team_name"
                            value={add_team_name}
                            onChange={(e) => setAddTeamName(e.target.value)}
                        />
                        <Link className="chand" underline="none" onClick={() => setAddTeam(false)}>
                            Click here to select existing team
                        </Link>
                    </FormControl>
                }
            </div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', m: 1 }}>
                <Button disabled={creating} onClick={handleSubmit} variant="contained">Submit</Button>
                <Button sx={{ marginLeft: '10px' }} variant="outlined" onClick={handleClose}>Cancel</Button>
            </Box>
        </Box>
    )
}

export default AddTeams;