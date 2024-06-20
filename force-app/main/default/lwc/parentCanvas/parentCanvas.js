import { LightningElement,track,api} from 'lwc';
export default class ParentCanvas extends LightningElement {
   @track showAdditionalCanvas = false;
 @api recordId;
  connectedCallback() {
        console.log('recordId parent;',this.recordId);
    }
    handleAddClick() {
        this.showAdditionalCanvas = !this.showAdditionalCanvas;
    }
}