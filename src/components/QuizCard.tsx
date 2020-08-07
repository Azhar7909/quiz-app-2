import React from 'react';
import '../App.css'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { questionPropsType } from '../types/QuizType';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

const QuizCard: React.FC<questionPropsType> = ({ category, question, options, callback, quiz, currentStep }) => {

    let [selectedAns, setSelectedAns] = React.useState("");

    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
    }

    const classes = useStyles();

    return (
        <div className="quizContainer">
            <Paper className="quizCard" elevation={3}>
                <div className="quizHeader" >
                    QUIZ APP
                </div>
                <div style={{display:'flex',justifyContent:'space-between',padding:'10px 25px'}}>
                    <span style={{color:'darkgreen',fontSize:'19px'}}>Question#: {currentStep+1}</span>
                    <span style={{color:'darkcyan',fontSize:'19px'}}> Total Questions: {quiz.length}</span>
                </div>
                <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">
                            <span style={{ color: 'brown', fontSize: '20px' }}>Category:</span>
                            {" "}{category}
                        </FormLabel><br />
                        <FormLabel component="legend">
                            <span style={{ color: 'blue', fontSize: '20px' }}>Question:</span>
                            {" "}{question}
                        </FormLabel>
                        <RadioGroup aria-label="quiz" name="quiz" ><br />
                            {options.map((val, ind) => (
                                <FormControlLabel key={ind}
                                    value={val} control={<Radio required />}
                                    label={val}
                                    checked={selectedAns === val}
                                    onChange={handleSelection} />
                            ))}
                        </RadioGroup>
                        <FormHelperText>Choose wisely</FormHelperText><br /><br />
                        <Button style={{ margin: '0 auto', width: '95%' }} type="submit" variant="outlined" color="primary" className={classes.button}>
                            Submit Answer
                        </Button>
                    </FormControl>
                </form>
                <div className="quizFooter" >
                </div>
            </Paper>
        </div>
    );
}
export default QuizCard;