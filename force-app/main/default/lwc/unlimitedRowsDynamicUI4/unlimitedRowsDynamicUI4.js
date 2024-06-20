import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getPicklistValues from '@salesforce/apex/UnlimitedRowsDynamicUiController.getPickList';
import insertRecommendations from '@salesforce/apex/UnlimitedRowsDynamicUiController.insertRecommendations';
export default class UnlimitedRowsDynamicUi3 extends LightningElement {
    @track listOfRecommendations = [];
    @api recordId = 'a1ODh000002Qf7yMAC';
    @api objectType = '';//Hydrafacial__c//IPL__c
    @track HairLaserTable = false;
    @track LaserVainTable = false;
    @track MicrodermabrasionTable = false;
    @track PeelTable = false;
    @track SculptraBodyTable = false;
    @track isSaveDisabled = true;



    @track HairLaserNameList = ['Laser_Hair_Removal_area__c', 'Tip__c'];
    @track Laser_Hair_Removal_area__cValues = '';
    @track Tip__cValues = '';


    @track LaserVainNameList = ['Area__c', 'Spot_size__c', 'Jelly_applied__c', 'Ice_roller_used__c'];
    @track Area__cValues = '';
    @track Spot_size__cValues = '';
    @track Jelly_applied__cValues = '';
    @track Ice_roller_used__cValues = '';


    @track MicrodermabrasionNameList = ['Area__c', 'Zone__c', 'Pass__c', 'Effect__c', 'Care__c', 'Medications__c'];
    @track Area__cValues = '';
    @track Zone__cValues = '';
    @track Pass__cValues = '';
    @track Effect__cValues = '';
    @track Care__cValues = '';
    @track Medications__cValues = '';



    @track PeelNameList = ['Location__c', 'Type__c', 'Cooling_method__c', 'Instructions__c'];
    @track Location__cValues = '';
    @track Type__cValues = '';
    @track Cooling_method__cValues = '';
    @track Instructions__cValues = '';



    @track SculptraBodyNameList = ['Injectables__c', 'Dilution__c'];
    @track Injectables__c = '';
    @track Dilution__c = '';




