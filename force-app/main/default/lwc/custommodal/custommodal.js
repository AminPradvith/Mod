import { LightningElement, api } from 'lwc';

export default class CustomModal extends LightningElement {
    @api modalHeader;

    handleClose() {
        const closeEvent = new CustomEvent('close');
        this.dispatchEvent(closeEvent);
    }
}