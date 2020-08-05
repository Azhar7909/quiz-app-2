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

const QuizCard: React.FC<questionPropsType> = ({ category, question, options, callback }) => {
    // console.log("question",question);
    // console.log("options",options);
    // console.log("callback",callback);
    // console.log("category",category);


    let [selectedAns, setSelectedAns] = React.useState("");

    const handleSelection = (ev: any) => {
        setSelectedAns(ev.target.value);
    }

    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setError(false);
    };

    

    return (
        <div className="quizContainer">
            <Paper className="quizCard" elevation={3}>
                <div className="quizHeader" >
                    QUIZ APP
                </div>
                <form onSubmit={(e: React.FormEvent<EventTarget>) => callback(e, selectedAns)}>
                    <FormControl component="fieldset" error={error} className={classes.formControl}>
                        <FormLabel component="legend">
                            <span style={{ color: 'brown', fontSize: '20px' }}>Category:</span>
                            {" "}{category}
                        </FormLabel><br />
                        <FormLabel component="legend">
                            <span style={{ color: 'blue', fontSize: '20px' }}>Question:</span>
                            {" "}{question}
                        </FormLabel>
                        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                            {options.map((val, ind) => (
                                <FormControlLabel key={ind}
                                    value={val} control={<Radio />}
                                    label={val}
                                    checked={selectedAns === val}
                                    onChange={handleSelection} />
                            ))}
                        </RadioGroup>
                        <FormHelperText>{helperText}</FormHelperText>
                        <Button style={{ margin: '0 auto' }} type="submit" variant="outlined" color="primary" className={classes.button}>
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