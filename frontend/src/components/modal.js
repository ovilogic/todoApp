import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label
} from 'reactstrap';

const CustomModal = (props) => {
    const [ activeItem, setActive] = useState(props.activeItem)

    let handleChange = (event) => {
        console.log(event)
        let { name, value } = event.target;
        if (event.target.type === 'checkbox') {
            value = event.target.checked;
        }
        let newActive = { ...activeItem, [name]: value };
        return newActive;
        
    }
 
    console.log(activeItem, 'is activeItem')

    
    return ( 
        
        <Modal isOpen={true} toggle={props.toggle}>
            <ModalHeader toggle={props.toggle}>To Do Item</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for='title'>Title</Label>
                        <Input
                            type='text'
                            name='title'
                            value={activeItem.title}
                            onChange={handleChange()}
                           
                            placeholder='enter a to do title'
                            />
                    </FormGroup>
                    <FormGroup check>
                        <Label for='completed'>
                            <Input
                                type='checkbox'
                                name='completed'
                                checked={activeItem.completed}
                                onChange={handleChange()}
                                
                                />
                                Completed
                        </Label>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color='success' onClick={() => props.onSave({activeItem})}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
     );
}
 
export default CustomModal;