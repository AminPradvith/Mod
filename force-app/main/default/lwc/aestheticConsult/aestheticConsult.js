import { LightningElement, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/getObjectPicklistValue.getPicklistValues';

export default class DynamicallyAddRow extends LightningElement {
    defaultRowCount = 5;
    @track filterList = [];
    keyIndex = 0;
    @track AestheticconsultMembership = [];
    @track Aestheticconsulttreatments = [];
    @track Aestheticconsultarea = [];
    @track Aestheticconsultproducts = [];
    @track picklistValuesMap = [];
    @track value;
     @track allValues = [];
     @track showMore = false;

    @wire(getPicklistValues)
    wiredPicklistValues({ error, data }) {
        if (data) {
            var conts = data;
            console.log('Data   ',JSON.stringify(data));
            for (var key in conts) {
                //console.log('Keyy   ', key, ' value ', conts[key]);
                if (key === 'Aesthetic_consult_Membership__c') {
                  
                    var memberships = conts[key];
                    for (var i = 0; i < memberships.length; i++) {
                        this.AestheticconsultMembership = [...this.AestheticconsultMembership, { value: memberships[i], label: memberships[i] }];
                       
                    }

                }
                if (key === 'Aesthetic_consult_Treatments__c') {
                    var treatments = conts[key];
                    for (var i = 0; i < treatments.length; i++) {
                       this.Aestheticconsulttreatments = [...this.Aestheticconsulttreatments, { value: treatments[i], label: treatments[i] }];
                    }
                }
                if (key === 'Aesthetic_consult_Area__c') {
                    var area = conts[key];
                    for (var i = 0; i < area.length; i++) {
                        this.Aestheticconsultarea = [...this.Aestheticconsultarea, { value: area[i], label: area[i] }];
                    }
                }
                if (key === 'Aesthetic_consult_Products__c') {
                    var products = conts[key];
                    for (var i = 0; i < products.length; i++) {
                        this.Aestheticconsultproducts = [...this.Aestheticconsultproducts, { value: products[i], label: products[i] }];
                    }
                }


            }
            
            //console.log('filterList ->  ', JSON.stringify(this.filterList));

        } else if (error) {
            // Handle error
            console.error('Error retrieving picklist values:', error);
        }
    }



    connectedCallback() {
        // Add default rows
        for (let i = 0; i < this.defaultRowCount; i++) {
            this.handleAddRow();
        }
    }

    handleAddRow() {
        let objRow = {
            id: ++this.keyIndex
        };

        this.filterList = [...this.filterList, Object.assign({}, objRow)];
        //console.log('this.filterList   ---  ',this.filterList);
    }

    handleRemoveRow(event) {
        const indexToRemove = parseInt(event.currentTarget.dataset.index);
        this.filterList = this.filterList.filter((row) => row.id !== indexToRemove);
    }

    handleRemove(event){
        const valueRemoved = event.target.name;
        this.allValues.splice(this.allValues.indexOf(valueRemoved), 1);
    }

    MembershiphandleChange(event) {
        if(!this.allValues.includes(event.target.value)){
            //this.allValues.push(event.target.value);
            console.log(' this.allValues  ', this.allValues);

            if(this.allValues.length > 2 )
            {
                this.showMore = true;
            }
            if(this.allValues.length < 2)
            {
                this.showMore = false;
            }

        }
        const { index } = event.currentTarget.dataset;
        const field = event.target.name;
        const value = event.target.value;
        console.log('field  ', field);
        console.log('value  ', value);
        console.log('index  ', index);
        this.allValues.push(event.target.value);
        this.filterList[index] = { ...this.filterList[index], [field]: value };

       
    }

    handleChange(event) {
         /*if(!this.allValues.includes(event.target.value)){
            //this.allValues.push(event.target.value);
            console.log(' this.allValues  ', this.allValues);

            if(this.allValues.length > 2 )
            {
                this.showMore = true;
            }
            if(this.allValues.length < 2)
            {
                this.showMore = false;
            }

        }
        const { index } = event.currentTarget.dataset;
        const field = event.target.name;
        const value = event.target.value;
        console.log('field  ', field);
        console.log('value  ', value);
        console.log('index  ', index);
        console.log('this value ',this.value);
        this.allValues.push(event.target.value);
        this.filterList[index] = { ...this.filterList[index], [field]: value };*/
    }
   

    saveRows() {
        // Call an Apex method or perform any other logic to save the rows
        // Here, we're just logging the rows to the console for demonstration
        console.log('Rows to be saved:', this.filterList);

        // You can display a toast message after saving the data
        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Rows saved successfully!',
            variant: 'success'
        });
        this.dispatchEvent(toastEvent);
    }
}