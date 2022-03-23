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
    Label,
    ModalFooter
} from 'reactstrap';

const CustomModal = (props) => {
    const [ activeItem, setActive] = useState(props.activeItem)

    handleChange = e => {
        let { name, value } = e.target;
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }
        const activeItem = { ...activeItem, [name]: value };
        setActive({activeItem})
    }
    return ( 
        <Modal isOpen={true} toggle={toggle}>
            <ModalHeader toggle={toggle}>To Do Item</ModalHeader>
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
                <Button color='success' onClick={() => onSave({activeItem})}>
                    Save
                </Button>
            </ModalFooter>
        </Modal>
     );
}
 
export default CustomModal;