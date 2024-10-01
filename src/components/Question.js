// src/components/Question.js
import React from 'react';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, TextField, Checkbox } from '@mui/material';

export const MultipleChoiceQuestion = ({ question, options, onChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{question}</FormLabel>
    <RadioGroup onChange={onChange}>
      {options.map((option) => (
        <FormControlLabel value={option} control={<Radio />} label={option} key={option} />
      ))}
    </RadioGroup>
  </FormControl>
);

export const TrueFalseQuestion = ({ question, onChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{question}</FormLabel>
    <RadioGroup onChange={onChange}>
      <FormControlLabel value="True" control={<Radio />} label="True" />
      <FormControlLabel value="False" control={<Radio />} label="False" />
    </RadioGroup>
  </FormControl>
);

export const ShortAnswerQuestion = ({ question, onChange }) => (
  <FormControl component="fieldset">
    <FormLabel component="legend">{question}</FormLabel>
    <TextField fullWidth variant="outlined" onChange={onChange} />
  </FormControl>
);
