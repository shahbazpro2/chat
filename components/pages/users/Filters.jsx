import { Accordion, AccordionDetails, AccordionSummary, Checkbox, Menu, MenuItem, Select, Slider, TextField } from '@mui/material';
import React from 'react'
import AccordionComp from '@common/AccordionComp';
const minDistance = 1000;
const Filters = ({ isDrawer }) => {
    const [value, setValue] = React.useState([2000, 3000]);


    const handleSliderChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (newValue[1] - newValue[0] < minDistance) {
            if (activeThumb === 0) {
                const clamped = Math.min(newValue[0], 100 - minDistance);
                setValue([clamped, clamped + minDistance]);
            } else {
                const clamped = Math.max(newValue[1], minDistance);
                setValue([clamped - minDistance, clamped]);
            }
        } else {
            setValue(newValue);
        }
    };

    return (
        <div className={`mt-3  ${!isDrawer && 'h-[931px] overflow-auto'}`}>
            <AccordionComp title="Dropdown 1">
                <div className="space-y-3">
                    <div>
                        <div className='mb-1'>Dropdown 1.1</div>
                        <Select size="small" fullWidth  >
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <div className='mb-1'>Money Range</div>
                        <div className='flex space-x-2 mb-3'>
                            <TextField size="small" value={value[0]} fullWidth InputProps={{
                                startAdornment: <div className='text-lg font-medium'>$</div>
                            }} />
                            <TextField size="small" value={value[1]} fullWidth InputProps={{
                                startAdornment: <div className='text-lg font-medium'>$</div>
                            }} />
                        </div>
                        <Slider
                            color="warning"
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000}
                            disableSwap
                        />
                    </div>
                    <div>
                        <div className='mb-1'>Date</div>
                        <TextField size="small" fullWidth type='date' />
                    </div>
                    <div>
                        <div className='mb-1'>Dropdown 1.3</div>
                        <Select size="small" fullWidth placeholder='ie. Option 1,2,3' >
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <div className="text-lg">Required Field</div>
                            <div>
                                <Checkbox />
                            </div>
                        </div>
                    </div>

                </div>

            </AccordionComp>
            <AccordionComp title="Dropdown 2">
                <div className="space-y-3">
                    <div>
                        <div className='mb-1'>Range</div>
                        <div className='flex space-x-2 mb-3'>
                            <TextField size="small" value={value[0]} fullWidth placeholder='Min' />
                            <TextField size="small" value={value[1]} fullWidth placeholder='Max' />
                        </div>
                        <Slider
                            color="warning"
                            value={value}
                            onChange={handleSliderChange}
                            valueLabelDisplay="auto"
                            min={0}
                            max={5000}
                            disableSwap
                        />
                    </div>
                    <div>
                        <div className='mb-1 text-lg'>Checkbox 2.1</div>
                        <ul className='text-gray-600'>
                            <li className='flex justify-between items-center'>
                                <div >Option 1</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 2</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 3</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div>Option 4</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className='mb-1 text-lg'>Checkbox 2.2</div>
                        <ul className='text-gray-600'>
                            <li className='flex justify-between items-center'>
                                <div >Option 1</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 2</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className='mb-1 text-lg'>Checkbox 2.2</div>
                        <ul className='text-gray-600'>
                            <li className='flex justify-between items-center'>
                                <div >Option 1</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </AccordionComp>
            <AccordionComp title="Dropdown 3">
                <div className="space-y-3">
                    <div>
                        <div className='mb-1'>Dropdown</div>
                        <Select size="small" fullWidth placeholder='ie. Option 1,2,3' >
                            <MenuItem value="option1">Option 1</MenuItem>
                            <MenuItem value="option2">Option 2</MenuItem>
                            <MenuItem value="option3">Option 3</MenuItem>
                        </Select>
                    </div>
                    <div>
                        <div className='mb-1 '>Checkbox 3.1</div>
                        <ul className='text-gray-600'>
                            <li className='flex justify-between items-center'>
                                <div >Option 1</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 2</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 3</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                            <li className='flex justify-between items-center'>
                                <div >Option 4</div>
                                <div>
                                    <Checkbox />
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </AccordionComp>
        </div >
    )
}

export default Filters