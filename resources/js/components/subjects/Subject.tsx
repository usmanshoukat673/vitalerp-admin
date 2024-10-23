import React, { useEffect, useRef, useState } from 'react';
import TextColumn from './TextColumn.tsx';
import { Container } from "@column-resizer/react";
import AddColumn from './AddColumn.tsx';
import IDColumn from './IDColumn.tsx';
import LongTextColumn from './LongTextColumn.tsx';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { setAllProjectSubjects } from '../../actions';
import axiosInstance from '../../api/api.jsx';

const Subject = ({subject}) => {

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const [rows, setRows] = useState([]);
    
    const containerStyle = {
        height: "60vh",
        fontSize: "16px",
        whiteSpace: "nowrap"
    };

    const barStyle = {
        background: "#ccc",
        cursor: "col-resize"
    };

    const columnResizerRef = useRef(null);

    const MIN_SIZE = 150;

    const beforeApplyResizer = (resizer) => {
    if (resizer.getSectionSize(0) < MIN_SIZE / 2) {
        resizer.resizeSection(0, { toSize: 0 });
    } else if (resizer.getSectionSize(0) < MIN_SIZE) {
        resizer.resizeSection(0, { toSize: MIN_SIZE });
    }
    }

    const { subjects } = useSelector(state => ({
        subjects: state.projects.subjects
    }));

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/api/user/subjects/get/${subject.id}`)
            .then(e => {
                setRows(e.data.rows);

                let the_subjects = JSON.parse(JSON.stringify(subjects));
                let index = _.findIndex(the_subjects, (sub) => {
                    return sub.id === subject.id;
                });
                the_subjects[index].columns = e.data.columns;

                dispatch(setAllProjectSubjects(the_subjects));
                setLoading(false);
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return 'Loading...';

    const handleAddRow = () => {
        
        axiosInstance.post(`/api/user/subjects/add-row`,{
            subject_id: subject.id
        })
            .then(e => {
               setRows([
                ...rows,
                e.data.row
               ]);

               let the_subjects = JSON.parse(JSON.stringify(subjects));
               let index = _.findIndex(the_subjects, (sub) => {
                   return sub.id === subject.id;
               });
               the_subjects[index].columns = e.data.columns;
               dispatch(setAllProjectSubjects(the_subjects));
            })
            .catch(err => {
                if (err.response.status === 422) {
                    setErrors(errors.concat(err.response.data.errors));
                }
            }).finally(() => {
                 
            });
    }

    const onBarClick = () => {
        const container = columnResizerRef.current;
    
        if (container) {
          const resizer = container.getResizer();
    
          if (resizer.getSectionSize(0) === 0) {
            resizer.resizeSection(0, { toSize: MIN_SIZE });
          }
    
          container.applyResizer(resizer);
        }
    };

    return (
        <Container 
            style={containerStyle} 
            className='__subjects'
            ref={columnResizerRef}
            beforeApplyResizer={beforeApplyResizer}
            >
            <IDColumn title="ID" 
                barClick={onBarClick} 
                subject={subject} 
                barStyle={barStyle} 
                barSize={3} 
                rows={rows} 
                add_row={handleAddRow} 
            />
            {
                _.map(subject.columns, column => {
                    if(column.component == 'TextColumn'){
                        return(<TextColumn subject={subject} barSize={3} barClick={onBarClick} barStyle={barStyle} column={column} key={column.id} />)
                    }
                    else if(column.component == 'LongTextColumn'){
                        return(<LongTextColumn subject={subject} barSize={3} barClick={onBarClick} barStyle={barStyle} title={column.name} column={column} key={column.id} />)
                    }
                })
            }
            <AddColumn barSize={3} barClick={onBarClick} barStyle={barStyle} subject={subject} title="Add Column" />
        </Container>
    );
}

export default Subject;