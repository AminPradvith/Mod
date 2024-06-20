import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsDynamicUiController.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsDynamicUiController.insertRecommendations';
export default class UnlimitedRowsDynamicUi3 extends LightningElement {
    @track listOfRecommendations = [];
    @api recordId = 'a1ODh000002Qf7yMAC';
    @api objectType = 'IPL__c';//Hydrafacial__c//IPL__c
    @track FractionalLaserTable = false;
    @track HydrafacialTable = false;
    @track IPLTable = false;
    @track KybellaTable = false;
    @track isSaveDisabled = true;



    @track FractionalLaserNameList = ['Fractional_Laser_area__c', 'Fractional_Laser_tip__c', 'Fractional_Laser_joules__c', 'Fractional_Laser_pulses_ms__c', 'Fractional_Laser_ice_roller_applied__c', 'Fractional_Laser_HA_serum_applied__c', 'Fractional_Laser_passes_completed__c'];
    @track Fractional_Laser_area__cValues = '';
    @track Fractional_Laser_tip__cValues = '';
    @track Fractional_Laser_joules__cValues = '';
    @track Fractional_Laser_pulses_ms__cValues = '';
    @track Fractional_Laser_ice_roller_applied__cValues = '';
    @track Fractional_Laser_HA_serum_applied__cValues = '';
    @track Fractional_Laser_passes_completed__cValues = '';


    @track HydrafacialNameList = ['Hydrafacial_Location__c'];
    @track Hydrafacial_Location__cValues = '';

    @track IPLNameList = ['IPL_Tx__c', 'Area__c', 'Handpiece__c', 'Sunscreen_applied__c'];
    @track IPL_Tx__cValues = '';
    @track Area__cValues = '';
    @track Handpiece__cValues = '';
    @track Sunscreen_applied__cValues = '';