    connectedCallback() {
        if (this.objectType == "Laser_Hair_Removal_S__c") {
            this.HairLaserTable = true;

            getPicklistValues({ objApi: this.objectType, fieldApis: this.HairLaserNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Laser_Hair_Removal_area__c) {
                        console.log('runing data');
                        this.Laser_Hair_Removal_area__cValues = data.Laser_Hair_Removal_area__c;
                        console.log('Laser_Hair_Removal_area__cValues: ' + this.Laser_Hair_Removal_area__cValues);
                    }

                    if (data && data.Tip__c) {
                        console.log('runing data');
                        this.Tip__cValues = data.Tip__c;
                        console.log('Tip__cValues: ' + this.Tip__cValues);
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

        else if (this.objectType == "Microdermabrasion_S__c") {
            this.MicrodermabrasionTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.MicrodermabrasionNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Area__c) {
                        console.log('runing data');
                        this.Area__cValues = data.Area__c;
                        console.log('Area__cValues: ' + this.Area__cValues);
                    }

                    if (data && data.Zone__c) {
                        console.log('runing data');
                        this.Zone__cValues = data.Zone__c;
                        console.log('Zone__cValues: ' + this.Zone__cValues);
                    }

                    if (data && data.Pass__c) {
                        console.log('runing data');
                        this.Pass__cValues = data.Pass__c;
                        console.log('Pass__cValues: ' + this.Pass__cValues);
                    }
                    if (data && data.Effect__c) {
                        console.log('runing data');
                        this.Effect__cValues = data.Effect__c;
                        console.log('Effect__cValues: ' + this.Effect__cValues);
                    }

                    if (data && data.Care__c) {
                        console.log('runing data');
                        this.Care__cValues = data.Care__c;
                        console.log('Care__cValues: ' + this.Care__cValues);
                    }

                    if (data && data.Medications__c) {
                        console.log('runing data');
                        this.Medications__cValues = data.Medications__c;
                        console.log('Medications__cValues: ' + this.Medications__cValues);
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
        else if (this.objectType == "Peel_S__c") {
            this.PeelTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.PeelNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Type__c) {
                        console.log('runing data');
                        this.Type__cValues = data.Type__c;
                        console.log('Type__cValues: ' + this.Type__cValues);
                    }

                    if (data && data.Location__c) {
                        console.log('runing data');
                        this.Location__cValues = data.Location__c;
                        console.log('Location__cValues: ' + this.Location__cValues);
                    }

                    if (data && data.Cooling_method__c) {
                        console.log('runing data');
                        this.Cooling_method__cValues = data.Cooling_method__c;
                        console.log('Cooling_method__cValues: ' + this.Cooling_method__cValues);
                    }
                    if (data && data.Instructions__c) {
                        console.log('runing data');
                        this.Instructions__cValues = data.Instructions__c;
                        console.log('Instructions__cValues: ' + this.Instructions__cValues);
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


        else if (this.objectType == "Sculptra_Body_S__c") {
            this.SculptraBodyTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.SculptraBodyNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Injectables__c) {
                        console.log('runing data');
                        this.Injectables__cValues = data.Injectables__c;
                        console.log('Injectables__cValues: ' + this.Injectables__cValues);
                    }

                    if (data && data.Dilution__c) {
                        console.log('runing data');
                        this.Dilution__cValues = data.Dilution__c;
                        console.log('Dilution__cValues: ' + this.Dilution__cValues);
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




        else if (this.objectType == "Laser_Vein_Removal_S__c") {
            this.LaserVainTable = true;
            getPicklistValues({ objApi: this.objectType, fieldApis: this.LaserVainNameList })
                .then((data) => {
                    console.log('runing then');
                    if (data && data.Area__c) {
                        console.log('runing data');
                        this.Area__cValues = data.Area__c;
                        console.log('Area__cValues: ' + this.Area__cValues);
                    }

                    if (data && data.Spot_size__c) {
                        console.log('runing data');
                        this.Spot_size__cValues = data.Spot_size__c;
                        console.log('Spot_size__cValues: ' + this.Spot_size__cValues);
                    }

                    if (data && data.Jelly_applied__c) {
                        console.log('runing data');
                        this.Jelly_applied__cValues = data.Jelly_applied__c;
                        console.log('Jelly_applied__cValues: ' + this.Jelly_applied__cValues);
                    }
                    if (data && data.Ice_roller_used__c) {
                        console.log('runing data');
                        this.Ice_roller_used__cValues = data.Ice_roller_used__c;
                        console.log('Ice_roller_used__cValues: ' + this.Ice_roller_used__cValues);
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

            Laser_Hair_Removal_area__cValues: '',
            Laser_Hair_Removal_area__c: false,
            Laser_Hair_Removal_area__cValuesList: [],
            Treatment__c: '',
            Tip__cValues: '',
            Tip__c: false,
            Tip__cValuesList: [],
            Joules__c: '',
            Pulse_width__c: '',
            Passes__c: '',
            Skintel__c: '',
            Baseline_Skintel__c: '',
            Skin_type__c: '',
            Notes__c: '',


            Area__cValues: '',
            Area__c: false,
            Area__cValuesLists: [],
            Spot_size__cValues: '',
            Spot_size__c: false,
            Spot_size__cValuesList: [],
            ms__c: '',
            Joules__c: '',
            Notes__c: '',
            Jelly_applied__cValues: '',
            Jelly_applied__c: false,
            Jelly_applied__cValuesList: [],
            Skintel__c: '',
            Baseline_skintell__c: '',
            Ice_roller_used__cValues: '',
            Ice_roller_used__c: false,
            Ice_roller_used__cValuesList: [],


            Area__cValues: '',
            Area__c: false,
            Area__cValueList: [],
            Zone__cValues: '',
            Zone__c: false,
            Zone__cValuesList: [],
            Pass__cValues: '',
            Pass__c: false,
            Pass__cValuesList: [],
            Vacuum_setting__c: '',
            Wand__c: '',
            Post_op__c: '',
            Effect__cValues: '',
            Effect__c: false,
            Effect__cValuesList: [],
            Care__cValues: '',
            Care__c: false,
            Care__cValuesList: [],
            Medications__cValues: '',
            Medications__c: false,
            Medications__cValuesList: [],
            Notes__c: '',



            Peel__c: '',
            Location__cValues: '',
            Location__c: false,
            Location__cValueList: [],
            Type__cValues: '',
            Type__c: false,
            Type__cValueList: [],
            Duration__c: '',
            Cooling_method__cValues: '',
            Cooling_method__c: false,
            Cooling_method__cValueList: [],
            Instructions__cValues: '',
            Instructions__c: false,
            Instructions__cValueList: [],
            Notes__c: '',


            Area__c: '',
            Injectables__cValues: '',
            Injectables__c: false,
            Injectables__cValueList: [],
            of_vials__c: '',
            Lot__c: '',
            Expiration_date__c: '',
            Reconstitution__c: '',
            Dilution__cValues: '',
            Dilution__c: false,
            Dilution__cValueList: [],



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

    HairAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Laser_Hair_Removal_area__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Laser_Hair_Removal_area__cValuesList: selectedMembershipValArray,
                    Laser_Hair_Removal_area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HairAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Laser_Hair_Removal_area__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Laser_Hair_Removal_area__cValues: selectedMembershipValArray.join(';'),
                    Laser_Hair_Removal_area__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    handleInputHairTreatment(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Treatment__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    FractionalTip(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Tip__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Tip__cValuesList: selectedMembershipValArray,
                    Tip__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        
        this.isSaveDisabled = false;

    }
    handleRemoveHairTip(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Tip__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Tip__cValues: selectedMembershipValArray.join(';'),
                    Tip__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

        
    }

    handleInputHairJoules(event) {
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

    handleInputHairPulse(event) {
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

    handleInputHairPasses(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Passes__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputHairSkintel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Skintel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputHairBaseline(event) {
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

    handleInputHairSkinType(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Skin_type__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputHairNotes(event) {
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


    VainAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Area__cValuesLists || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Area__cValuesLists: selectedMembershipValArray,
                    Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    VainAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Area__cValuesLists.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Area__cValues: selectedMembershipValArray.join(';'),
                    Area__cValuesLists: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    VainSpotSizeSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Spot_size__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Spot_size__cValuesList: selectedMembershipValArray,
                    Spot_size__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    VainSpotSizePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Spot_size__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Spot_size__cValues: selectedMembershipValArray.join(';'),
                    Spot_size__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLaserVainms(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, ms__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLaserVainJoules(event) {
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

    handleInputLaserVainNotes(event) {
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

    VainJellySelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Jelly_applied__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Jelly_applied__cValuesList: selectedMembershipValArray,
                    Jelly_applied__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    VainJellyPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Jelly_applied__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Jelly_applied__cValues: selectedMembershipValArray.join(';'),
                    Jelly_applied__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLaserVainSkintel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Skintel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputLaserVainBaseline(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Baseline_skintell__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    VainIceRollerSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Ice_roller_used__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Ice_roller_used__cValuesList: selectedMembershipValArray,
                    Ice_roller_used__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    VainIceRollerPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Jelly_applied__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Ice_roller_used__cValues: selectedMembershipValArray.join(';'),
                    Ice_roller_used__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    MicrodermabrasionAreaSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Area__cValueList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Area__cValueList: selectedMembershipValArray,
                    Area__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    MicrodermabrasionAreaPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Area__cValueList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Area__cValues: selectedMembershipValArray.join(';'),
                    Area__cValueList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    MicrodermabrasionZoneSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Zone__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Zone__cValuesList: selectedMembershipValArray,
                    Zone__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    Zone__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Zone__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Zone__cValues: selectedMembershipValArray.join(';'),
                    Zone__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    MicrodermabrasionPassSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Pass__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Pass__cValuesList: selectedMembershipValArray,
                    Pass__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    Pass__cPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Pass__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Pass__cValues: selectedMembershipValArray.join(';'),
                    Pass__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    handleInputVacuumSetting(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Vacuum_setting__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputWand(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Wand__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputPostOp(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Post_op__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    EffectSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Effect__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Effect__cValuesList: selectedMembershipValArray,
                    Effect__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    EffectPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Effect__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Effect__cValues: selectedMembershipValArray.join(';'),
                    Effect__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandleCareSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Care__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Care__cValuesList: selectedMembershipValArray,
                    Care__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleCarePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Care__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Care__cValues: selectedMembershipValArray.join(';'),
                    Care__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandleMedicationsSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Medications__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Medications__cValuesList: selectedMembershipValArray,
                    Medications__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleMedicationsPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Medications__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Medications__cValues: selectedMembershipValArray.join(';'),
                    Medications__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputMicrodermabrasionNotes(event) {
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
    //Peel Start
    handleInputPeel(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Peel__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandlePeelLocationSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Location__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Location__cValuesList: selectedMembershipValArray,
                    Location__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandlePeelLocationPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Location__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Location__cValues: selectedMembershipValArray.join(';'),
                    Location__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }




    HandlePeelTypeSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Type__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Type__cValuesList: selectedMembershipValArray,
                    Type__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandlePeelTypePill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Type__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Type__cValues: selectedMembershipValArray.join(';'),
                    Type__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputDuration(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Duration__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandlePeelCoolingMethod(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Cooling_method__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Cooling_method__cValuesList: selectedMembershipValArray,
                    Cooling_method__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandlePeelCoolingMethodPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Cooling_method__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Cooling_method__cValues: selectedMembershipValArray.join(';'),
                    Cooling_method__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    HandlePeelInstructions(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Instructions__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Instructions__cValuesList: selectedMembershipValArray,
                    Instructions__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandlePeelInstructionsPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Instructions__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Instructions__cValues: selectedMembershipValArray.join(';'),
                    Instructions__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputPeelNotes(event) {
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

    handleInputBodyArea(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Area: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleBodyInjectablesSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Injectables__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Injectables__cValuesList: selectedMembershipValArray,
                    Injectables__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleBodyInjectablesPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Injectables__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Injectables__cValues: selectedMembershipValArray.join(';'),
                    Injectables__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputBodyof_vials(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, of_vials__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputBodyLot(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Lot__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }


    handleInputExpiration_dateChange(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Expiration_date__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    handleInputBodyLothandleInputBodyReconstitution(event) {
        let index = parseInt(event.target.dataset.id);
        let newValue = event.target.value;

        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                return { ...account, Reconstitution__c: newValue };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }

    HandleBodyDilutionSelect(event) {
        let index = parseInt(event.target.dataset.id);
        let selectedValue = event.target.getAttribute('value');
        let fieldName = event.target.getAttribute('name');
        console.log('fieldName: ' + fieldName);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {
                let selectedMembershipValArray = account.Dilution__cValuesList || [];
                if (selectedMembershipValArray.includes(selectedValue)) {
                    selectedMembershipValArray = selectedMembershipValArray.filter(MembershipVal => MembershipVal !== selectedValue);
                } else {
                    selectedMembershipValArray.push(selectedValue);
                }
                return {
                    ...account,
                    [fieldName]: selectedMembershipValArray.join(';'),
                    Dilution__cValuesList: selectedMembershipValArray,
                    Dilution__c: false // Close the dropdown after selection
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }
    HandleBodyDilutionPill(event) {
        let index = parseInt(event.target.closest('button').dataset.id); // Get the index from the button's dataset
        let industryToRemove = event.target.closest('button').name;

        console.log('index:H ' + index);

        console.log('industryToRemove: ' + industryToRemove);
        this.listOfRecommendations = this.listOfRecommendations.map(account => {
            if (account.index === index) {

                let selectedMembershipValArray = account.Dilution__cValuesList.filter(MembershipVal => MembershipVal !== industryToRemove);
                return {
                    ...account,
                    Dilution__cValues: selectedMembershipValArray.join(';'),
                    Dilution__cValuesList: selectedMembershipValArray
                };
            }
            return account;
        });
        this.isSaveDisabled = false;

    }



    createRecommendations() {
        if (this.HairLaserTable == true) {
            let isValidationFailed = false;
            for (let i = 0; i < this.listOfRecommendations.length; i++) {
              
            }
           
            if (!isValidationFailed) {
                insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                    .then(async (data) => {
                        this.initData();
                        this.template.querySelector('c-custom-Toast').showToast('success', 'Hair Laser saved successfully.', 'utility:success', 10000);
                    })

                    .catch(error => {
                        this.ShowSpinner = false;
                        this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                    });
            }
        }

        else if (this.LaserVainTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Laser Vain Removal saved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.MicrodermabrasionTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', ' Microdermabrasionsaved successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }

        else if (this.PeelTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', ' Peel Record Save successfully.', 'utility:success', 10000);
                })

                .catch(error => {
                    this.ShowSpinner = false;
                    this.template.querySelector('c-custom-Toast').showToast('error ', JSON.stringify(error), 'utility:error', 10000);
                });
        }


        else if (this.SculptraBodyTable == true) {
            insertRecommendations({ jsonOfListOfRecommendations: this.listOfRecommendations })
                .then(async (data) => {
                    this.initData();
                    this.template.querySelector('c-custom-Toast').showToast('success', 'Sculptra Body Record Save successfully.', 'utility:success', 10000);
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