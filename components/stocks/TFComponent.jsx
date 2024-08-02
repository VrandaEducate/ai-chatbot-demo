import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const TFComponent = ({ MID, question, options, submitMessage, setMessages, handleInputChange, messages, setInput, input, setEdit, setMID, threadId, setThreadId }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [isFirstSubmit, setIsFirstSubmit] = useState(true);

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(selectedOption);
        // setThreadId(localStorage.getItem('threadId'));
        if (isFirstSubmit) {
            console.log('First submit action');
            await submitMessage(e, { data: { edit: "false" } });
            setIsFirstSubmit(false);
        } else {
            console.log('Subsequent submit action');
            localStorage.setItem('isEdit', "true");
            await submitMessage(e, { data: { edit: "true", messageId: MID } });
        }
    };

    return (
        <Box >
            <Card sx={{ maxWidth: 250 }}>
                <CardContent>
                    <Typography variant="h7" component="div" gutterBottom>
                        {question}
                    </Typography>
                    <form onSubmit={(e) => {
                        console.log("submit");
                        handleSubmit(e);
                    }}>
                        <FormControl component="fieldset">
                            <RadioGroup
                                name="options"
                                value={selectedOption}
                                onChange={(e) => {
                                    handleInputChange(e);
                                    handleOptionChange(e);
                                }}
                            >
                                {options.map((option, index) => (
                                    <FormControlLabel
                                        key={index}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                        {options && (
                            <CardActions>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        )}
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default TFComponent;