    connectedCallback() {
        if (this.objectType == "Fractional_Laser_S__c") {
           this.FractionalLaserTable = true;
             this.HydrafacialTable = false;
            this.IPLTable = false;
             this.KybellaTable = false;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.FractionalLaserNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Fractional_Laser_area__c) {
                        console.log('runing data');
                        this.Fractional_Laser_area__cValues = data.Fractional_Laser_area__c;
                        console.log('Fractional_Laser_area__cValues: ' + this.Fractional_Laser_area__cValues);
                    }

                    if (data && data.Fractional_Laser_tip__c) {
                        console.log('runing data');
                        this.Fractional_Laser_tip__cValues = data.Fractional_Laser_tip__c;
                        console.log('Fractional_Laser_tip__cValues: ' + this.Fractional_Laser_tip__cValues);
                    }
                    if (data && data.Fractional_Laser_joules__c) {
                        console.log('runing data');
                        this.Fractional_Laser_joules__cValues = data.Fractional_Laser_joules__c;
                        console.log('Fractional_Laser_joules__cValues: ' + this.Fractional_Laser_joules__cValues);
                    }

                    if (data && data.Fractional_Laser_pulses_ms__c) {
                        console.log('runing data');
                        this.Fractional_Laser_pulses_ms__cValues = data.Fractional_Laser_pulses_ms__c;
                        console.log('Fractional_Laser_pulses_ms__cValues: ' + this.Fractional_Laser_pulses_ms__cValues);
                    }

                    if (data && data.Fractional_Laser_ice_roller_applied__c) {
                        console.log('runing data');
                        this.Fractional_Laser_ice_roller_applied__cValues = data.Fractional_Laser_ice_roller_applied__c;
                        console.log('Fractional_Laser_ice_roller_applied__cValues: ' + this.Fractional_Laser_ice_roller_applied__cValues);
                    }

                    if (data && data.Fractional_Laser_HA_serum_applied__c) {
                        console.log('runing data');
                        this.Fractional_Laser_HA_serum_applied__cValues = data.Fractional_Laser_HA_serum_applied__c;
                        console.log('Fractional_Laser_HA_serum_applied__cValues: ' + this.Fractional_Laser_HA_serum_applied__cValues);
                    }
                    if (data && data.Fractional_Laser_passes_completed__c) {
                        console.log('runing data');
                        this.Fractional_Laser_passes_completed__cValues = data.Fractional_Laser_passes_completed__c;
                        console.log('Fractional_Laser_passes_completed__cValues: ' + this.Fractional_Laser_passes_completed__cValues);
                    }
                    this.initData();
                })

                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }
        //Fractional Laser End

        else if (this.objectType == "Hydrafacial_S__c") {
            this.HydrafacialTable = true;
                     console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.HydrafacialNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Hydrafacial_Location__c) {
                        console.log('runing data');
                        this.Hydrafacial_Location__cValues = data.Hydrafacial_Location__c;
                        console.log('Hydrafacial_Location__cValues: ' + this.Hydrafacial_Location__cValues);
                    }

                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }
        else if (this.objectType == "IPL_S__c") {
           this.IPLTable = true;
                       console.log('object then');
            getPicklistValues({ objApi: this.objectType, fieldApis: this.IPLNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.IPL_Tx__c) {
                        console.log('runing data');
                        this.IPL_Tx__cValues = data.IPL_Tx__c;
                        console.log('IPL_Tx__cValues: ' + this.IPL_Tx__cValues);
                    }
                    if (data && data.Area__c) {
                        console.log('runing data');
                        this.Area__cValues = data.Area__c;
                        console.log('Area__cValues: ' + this.Area__cValues);
                    }
                    if (data && data.Handpiece__c) {
                        console.log('runing data');
                        this.Handpiece__cValues = data.Handpiece__c;
                        console.log('Handpiece__cValues: ' + this.Handpiece__cValues);
                    }

                    if (data && data.Sunscreen_applied__c) {
                        console.log('runing data');
                        this.Sunscreen_applied__cValues = data.Sunscreen_applied__c;
                        console.log('Sunscreen_applied__cValues: ' + this.Sunscreen_applied__cValues);
                    }

                    this.initData();
                })
                .catch((error) => {
                    this.dispatchEvent(
                        new ShowToastEvent({
                            title: 'Error loading picklist values',
                            message: error.body.message,
                            variant: 'error',
                        })
                    );
                });
        }

        else if (this.objectType == "Kybella_S__c") {
            this.KybellaTable = true;            console.log('object then');
            this.initData();
        }


    }

    initData() {
        let listOfRecommendations = [];
        this.createRow(listOfRecommendations);
        this.listOfRecommendations = listOfRecommendations;
        console.log("list of accounts init :" + JSON.stringify(this.listOfRecommendations));
    }


    createRow(listOfRecommendations) {
        let accountObject = {
            index: listOfRecommendations.length > 0 ? listOfRecommendations[listOfRecommendations.length - 1].index + 1 : 1,
            //Fractional Laser
            Fractional_Laser_Tx__c: '',
            Fractional_Laser_area__cValues: '',
            Fractional_Laser_area__c: false,
            Fractional_Laser_area__cValuesList: [],
            Fractional_Laser_tip__cValues: '',
            Fractional_Laser_tip__c: false,
            Fractional_Laser_tip__cValuesList: [],
            Fractional_Laser_joules__cValues: '',
            Fractional_Laser_joules__c: false,
            Fractional_Laser_joules__cValuesList: [],
            Fractional_Laser_pulses_ms__cValues: '',
            Fractional_Laser_pulses_ms__c: false,
            Fractional_Laser_pulses_ms__cValuesList: [],
            Fractional_Laser_ice_roller_applied__cValues: '',
            Fractional_Laser_ice_roller_applied__c: false,
            Fractional_Laser_ice_roller_applied__cValuesList: [],
            Fractional_Laser_HA_serum_applied__cValues: '',
            Fractional_Laser_HA_serum_applied__c: false,
            Fractional_Laser_HA_serum_applied__cValuesList: [],
            Fractional_Laser_notes__c: '',
            Fractional_Laser_passes_completed__cValues: '',
            Fractional_Laser_passes_completed__c: false,
            Fractional_Laser_passes_completed__cValuesList: [],



            Hydrafacial_Location__cValues: '',
            Hydrafacial_Location__c: false,
            Hydrafacial_Location__cValuesList: [],
            Hydrafacial_Cleanser__c: '',
            Hydrafacial_Peel__c: '',
            Hydrafacial_Extractions__c: false,
            Hydrafacial_Serum__c: '',
            Hydrafacial_Booster__c: '',
            Hydrafacial_Moisturizer__c: '',
            Hydrafacial_Notes__c: '',




            IPL_Tx__cValues: '',
            IPL_Tx__c: false,
            IPL_Tx__cValuesList: [],
            Area__cValues: '',
            Area__c: false,
            Area__cValuesList: [],
            Handpiece__cValues: '',
            Handpiece__c: false,
            Handpiece__cValuesList: [],
            IPL_skinTel__c: '',
            Baseline_Skintel__c: '',
            Joules__c: '',
            Pulse_width__c: '',
            Last_skintel__c: '',
            Notes__c: '',
            Sunscreen_applied__cValues: '',
            Sunscreen_applied__c: false,
            Sunscreen_applied__cValuesList: [],


            Number_Of_Injections__c: '',
            Total_dosage__c: '',
            Expiration_number__c: '',
            Lot_number__c: '',
            Notes__c: '',



        };
        listOfRecommendations.push(accountObject);
        console.log("list of accounts createRow :" + JSON.stringify(this.listOfRecommendations));
    }

    addNewRow() {
        this.createRow(this.listOfRecommendations);
    }

    removeRow(event) {
        let toBeDeletedRowIndex = parseInt(event.target.name);
        let listOfRecommendations = this.listOfRecommendations.filter(account => account.index !== toBeDeletedRowIndex);
        this.listOfRecommendations = listOfRecommendations.map((account, idx) => ({ ...account, index: idx + 1 }));
        console.log("list of accounts removeRow :" + JSON.stringify(this.listOfRecommendations));
    }
    ///Universal Picklist input Function
    handleInputClick(event) {
        console.log('handleInputClick running');
        let index = parseInt(event.target.dataset.id);
        let fieldName = event.target.name;


        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, [fieldName]: !account[fieldName] };
            }
            return account;
        });
    }

    //Fractional TX
    handleInputFractionalTx(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Fractional_Laser_Tx__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    //  fractional area Start
    FractionalAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_area__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    FractionalAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_area__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional area Picklist Ends

    //  fractional Tip Start
    FractionalTip(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_tip__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_tip__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_tip__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveFractionalTip(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_tip__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_tip__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_tip__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional Tip End 


    //Fractional joules Start
    handleFractionalJoules(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_joules__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_joules__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_joules__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveFractionalJoulesPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_joules__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_joules__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_joules__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional joules Picklist Ends

    //Fractional Pulse Start
    handleFractionalPulse(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_pulses_ms__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_pulses_ms__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_pulses_ms__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    FractionalPulsePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_pulses_ms__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_pulses_ms__cValues: selectedMembershipValArray.join(';'),
                    FFractional_Laser_pulses_ms__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional Pulse Picklist Ends


    //Fractional IceRoller Start
    FractionalIceRollerSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_ice_roller_applied__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_ice_roller_applied__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_ice_roller_applied__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    FractionalIceRollerPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_ice_roller_applied__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_ice_roller_applied__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_ice_roller_applied__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional IceRoller Picklist Ends


    //Fractional HA Serum Start
    handleSelectHASerumSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_HA_serum_applied__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_HA_serum_applied__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_HA_serum_applied__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleSelectHASerumpILL(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_HA_serum_applied__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_HA_serum_applied__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_HA_serum_applied__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional HA Serum Picklist Ends

    //Fractional Notes Start
    handleInputFractionalNotes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Fractional_Laser_notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional Notes End

    //Fractional Passes Start
    handleSelectPasses(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Fractional_Laser_passes_completed__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Fractional_Laser_passes_completed__cValuesList: selectedMembershipValArray,
                    Fractional_Laser_passes_completed__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemovePillPasses(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Fractional_Laser_passes_completed__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Fractional_Laser_passes_completed__cValues: selectedMembershipValArray.join(';'),
                    Fractional_Laser_passes_completed__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //Fractional Passes Picklist Ends





    HydrafacialLocationSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Hydrafacial_Location__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Hydrafacial_Location__cValuesList: selectedMembershipValArray,
                    Hydrafacial_Location__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HydrafacialLocationPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Hydrafacial_Location__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Hydrafacial_Location__cValues: selectedMembershipValArray.join(';'),
                    Hydrafacial_Location__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handletHydrafacialcleanserSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Cleanser__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handletHydrafacialPeelSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Peel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    changehydrafacialExtractionHandler(event) {
        console.log('This event is working');
        let index = parseInt(event.target.dataset.id);
        console.log('index==>', index);
        let newValue = event.target.value;
        console.log('newValue==>', newValue);

        let checkValue = event.target.checked;
        console.log('checkValue==>', checkValue);

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Extractions__c: checkValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handletHydrafacialSerumSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Serum__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handletHydrafacialBoosterSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Booster__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    handletHydrafacialMoisturizerSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Moisturizer__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handletHydrafacialNotesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Hydrafacial_Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    //////



    handleIPLTxSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.IPL_Tx__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    IPL_Tx__cValuesList: selectedMembershipValArray,
                    IPL_Tx__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveIPLTXPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.IPL_Tx__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    IPL_Tx__cValues: selectedMembershipValArray.join(';'),
                    IPL_Tx__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleIPLAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Area__cValuesList: selectedMembershipValArray,
                    Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveIPLAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Area__cValues: selectedMembershipValArray.join(';'),
                    Area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    handleIPLHandPieceSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Handpiece__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Handpiece__cValuesList: selectedMembershipValArray,
                    Handpiece__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveIPLHandPiecePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Handpiece__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Handpiece__cValues: selectedMembershipValArray.join(';'),
                    Handpiece__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputSkenTel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, IPL_skinTel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputSkinTel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Baseline_Skintel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputIPLJOules(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Joules__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputPulseWidth(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Pulse_width__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLastSkinTel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Last_skintel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    handleInputIPLNotes(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleIPLSunscreenSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Sunscreen_applied__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Sunscreen_applied__cValuesList: selectedMembershipValArray,
                    Sunscreen_applied__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleRemoveIPLSunscreenPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Sunscreen_applied__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Sunscreen_applied__cValues: selectedMembershipValArray.join(';'),
                    Sunscreen_applied__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    ////Kybella Start

    handleInputkybellaInjection(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Number_Of_Injections__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputkybellaDosages(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Total_dosage__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputkybellaExpiration(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Expiration_number__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputkybellaLotNumber(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Lot_number__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputkybellaNote(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Notes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    createRecommendations() {
        if (this.FractionalLaserTable == true) {
            let isValidationFailed = false;
            for (let i = 0; i < this.listOfRecommendations.length; i++) {
                
            }
            
            if (!isValidationFailed) {
                insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                    .then(async (data) => {
                        this.initData();
                        this.template.querySelector('c-custom-Toast').showToast('success', 'Fractional Laser saved successfully.', 'utility:success', 10000);
                    })

                    .catch(error => {
                        this.ShowSpinner = false;
                        this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                    });
            }
        }

        else if (this.HydrafacialTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Hydrafacial saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.IPLTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'IPL saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }


        else if (this.KybellaTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Kybella saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }
        this.initData();

    }

    handleKeydown(event) {
        const invalidKeyCodes = [
            ...Array(26).fill(65).map((code, idx) => code + idx), // A-Z
            ...Array(26).fill(97).map((code, idx) => code + idx), // a-z
            ...Array(10).fill(48).map((code, idx) => code + idx), // 0-9
            ...Array(10).fill(96).map((code, idx) => code + idx), // Numpad 0-9
            32, // Space
            189, // Dash
            187, // Equals
            188, // Comma
            190, // Period
            191, // Slash
            192, // Backtick
            219, // Open bracket
            220, // Backslash
            221, // Close bracket
            222,  // Single quote
            186, // Semicolon and colon (;:)
            46,//delete
            8 //backspace
        ];

        if (invalidKeyCodes.includes(event.keyCode)) {
            event.preventDefault();
        }
    }

}